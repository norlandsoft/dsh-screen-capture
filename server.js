/**
 * Host half of the DSH screen-capture bundle.
 *
 * The Browser half cannot read the operating system screen on every surface.
 * This half owns three exact routes on the Harness web server:
 *
 *   POST /dsh-screen-capture/capture  -> full-screen PNG
 *   POST /dsh-screen-capture/save     -> ask for a path with a native save dialog, then write the PNG
 *   POST /dsh-screen-capture/copy     -> put a PNG on the system clipboard
 *
 * All three routes use the same Host/Origin and browser-session admission as
 * `/api`, and every temporary file is removed in a `finally` block.
 */
import { execFile, spawn } from 'node:child_process'
import { promises as fs } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { basename, join } from 'node:path'
import { promisify } from 'node:util'

const exec = promisify(execFile)

const ROUTE_CAPTURE = '/dsh-screen-capture/capture'
const ROUTE_SAVE = '/dsh-screen-capture/save'
const ROUTE_COPY = '/dsh-screen-capture/copy'

const MAX_IMAGE_BYTES = 64 * 1024 * 1024
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

/** The web server and its admission contract are hard dependencies. */
export const inject = ['webServer', 'connection']

/** Register one route per capability, each removed with the plugin. */
export function apply(ctx) {
  ctx.effect(
    () =>
      ctx.webServer.register({
        kind: 'exact',
        path: ROUTE_CAPTURE,
        handler: (req, res) => handleCapture(ctx, req, res),
      }),
    'dsh-screen-capture: capture route',
  )
  ctx.effect(
    () =>
      ctx.webServer.register({
        kind: 'exact',
        path: ROUTE_SAVE,
        handler: (req, res) => handleSave(ctx, req, res),
      }),
    'dsh-screen-capture: save route',
  )
  ctx.effect(
    () =>
      ctx.webServer.register({
        kind: 'exact',
        path: ROUTE_COPY,
        handler: (req, res) => handleCopy(ctx, req, res),
      }),
    'dsh-screen-capture: copy route',
  )
}

/** Capture the main display, or the native region selection, as a PNG. */
async function handleCapture(ctx, req, res) {
  if (rejectRequest(ctx, req, res)) return
  if (req.method !== 'POST') {
    sendJson(res, 405, { ok: false, message: 'method not allowed' })
    return
  }

  let body
  try {
    body = await readJsonBody(req, 16 * 1024)
  } catch (error) {
    sendJson(res, 400, {
      ok: false,
      message: error instanceof Error ? error.message : String(error),
    })
    return
  }
  const mode = body?.mode === 'region' ? 'region' : body?.mode === 'window' ? 'window' : 'fullscreen'

  try {
    if (mode === 'window') {
      if (process.platform !== 'darwin') {
        sendJson(res, 501, {
          ok: false,
          message: 'window capture is only supported on macOS',
        })
        return
      }
      const result = await captureNativeWindow()
      if (result === null) {
        res.writeHead(204, { 'cache-control': 'no-store' })
        res.end()
        return
      }
      sendPng(res, result, 'window')
      return
    }

    if (mode === 'region' && process.platform === 'darwin') {
      const result = await captureNativeRegion()
      if (result === null) {
        // The user pressed Escape or otherwise dismissed the native selector.
        res.writeHead(204, { 'cache-control': 'no-store' })
        res.end()
        return
      }
      sendPng(res, result, 'region')
      return
    }

    const result = await captureFullScreen()
    sendPng(res, result, 'screen')
  } catch (error) {
    ctx.logger.warn(`dsh-screen-capture: capture failed: ${String(error)}`)
    sendJson(res, 500, {
      ok: false,
      message: error instanceof Error ? error.message : String(error),
    })
  }
}

/** Ask for a save location with a native dialog, then write the PNG there. */
async function handleSave(ctx, req, res) {
  if (rejectRequest(ctx, req, res)) return
  if (req.method !== 'POST') {
    sendJson(res, 405, { ok: false, message: 'method not allowed' })
    return
  }
  if (mediaType(req.headers['content-type']) !== 'image/png') {
    sendJson(res, 415, { ok: false, message: 'content-type must be image/png' })
    return
  }

  try {
    const png = await readBody(req, MAX_IMAGE_BYTES)
    assertPng(png)
    const path = await savePngWithDialog(png, req.headers['x-file-name'])
    if (path === null) {
      sendJson(res, 200, { ok: true, canceled: true })
      return
    }
    sendJson(res, 200, { ok: true, path })
  } catch (error) {
    const status = error?.statusCode === 413 ? 413 : 500
    ctx.logger.warn(`dsh-screen-capture: save failed: ${String(error)}`)
    sendJson(res, status, {
      ok: false,
      message: error instanceof Error ? error.message : String(error),
    })
  }
}

/** Copy one uploaded PNG to the operating system clipboard. */
async function handleCopy(ctx, req, res) {
  if (rejectRequest(ctx, req, res)) return
  if (req.method !== 'POST') {
    sendJson(res, 405, { ok: false, message: 'method not allowed' })
    return
  }
  if (mediaType(req.headers['content-type']) !== 'image/png') {
    sendJson(res, 415, { ok: false, message: 'content-type must be image/png' })
    return
  }

  try {
    const png = await readBody(req, MAX_IMAGE_BYTES)
    assertPng(png)
    await copyPngToClipboard(png)
    sendJson(res, 200, { ok: true })
  } catch (error) {
    const status = error?.statusCode === 413 ? 413 : 500
    ctx.logger.warn(`dsh-screen-capture: clipboard copy failed: ${String(error)}`)
    sendJson(res, status, {
      ok: false,
      message: error instanceof Error ? error.message : String(error),
    })
  }
}

/** Take one screenshot into a private temporary directory and read it back. */
export async function captureFullScreen() {
  const dir = await fs.mkdtemp(join(tmpdir(), 'dsh-screen-capture-'))
  const path = join(dir, 'screen.png')
  try {
    await captureToFile(path)
    const png = await fs.readFile(path)
    assertPng(png)
    const { width, height } = pngSize(png)
    return { png, width, height }
  } finally {
    await fs.rm(dir, { recursive: true, force: true }).catch(() => {})
  }
}

/** Answer with one PNG and the metadata the Client needs to place it. */
function sendPng(res, result, kind) {
  const { png, width, height } = result
  res.writeHead(200, {
    'content-type': 'image/png',
    'content-length': png.length,
    'cache-control': 'no-store',
    'x-capture-width': String(width),
    'x-capture-height': String(height),
    'x-capture-kind': kind,
  })
  res.end(png)
}

/** Let the user drag a region on the real screen through the macOS selector. */
export async function captureNativeRegion() {
  return await captureWithSelector(['-s'], 'region.png')
}

/**
 * Let the macOS window selector highlight the window under the cursor and
 * capture it on click. This is the native hover-highlight behavior.
 */
export async function captureNativeWindow() {
  return await captureWithSelector(['-w', '-o'], 'window.png')
}

/** Run one interactive `screencapture` mode and read the chosen crop back. */
async function captureWithSelector(flags, fileName) {
  const dir = await fs.mkdtemp(join(tmpdir(), 'dsh-screen-capture-'))
  const path = join(dir, fileName)
  try {
    let failure
    try {
      await exec('/usr/sbin/screencapture', [...flags, '-x', '-t', 'png', path], {
        timeout: 5 * 60 * 1000,
        maxBuffer: 1024 * 1024,
      })
    } catch (error) {
      failure = error
    }

    const stat = await fs.stat(path).catch(() => undefined)
    if (stat === undefined || stat.size === 0) {
      // `screencapture` exits non-zero when the user dismisses the selector.
      // A permission or timeout failure must still reach the toast.
      if (failure !== undefined) {
        const detail = cleanError(failure).toLowerCase()
        if (
          detail.includes('not authorized') ||
          detail.includes('permission') ||
          detail.includes('denied') ||
          detail.includes('screen recording') ||
          detail.includes('timed out')
        ) {
          throw failure
        }
      }
      return null
    }

    const png = await fs.readFile(path)
    assertPng(png)
    const { width, height } = pngSize(png)
    return { png, width, height }
  } finally {
    await fs.rm(dir, { recursive: true, force: true }).catch(() => {})
  }
}

/** Dispatch to the platform command that can capture the main display. */
async function captureToFile(path) {
  if (process.platform === 'darwin') {
    await execFileChecked(
      '/usr/sbin/screencapture',
      ['-x', '-D', '1', '-t', 'png', path],
      { timeout: 20000 },
    )
    return
  }

  if (process.platform === 'win32') {
    const scriptPath = `${path}.ps1`
    await fs.writeFile(scriptPath, WINDOWS_CAPTURE_SCRIPT, 'utf8')
    await execFileChecked(
      'powershell.exe',
      ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-File', scriptPath],
      {
        timeout: 30000,
        env: { ...process.env, DSH_SCREEN_CAPTURE_PATH: path },
      },
    )
    return
  }

  await captureOnLinux(path)
}

/** Try the common Linux screenshot tools until one produces a real file. */
async function captureOnLinux(path) {
  const candidates = [
    ['gnome-screenshot', ['-f', path]],
    ['spectacle', ['-b', '-n', '-o', path]],
    ['grim', [path]],
    ['scrot', ['-o', path]],
    ['import', ['-window', 'root', path]],
  ]
  const failures = []
  for (const [command, args] of candidates) {
    await fs.rm(path, { force: true }).catch(() => {})
    try {
      await exec(command, args, { timeout: 20000 })
      const stat = await fs.stat(path).catch(() => undefined)
      if (stat !== undefined && stat.size > 0) return
      failures.push(`${command}: produced no file`)
    } catch (error) {
      failures.push(`${command}: ${cleanError(error)}`)
    }
  }
  throw new Error(
    `no supported Linux screen-capture tool succeeded (${failures.join('; ')})`,
  )
}

/** Ask for a destination with the native save dialog, then write the PNG. */
export async function savePngWithDialog(png, requestedName) {
  const name = safeFileName(requestedName)
  const directory = await defaultSaveDirectory()
  const chosen = await runSaveDialog(name, directory)
  if (chosen === null || chosen.length === 0) return null
  const path = withPngExtension(chosen)
  await fs.writeFile(path, png)
  return path
}

/** Prefer ~/Pictures; fall back to the home directory. */
async function defaultSaveDirectory() {
  const pictures = join(homedir(), 'Pictures')
  const stat = await fs.stat(pictures).catch(() => undefined)
  return stat?.isDirectory() === true ? pictures : homedir()
}

/** Keep the PNG extension even when the dialog field hides it. */
function withPngExtension(path) {
  return /\.png$/i.test(path) ? path : `${path}.png`
}

/** Dispatch to the platform's native save-file dialog. */
async function runSaveDialog(name, directory) {
  if (process.platform === 'darwin') {
    const script =
      `set f to choose file name with prompt "保存截图" ` +
      `default name ${JSON.stringify(name)} ` +
      `default location (POSIX file ${JSON.stringify(directory)})\n` +
      'return POSIX path of f'
    try {
      const { stdout } = await exec('/usr/bin/osascript', ['-e', script], {
        timeout: 5 * 60 * 1000,
        maxBuffer: 1024 * 1024,
      })
      return stdout.trim()
    } catch (error) {
      const detail = cleanError(error).toLowerCase()
      if (detail.includes('user canceled') || detail.includes('-128')) return null
      throw error
    }
  }

  if (process.platform === 'win32') {
    const script = `Add-Type -AssemblyName System.Windows.Forms
$dialog = New-Object System.Windows.Forms.SaveFileDialog
$dialog.Title = 'Save screenshot'
$dialog.Filter = 'PNG image (*.png)|*.png'
$dialog.DefaultExt = 'png'
$dialog.AddExtension = $true
$dialog.OverwritePrompt = $true
$dialog.InitialDirectory = $env:DSH_SCREEN_CAPTURE_DIR
$dialog.FileName = $env:DSH_SCREEN_CAPTURE_NAME
if ($dialog.ShowDialog() -ne [System.Windows.Forms.DialogResult]::OK) { exit 2 }
[Console]::Out.Write($dialog.FileName)
`
    try {
      const { stdout } = await exec(
        'powershell.exe',
        ['-NoProfile', '-STA', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', script],
        {
          timeout: 5 * 60 * 1000,
          maxBuffer: 1024 * 1024,
          env: {
            ...process.env,
            DSH_SCREEN_CAPTURE_DIR: directory,
            DSH_SCREEN_CAPTURE_NAME: name,
          },
        },
      )
      return stdout.trim()
    } catch (error) {
      if (error?.code === 2) return null
      throw error
    }
  }

  const startPath = join(directory, name)
  const attempts = [
    [
      'zenity',
      [
        '--file-selection',
        '--save',
        '--confirm-overwrite',
        '--title=保存截图',
        `--filename=${startPath}`,
      ],
    ],
    [
      'kdialog',
      ['--getsavefilename', startPath, 'PNG image (*.png)', '--title', '保存截图'],
    ],
    [
      'yad',
      ['--file', '--save', '--title=保存截图', `--filename=${startPath}`],
    ],
  ]
  const failures = []
  for (const [command, args] of attempts) {
    try {
      const { stdout } = await exec(command, args, {
        timeout: 5 * 60 * 1000,
        maxBuffer: 1024 * 1024,
      })
      return stdout.trim()
    } catch (error) {
      if (error?.code === 'ENOENT') {
        failures.push(`${command}: not installed`)
        continue
      }
      if (error?.code === 1 || error?.code === 252) return null
      failures.push(`${command}: ${cleanError(error)}`)
    }
  }
  throw new Error(
    `no supported Linux save dialog succeeded (${failures.join('; ')})`,
  )
}

/** Put PNG bytes on the desktop clipboard through a platform command. */
export async function copyPngToClipboard(png) {
  const dir = await fs.mkdtemp(join(tmpdir(), 'dsh-screen-capture-'))
  const path = join(dir, 'clipboard.png')
  try {
    await fs.writeFile(path, png)
    if (process.platform === 'darwin') {
      const script = `set the clipboard to (read (POSIX file ${JSON.stringify(path)}) as «class PNGf»)`
      await execFileChecked('/usr/bin/osascript', ['-e', script], { timeout: 20000 })
      return
    }
    if (process.platform === 'win32') {
      const script =
        'Add-Type -AssemblyName System.Windows.Forms; ' +
        'Add-Type -AssemblyName System.Drawing; ' +
        '$image=[System.Drawing.Image]::FromFile($env:DSH_SCREEN_CAPTURE_PATH); ' +
        'try { [System.Windows.Forms.Clipboard]::SetImage($image) } finally { $image.Dispose() }'
      await execFileChecked(
        'powershell.exe',
        [
          '-NoProfile',
          '-STA',
          '-NonInteractive',
          '-ExecutionPolicy',
          'Bypass',
          '-Command',
          script,
        ],
        {
          timeout: 20000,
          env: { ...process.env, DSH_SCREEN_CAPTURE_PATH: path },
        },
      )
      return
    }
    await copyOnLinux(png)
  } finally {
    await fs.rm(dir, { recursive: true, force: true }).catch(() => {})
  }
}

/** Pipe PNG bytes into a Wayland or X11 clipboard owner. */
async function copyOnLinux(png) {
  const candidates = []
  if (process.env.WAYLAND_DISPLAY) candidates.push(['wl-copy', ['-t', 'image/png']])
  candidates.push(['xclip', ['-selection', 'clipboard', '-t', 'image/png', '-i']])
  const failures = []
  for (const [command, args] of candidates) {
    try {
      await pipeTo(command, args, png)
      return
    } catch (error) {
      failures.push(`${command}: ${cleanError(error)}`)
    }
  }
  throw new Error(
    `no supported Linux clipboard tool succeeded (${failures.join('; ')})`,
  )
}

/** Run a command that writes into `input`, rejecting on a non-zero exit. */
function pipeTo(command, args, input) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['pipe', 'ignore', 'pipe'] })
    let stderr = ''
    child.once('error', reject)
    child.stdin.on('error', () => {})
    child.stderr.on('data', (chunk) => {
      if (stderr.length < 4096) stderr += chunk.toString('utf8')
    })
    child.once('close', (code) => {
      if (code === 0) resolve()
      else {
        reject(
          new Error(
            `${command} exited with ${String(code)}${stderr.trim().length > 0 ? `: ${stderr.trim()}` : ''}`,
          ),
        )
      }
    })
    child.stdin.end(input)
  })
}

/** Execute a command and add its stderr to the thrown error. */
async function execFileChecked(command, args, options) {
  try {
    return await exec(command, args, { ...options, maxBuffer: 1024 * 1024 })
  } catch (error) {
    throw new Error(`${basename(command)}: ${cleanError(error)}`)
  }
}

/** Reuse the `/api` Host/Origin and browser-session admission. */
function rejectRequest(ctx, req, res) {
  const rejection = ctx.connection.requestRejection(req)
  if (rejection === undefined) return false
  res.writeHead(rejection)
  res.end(rejection === 401 ? 'unauthorized' : 'forbidden')
  return true
}

/** Reject a body that is larger than the PNG routes accept. */
async function readBody(req, maxBytes) {
  let size = 0
  const chunks = []
  for await (const chunk of req) {
    size += chunk.length
    if (size > maxBytes) {
      const error = new Error('image is too large')
      error.statusCode = 413
      throw error
    }
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

/** Read a small JSON request body; an empty body is `null`. */
async function readJsonBody(req, maxBytes) {
  const raw = await readBody(req, maxBytes)
  if (raw.length === 0) return null
  try {
    return JSON.parse(raw.toString('utf8'))
  } catch {
    throw new Error('body is not JSON')
  }
}

/** Verify the PNG signature so arbitrary uploads never reach the disk. */
function assertPng(png) {
  if (png.length < 24 || !png.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error('not a PNG image')
  }
}

/** Read the dimensions from the PNG IHDR chunk. */
function pngSize(png) {
  assertPng(png)
  const width = png.readUInt32BE(16)
  const height = png.readUInt32BE(20)
  if (width === 0 || height === 0) throw new Error('PNG has no pixels')
  return { width, height }
}

/** Keep a client-provided file name inside the screenshots directory. */
function safeFileName(requestedName) {
  const raw = typeof requestedName === 'string' ? requestedName : ''
  let name = basename(raw)
    .replace(/[^A-Za-z0-9._-]/g, '-')
    .replace(/^[.-]+/, '')
  if (name.length === 0 || name === 'png') name = defaultFileName()
  if (!name.toLowerCase().endsWith('.png')) name += '.png'
  if (name.length > 120) name = defaultFileName()
  return name
}

/** Fallback name when the Client does not supply one. */
function defaultFileName() {
  const now = new Date()
  const pad = (value) => String(value).padStart(2, '0')
  return [
    'dsh-screenshot-',
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    '-',
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
    '.png',
  ].join('')
}

/** Reduce a child-process failure to one readable line. */
function cleanError(error) {
  const stderr = typeof error?.stderr === 'string' ? error.stderr.trim() : ''
  if (stderr.length > 0) return stderr
  const message = error instanceof Error ? error.message : String(error)
  return message.length > 0 ? message : 'unknown error'
}

/** Lower-case media type without parameters. */
function mediaType(value) {
  return typeof value === 'string' ? value.split(';', 1)[0]?.trim().toLowerCase() : undefined
}

/** Send one small JSON response. */
function sendJson(res, status, payload) {
  res.statusCode = status
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.setHeader('cache-control', 'no-store')
  res.end(JSON.stringify(payload))
}

/** Windows capture uses the virtual desktop so multi-monitor layouts fit. */
const WINDOWS_CAPTURE_SCRIPT = `Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$bounds = [System.Windows.Forms.SystemInformation]::VirtualScreen
$bitmap = New-Object System.Drawing.Bitmap $bounds.Width, $bounds.Height
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
try {
  $graphics.CopyFromScreen($bounds.Location, [System.Drawing.Point]::Empty, $bounds.Size)
  $bitmap.Save($env:DSH_SCREEN_CAPTURE_PATH, [System.Drawing.Imaging.ImageFormat]::Png)
} finally {
  $graphics.Dispose()
  $bitmap.Dispose()
}
`
