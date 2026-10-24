window.__ModuleLoader__.load({
  id: 'dsh-screen-capture',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const NS = 'dshScreenCapture'
    const PREFERENCES_KEY = 'dsh-screen-capture.preferences'
    const HOST_PREFIX = 'dsh-screen-capture'

    const en = {
      'button.label': 'Capture',
      'button.busy': 'Working\u2026',
      'button.title': 'Screen capture: {mode} \u2192 {destination}',
      'button.options': 'Capture options',
      'menu.title': 'Screen capture options',
      'menu.mode': 'Capture mode',
      'menu.destination': 'Save to',
      'menu.region': 'Select area',
      'menu.fullscreen': 'Full screen',
      'menu.window': 'Window',
      'menu.clipboard': 'Clipboard',
      'menu.file': 'File',
      'menu.preview': 'Preview image',
      'preview.title': 'Image preview',
      'preview.size': '{w} \u00d7 {h}',
      'preview.close': 'Close',
      'preview.rotateLeft': 'Rotate left',
      'preview.rotateRight': 'Rotate right',
      'preview.flipH': 'Flip horizontal',
      'preview.flipV': 'Flip vertical',
      'preview.crop': 'Crop',
      'preview.reset': 'Reset',
      'preview.applyCrop': 'Apply crop',
      'preview.cancelCrop': 'Cancel crop',
      'preview.cropHint': 'Drag over the image to choose a crop area',
      'preview.copy': 'Copy to clipboard',
      'preview.save': 'Save to disk\u2026',
      'preview.toolbar': 'Editing tools',
      'preview.ellipse': 'Ellipse',
      'preview.rectangle': 'Rectangle',
      'preview.arrow': 'Arrow',
      'preview.text': 'Text',
      'preview.mosaic': 'Mosaic',
      'preview.color': 'Annotation color',
      'preview.colorRed': 'Red',
      'preview.colorOrange': 'Orange',
      'preview.colorGreen': 'Green',
      'preview.colorBlue': 'Blue',
      'preview.colorPurple': 'Purple',
      'preview.colorWhite': 'White',
      'preview.colorBlack': 'Black',
      'preview.textPlaceholder': 'Type text',
      'preview.textHint': 'Enter to add, Esc to cancel',
      'overlay.hint': 'Drag to select an area. Release to capture.',
      'overlay.label': 'Select a screen capture area',
      'overlay.cancel': 'Cancel',
      'overlay.size': '{w} \u00d7 {h}',
      'toast.copied': 'Screenshot copied to the clipboard',
      'toast.saved': 'Screenshot saved to {path}',
      'toast.failed': 'Capture failed: {message}',
    }

    const zh = {
      'button.label': '\u622a\u56fe',
      'button.busy': '\u5904\u7406\u4e2d\u2026',
      'button.title': '\u622a\u5c4f\uff1a{mode} \u2192 {destination}',
      'button.options': '\u622a\u56fe\u9009\u9879',
      'menu.title': '\u622a\u56fe\u9009\u9879',
      'menu.mode': '\u622a\u5c4f\u65b9\u5f0f',
      'menu.destination': '\u4fdd\u5b58\u4f4d\u7f6e',
      'menu.region': '\u5212\u5b9a\u533a\u57df',
      'menu.fullscreen': '\u5168\u5c4f',
      'menu.window': '\u7a97\u53e3',
      'menu.clipboard': '\u526a\u8d34\u677f',
      'menu.file': '\u6587\u4ef6',
      'menu.preview': '\u9884\u89c8\u56fe\u7247',
      'preview.title': '\u56fe\u7247\u9884\u89c8',
      'preview.size': '{w} \u00d7 {h}',
      'preview.close': '\u5173\u95ed',
      'preview.rotateLeft': '\u5de6\u8f6c',
      'preview.rotateRight': '\u53f3\u8f6c',
      'preview.flipH': '\u6c34\u5e73\u7ffb\u8f6c',
      'preview.flipV': '\u5782\u76f4\u7ffb\u8f6c',
      'preview.crop': '\u88c1\u526a',
      'preview.reset': '\u91cd\u7f6e',
      'preview.applyCrop': '\u5e94\u7528\u88c1\u526a',
      'preview.cancelCrop': '\u53d6\u6d88\u88c1\u526a',
      'preview.cropHint': '\u5728\u56fe\u7247\u4e0a\u62d6\u52a8\u9009\u62e9\u88c1\u526a\u533a\u57df',
      'preview.copy': '\u590d\u5236\u5230\u526a\u8d34\u677f',
      'preview.save': '\u4fdd\u5b58\u5230\u78c1\u76d8\u2026',
      'preview.toolbar': '\u7f16\u8f91\u5de5\u5177',
      'preview.ellipse': '\u692d\u5706',
      'preview.rectangle': '\u77e9\u5f62',
      'preview.arrow': '\u7bad\u5934',
      'preview.text': '\u6587\u5b57',
      'preview.mosaic': '\u9a6c\u8d5b\u514b',
      'preview.color': '\u6807\u6ce8\u989c\u8272',
      'preview.colorRed': '\u7ea2\u8272',
      'preview.colorOrange': '\u6a59\u8272',
      'preview.colorGreen': '\u7eff\u8272',
      'preview.colorBlue': '\u84dd\u8272',
      'preview.colorPurple': '\u7d2b\u8272',
      'preview.colorWhite': '\u767d\u8272',
      'preview.colorBlack': '\u9ed1\u8272',
      'preview.textPlaceholder': '\u8f93\u5165\u6587\u5b57',
      'preview.textHint': 'Enter \u786e\u8ba4\uff0cEsc \u53d6\u6d88',
      'overlay.hint': '\u62d6\u52a8\u9009\u62e9\u622a\u56fe\u533a\u57df\uff0c\u677e\u5f00\u5373\u5b8c\u6210\u3002',
      'overlay.label': '\u9009\u62e9\u622a\u56fe\u533a\u57df',
      'overlay.cancel': '\u53d6\u6d88',
      'overlay.size': '{w} \u00d7 {h}',
      'toast.copied': '\u622a\u56fe\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f',
      'toast.saved': '\u622a\u56fe\u5df2\u4fdd\u5b58\u5230 {path}',
      'toast.failed': '\u622a\u56fe\u5931\u8d25\uff1a{message}',
    }

    const CSS = `
.dsh-capture-group{display:inline-flex;align-items:stretch;height:28px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-layer-1);overflow:hidden}
.dsh-capture-main,.dsh-capture-toggle{appearance:none;border:0;margin:0;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;line-height:1;display:inline-flex;align-items:center;justify-content:center;height:26px;padding:0;cursor:pointer}
.dsh-capture-main{width:28px}
.dsh-capture-main:hover:not(:disabled),.dsh-capture-toggle:hover:not(:disabled){background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.dsh-capture-main:disabled,.dsh-capture-toggle:disabled{opacity:.55;cursor:default}
.dsh-capture-main:focus-visible,.dsh-capture-toggle:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
.dsh-capture-toggle{width:18px;border-left:1px solid var(--dsw-alias-border-l1)}
.dsh-capture-spinner{display:block;width:13px;height:13px;box-sizing:border-box;border:1.5px solid var(--dsw-alias-border-l2);border-top-color:var(--dsw-alias-brand-primary);border-radius:50%;animation:dsh-capture-spin .8s linear infinite}
@keyframes dsh-capture-spin{to{transform:rotate(360deg)}}
.dsh-capture-menu-layer{position:fixed;inset:0;z-index:10020;pointer-events:auto}
.dsh-capture-menu{position:fixed;z-index:10021;box-sizing:border-box;width:236px;max-height:calc(100vh - 96px);overflow-y:auto;padding:6px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);box-shadow:0 16px 48px rgba(0,0,0,.28);font:inherit;font-size:12px;line-height:1.4;pointer-events:auto}
.dsh-capture-menu-title{padding:6px 8px 4px;color:var(--dsw-alias-label-secondary);font-size:11px;font-weight:600}
.dsh-capture-item{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;padding:7px 8px;border:0;border-radius:6px;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer}
.dsh-capture-item:hover:not(:disabled){background:var(--dsw-alias-bg-layer-2)}
.dsh-capture-item:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
.dsh-capture-item:disabled{opacity:.55;cursor:default}
.dsh-capture-radio{width:14px;height:14px;border:1.5px solid var(--dsw-alias-border-l2);border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;box-sizing:border-box}
.dsh-capture-item.is-active .dsh-capture-radio{border-color:var(--dsw-alias-brand-primary)}
.dsh-capture-item.is-active .dsh-capture-radio::after{content:'';display:block;width:7px;height:7px;border-radius:50%;background:var(--dsw-alias-brand-primary)}
.dsh-capture-check{width:14px;height:14px;border:1.5px solid var(--dsw-alias-border-l2);border-radius:3px;flex:none;display:flex;align-items:center;justify-content:center;box-sizing:border-box}
.dsh-capture-item.is-active .dsh-capture-check{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-brand-primary)}
.dsh-capture-item.is-active .dsh-capture-check::after{content:'';display:block;width:7px;height:4px;box-sizing:border-box;border-left:1.5px solid #fff;border-bottom:1.5px solid #fff;transform:rotate(-45deg) translateY(-1px)}
.dsh-capture-badge{margin-left:auto;font-size:10px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2);border-radius:999px;padding:2px 6px;white-space:nowrap}
.dsh-capture-sep{height:1px;margin:5px 6px;background:var(--dsw-alias-border-l1)}
.dsh-capture-region{position:fixed;inset:0;z-index:10010;cursor:crosshair;user-select:none;-webkit-user-select:none;touch-action:none;font-family:inherit;overflow:hidden;pointer-events:auto}
.dsh-capture-shot{position:absolute;display:block;pointer-events:none;user-select:none;-webkit-user-drag:none;border-radius:2px}
.dsh-capture-scrim{position:absolute;background:rgba(0,0,0,.52);pointer-events:none}
.dsh-capture-selection{position:absolute;border:1.5px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.55);pointer-events:none;box-sizing:border-box}
.dsh-capture-handle{position:absolute;width:6px;height:6px;background:#fff;border-radius:1px;box-shadow:0 0 0 1px rgba(0,0,0,.35)}
.dsh-capture-size{position:absolute;padding:2px 6px;border-radius:4px;background:rgba(0,0,0,.74);color:#fff;font-size:11px;line-height:1.3;white-space:nowrap;pointer-events:none}
.dsh-capture-hintbar{position:absolute;top:14px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:10px;padding:7px 8px 7px 14px;border:1px solid rgba(255,255,255,.18);border-radius:999px;background:rgba(20,20,20,.84);color:#fff;font-size:12px;line-height:1.3;box-shadow:0 8px 30px rgba(0,0,0,.35);white-space:nowrap;max-width:calc(100vw - 32px)}
.dsh-capture-hintbar button{appearance:none;border:1px solid rgba(255,255,255,.28);border-radius:999px;background:transparent;color:#fff;font:inherit;font-size:11px;line-height:1;padding:5px 9px;cursor:pointer}
.dsh-capture-hintbar button:hover{background:rgba(255,255,255,.14)}
.dsh-capture-hintbar button:focus-visible{outline:2px solid #fff;outline-offset:2px}
.dsh-capture-toast{position:fixed;left:50%;bottom:120px;transform:translateX(-50%);z-index:10060;box-sizing:border-box;max-width:min(560px,calc(100vw - 48px));padding:9px 14px;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);box-shadow:0 10px 30px rgba(0,0,0,.25);font:inherit;font-size:12px;line-height:1.5;overflow-wrap:anywhere;pointer-events:none}
.dsh-capture-toast.is-error{border-color:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary)}
.dsh-preview-backdrop{position:fixed;inset:0;z-index:10040;display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding:24px;background:rgba(0,0,0,.42);pointer-events:auto}
.dsh-preview-panel{position:relative;width:min(960px,94vw);height:min(820px,90vh);display:flex;flex-direction:column;box-sizing:border-box;overflow:hidden;border:1px solid var(--dsw-alias-border-l1);border-radius:12px;background:var(--dsw-alias-bg-layer-1);box-shadow:0 24px 80px rgba(0,0,0,.4);color:var(--dsw-alias-label-primary);font:inherit;pointer-events:auto}
.dsh-preview-header{display:flex;align-items:center;gap:8px;flex:none;padding:12px 14px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.dsh-preview-title{font-size:14px;font-weight:600}
.dsh-preview-size{margin-left:auto;font-size:11px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
.dsh-preview-icon-btn{appearance:none;width:26px;height:26px;padding:0;border:1px solid transparent;border-radius:6px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:18px;line-height:1;cursor:pointer;display:inline-flex;align-items:center;justify-content:center}
.dsh-preview-icon-btn:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.dsh-preview-icon-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
.dsh-preview-toolbar{display:flex;flex-wrap:wrap;align-items:center;gap:6px;flex:none;padding:8px 12px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.dsh-preview-tool{appearance:none;width:30px;height:30px;padding:0;border:1px solid var(--dsw-alias-border-l1);border-radius:6px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;box-sizing:border-box}
.dsh-preview-tool svg{display:block}
.dsh-preview-tool:hover:not(:disabled):not(.is-active){color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l2)}
.dsh-preview-tool:disabled{opacity:.55;cursor:default}
.dsh-preview-tool:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
.dsh-preview-tool.is-active{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:#fff}
.dsh-preview-sep{width:1px;height:22px;margin:0 2px;align-self:center;background:var(--dsw-alias-border-l1)}
.dsh-preview-colors{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.dsh-preview-color{appearance:none;width:20px;height:20px;padding:0;border:1px solid var(--dsw-alias-border-l2);border-radius:50%;cursor:pointer;box-sizing:border-box}
.dsh-preview-color:disabled{opacity:.55;cursor:default}
.dsh-preview-color:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
.dsh-preview-color.is-active{box-shadow:0 0 0 2px var(--dsw-alias-bg-layer-1),0 0 0 4px var(--dsw-alias-brand-primary)}
.dsh-preview-stage{position:relative;flex:1;min-height:0;display:flex;align-items:center;justify-content:center;padding:12px;overflow:hidden;background-color:var(--dsw-alias-bg-layer-2);background-image:linear-gradient(45deg,rgba(127,127,127,.14) 25%,transparent 25%),linear-gradient(-45deg,rgba(127,127,127,.14) 25%,transparent 25%),linear-gradient(45deg,transparent 75%,rgba(127,127,127,.14) 75%),linear-gradient(-45deg,transparent 75%,rgba(127,127,127,.14) 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0}
.dsh-preview-canvas{display:block;max-width:100%;max-height:100%;width:auto;height:auto;box-shadow:0 8px 28px rgba(0,0,0,.24)}
.dsh-preview-crop-overlay{position:absolute;z-index:2;cursor:crosshair;touch-action:none;user-select:none;-webkit-user-select:none;pointer-events:auto}
.dsh-preview-crop-box{position:absolute;border:1.5px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.55);pointer-events:none;box-sizing:border-box}
.dsh-preview-annotate-overlay{position:absolute;z-index:3;cursor:crosshair;touch-action:none;user-select:none;-webkit-user-select:none;pointer-events:auto}
.dsh-preview-text-editor{position:absolute;display:flex;flex-direction:column;gap:4px;padding:6px;border:1px solid var(--dsw-alias-border-l2);border-radius:6px;background:var(--dsw-alias-bg-overlay);box-shadow:0 8px 24px rgba(0,0,0,.22);pointer-events:auto}
.dsh-preview-text-editor input{width:208px;box-sizing:border-box;padding:5px 7px;border:1px solid var(--dsw-alias-border-l2);border-radius:4px;background:var(--dsw-alias-bg-base);font:inherit;font-size:13px;line-height:1.3;outline:none}
.dsh-preview-text-editor input:focus{border-color:var(--dsw-alias-brand-primary)}
.dsh-preview-text-editor input::placeholder{color:var(--dsw-alias-label-secondary)}
.dsh-preview-text-hint{font-size:10px;line-height:1.3;color:var(--dsw-alias-label-secondary);white-space:nowrap}
.dsh-preview-crop-hint{position:absolute;top:8px;left:50%;transform:translateX(-50%);max-width:calc(100% - 16px);padding:4px 8px;border-radius:999px;background:rgba(0,0,0,.72);color:#fff;font-size:11px;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none}
.dsh-preview-footer{display:flex;justify-content:flex-end;gap:8px;flex:none;padding:12px 14px;border-top:1px solid var(--dsw-alias-border-l1)}
.dsh-preview-action{appearance:none;height:30px;padding:0 12px;border:1px solid var(--dsw-alias-border-l2);border-radius:6px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;line-height:1;cursor:pointer}
.dsh-preview-action:hover:not(:disabled){background:var(--dsw-alias-bg-layer-2)}
.dsh-preview-action:disabled{opacity:.55;cursor:default}
.dsh-preview-action:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
.dsh-preview-action.primary{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-brand-primary);color:#fff;font-weight:600}
.dsh-preview-action.primary:hover:not(:disabled){filter:brightness(1.06)}
`

    /** Read the two remembered choices; storage can be unavailable. */
    function readPreferences() {
      try {
        const raw = localStorage.getItem(PREFERENCES_KEY)
        if (raw !== null) {
          const parsed = JSON.parse(raw)
          const mode = parsed?.mode
          const destination = parsed?.destination
          return {
            mode: mode === 'fullscreen' || mode === 'window' ? mode : 'region',
            destination: destination === 'file' ? 'file' : 'clipboard',
            preview: parsed?.preview === true,
          }
        }
      } catch {
        /* ignore an unreadable preference */
      }
      return { mode: 'region', destination: 'clipboard', preview: false }
    }

    /** One shared store; the composer control writes it and the overlay reads it. */
    function createController() {
      const preferences = readPreferences()
      let state = {
        mode: preferences.mode,
        destination: preferences.destination,
        previewMode: preferences.preview,
        menuAnchor: null,
        region: null,
        preview: null,
        busy: false,
        toast: null,
      }
      const listeners = new Set()
      let toastTimer
      let toastSequence = 0

      const emit = () => {
        for (const listener of listeners) listener()
      }
      const set = (patch) => {
        state = { ...state, ...patch }
        emit()
      }
      const persist = () => {
        try {
          localStorage.setItem(
            PREFERENCES_KEY,
            JSON.stringify({
              mode: state.mode,
              destination: state.destination,
              preview: state.previewMode,
            }),
          )
        } catch {
          /* ignore a read-only storage area */
        }
      }
      const notify = (message, kind = 'info') => {
        toastSequence += 1
        const id = toastSequence
        if (toastTimer !== undefined) clearTimeout(toastTimer)
        set({ toast: { id, message, kind } })
        toastTimer = setTimeout(() => {
          toastTimer = undefined
          if (state.toast?.id === id) set({ toast: null })
        }, 5000)
      }

      const deliverOrPreview = async (blob, t) => {
        if (state.previewMode) {
          set({ preview: { blob } })
          return
        }
        await deliver(blob, t, state.destination, notify)
      }

      return {
        get: () => state,
        subscribe(listener) {
          listeners.add(listener)
          return () => listeners.delete(listener)
        },
        setMode(mode) {
          if (mode !== 'region' && mode !== 'fullscreen' && mode !== 'window') return
          set({ mode })
          persist()
        },
        setDestination(destination) {
          if (destination !== 'clipboard' && destination !== 'file') return
          set({ destination, previewMode: false })
          persist()
        },
        setPreview(enabled) {
          set({ previewMode: enabled === true, preview: enabled === true ? state.preview : null })
          persist()
        },
        openPreview(blob) {
          set({ preview: { blob }, previewMode: true })
          persist()
        },
        closePreview() {
          if (state.preview !== null) set({ preview: null })
        },
        openMenu(anchor) {
          set({ menuAnchor: anchor })
        },
        closeMenu() {
          if (state.menuAnchor !== null) set({ menuAnchor: null })
        },
        cancelRegion() {
          if (state.region !== null) set({ region: null })
        },
        async startCapture(t) {
          if (state.busy) return
          const mode = state.mode
          set({ menuAnchor: null, busy: true })
          try {
            // Let the menu and the busy state paint before the shutter.
            await delay(140)
            const shot = await captureScreen(mode)
            if (shot.canceled) {
              set({ busy: false })
              return
            }
            if (mode === 'region' && shot.kind === 'screen') {
              set({
                region: {
                  blob: shot.blob,
                  url: URL.createObjectURL(shot.blob),
                  width: shot.width,
                  height: shot.height,
                },
                busy: false,
              })
            } else {
              await deliverOrPreview(shot.blob, t)
              set({ busy: false })
            }
          } catch (error) {
            set({ busy: false })
            notify(t('toast.failed', { message: errorText(error) }), 'error')
          }
        },
        async finishRegion(rect, t) {
          const region = state.region
          if (region === null || state.busy) return
          set({ region: null, busy: true })
          try {
            const blob = await cropPng(region.blob, rect)
            await deliverOrPreview(blob, t)
          } catch (error) {
            notify(t('toast.failed', { message: errorText(error) }), 'error')
          } finally {
            set({ busy: false })
          }
        },
        async copyPreview(blob, t) {
          try {
            await copyOnHost(blob)
            notify(t('toast.copied'))
            return true
          } catch (hostError) {
            try {
              await copyInBrowser(blob)
              notify(t('toast.copied'))
              return true
            } catch {
              notify(t('toast.failed', { message: errorText(hostError) }), 'error')
              return false
            }
          }
        },
        async savePreview(blob, t) {
          try {
            const result = await saveOnHost(blob, screenshotFileName())
            if (result.canceled === true) return false
            notify(t('toast.saved', { path: result.path }))
            return true
          } catch (error) {
            notify(t('toast.failed', { message: errorText(error) }), 'error')
            return false
          }
        },
        reportError(error, t) {
          notify(t('toast.failed', { message: errorText(error) }), 'error')
        },
        dispose() {
          if (toastTimer !== undefined) clearTimeout(toastTimer)
          toastTimer = undefined
          if (state.region !== null) {
            try {
              URL.revokeObjectURL(state.region.url)
            } catch {
              /* ignore an already-released URL */
            }
          }
          listeners.clear()
        },
      }
    }

    /** Subscribe a component to the shared controller. */
    function useController(controller) {
      const [state, setState] = React.useState(controller.get())
      React.useEffect(
        () => controller.subscribe(() => setState(controller.get())),
        [controller],
      )
      return state
    }

    const CAPTURE_ICON_SHARDS = [
      ["#0a4d1a", "M 9.807584 8.125795 c -0.047226,-0.0818 -0.1653177,-0.0818 -0.2125819,-2e-5 l -2.7091686,4.69002 c -0.047101,0.0815 0.011348,0.18406 0.1055111,0.18419 0.00288,0 0.00577,0 0.00866,0 1.7426489,0 3.3117022,-0.74298 4.4078492,-1.92938 0.03656,-0.0396 0.04318,-0.0983 0.01627,-0.14492 L 9.807592,8.125795 Z"],
      ["#116b2a", "M 7.318684 9.810505 l -5.4097573,0.005 c -0.094226,8e-5 -0.1536307,0.10217 -0.1064545,0.18373 0.8246515,1.42592 2.2192034,2.4809 3.8722553,2.85359 0.052573,0.0119 0.1068068,-0.0117 0.1337538,-0.0583 l 1.6166069,-2.80007 c 0.047277,-0.0819 -0.011863,-0.18422 -0.1064042,-0.18411 z"],
      ["#1a8a3a", "M 12.199905 4.004695 c -0.825356,-1.42976 -2.2234427,-2.48728 -3.8807595,-2.85911 -0.052561,-0.0118 -0.1067061,0.0117 -0.1336405,0.0584 l -1.6174875,2.80157 c -0.047252,0.0819 0.011813,0.18415 0.1063413,0.18412 l 5.4189662,-0.001 c 0.0942,-2e-5 0.153693,-0.10205 0.10658,-0.18365 z"],
      ["#27a94b", "M 12.613583 5.131825 l -3.2344588,0.0 c -0.094503,0 -0.1535677,0.10233 -0.1062909,0.18415 l 2.7089927,4.6888 c 0.04735,0.0819 0.165368,0.0815 0.212808,-3.1e-4 C 12.706741,9.120925 13,8.094715 13,7.000015 c 0,-0.62043 -0.09423,-1.2188 -0.269055,-1.7817 -0.01595,-0.0514 -0.06352,-0.0865 -0.117362,-0.0865 z"],
      ["#45c46a", "M 7.002114 1.000015 c -7.045e-4,0 -0.00142,0 -0.00213,0 -1.7423595,0 -3.311199,0.74275 -4.4073209,1.92881 -0.036558,0.0395 -0.043188,0.0983 -0.016254,0.14494 l 1.6162797,2.79947 c 0.047264,0.0819 0.1654436,0.0818 0.2126575,-9e-5 l 2.7023877,-4.6891 c 0.04695,-0.0815 -0.011498,-0.18401 -0.1056242,-0.18403 z"],
      ["#78d98f", "M 1.387712 8.872385 l 3.2356039,0.0 c 0.094503,0 0.1535552,-0.10231 0.106291,-0.18416 L 2.0185518,3.994515 c -0.047327,-0.082 -0.1653304,-0.0816 -0.2127959,3e-4 C 1.2933853,4.878505 1,5.904985 1,7.000015 c 0,0.62198 0.094717,1.22181 0.2703885,1.78596 0.01599,0.0514 0.063518,0.0864 0.1173239,0.0864 z"],
    ]

    /** The plugin mark: six pinwheel shards, each its own green. */
    function CaptureIcon() {
      return h(
        'svg',
        {
          viewBox: '0 0 14 14',
          width: 15,
          height: 15,
          'aria-hidden': true,
          focusable: false,
        },
        CAPTURE_ICON_SHARDS.map(([fill, d]) => h('path', { key: fill, fill, d })),
      )
    }

    function ChevronIcon() {
      return h(
        'svg',
        {
          viewBox: '0 0 16 16',
          width: 12,
          height: 12,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.6,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          focusable: false,
        },
        h('path', { d: 'M4 6l4 4 4-4' }),
      )
    }

    function ToolIcon({ children }) {
      return h(
        'svg',
        {
          viewBox: '0 0 24 24',
          width: 16,
          height: 16,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          focusable: false,
        },
        children,
      )
    }

    function RotateLeftIcon() {
      return h(
        ToolIcon,
        null,
        h('path', { d: 'M4 4v5h5' }),
        h('path', { d: 'M4.6 9A7.5 7.5 0 1 1 6.6 18' }),
      )
    }

    function RotateRightIcon() {
      return h(
        ToolIcon,
        null,
        h('path', { d: 'M20 4v5h-5' }),
        h('path', { d: 'M19.4 9A7.5 7.5 0 1 0 17.4 18' }),
      )
    }

    function FlipHorizontalIcon() {
      return h(
        ToolIcon,
        null,
        h('path', { d: 'M12 3v18', strokeDasharray: '2 2' }),
        h('path', { d: 'M9 7 4 12l5 5' }),
        h('path', { d: 'm15 7 5 5-5 5' }),
      )
    }

    function FlipVerticalIcon() {
      return h(
        ToolIcon,
        null,
        h('path', { d: 'M3 12h18', strokeDasharray: '2 2' }),
        h('path', { d: 'M7 9 12 4l5 5' }),
        h('path', { d: 'm7 15 5 5 5-5' }),
      )
    }

    function CropIcon() {
      return h(
        ToolIcon,
        null,
        h('path', { d: 'M6 2v14a2 2 0 0 0 2 2h14' }),
        h('path', { d: 'M2 6h14a2 2 0 0 1 2 2v14' }),
      )
    }

    function ResetIcon() {
      return h(
        ToolIcon,
        null,
        h('path', { d: 'M3 4v5h5' }),
        h('path', { d: 'M3.8 9A8 8 0 1 1 5.5 17.5' }),
      )
    }

    function EllipseIcon() {
      return h(ToolIcon, null, h('ellipse', { cx: 12, cy: 12, rx: 8, ry: 6 }))
    }

    function RectangleIcon() {
      return h(ToolIcon, null, h('rect', { x: 4, y: 6, width: 16, height: 12, rx: 2 }))
    }

    function ArrowIcon() {
      return h(
        ToolIcon,
        null,
        h('path', { d: 'M5 19 19 5' }),
        h('path', { d: 'M12 5h7v7' }),
      )
    }

    function TextIcon() {
      return h(
        ToolIcon,
        null,
        h('path', { d: 'M5 6V4h14v2' }),
        h('path', { d: 'M12 4v16' }),
        h('path', { d: 'M8 20h8' }),
      )
    }

    function MosaicIcon() {
      const squares = []
      for (const y of [4, 10, 16]) {
        for (const x of [4, 10, 16]) {
          squares.push(
            h('rect', {
              key: `${x}-${y}`,
              x,
              y,
              width: 4,
              height: 4,
              rx: 0.6,
              fill: 'currentColor',
              stroke: 'none',
            }),
          )
        }
      }
      return h(ToolIcon, null, squares)
    }

    function CheckIcon() {
      return h(ToolIcon, null, h('path', { d: 'm5 12 4 4L19 6' }))
    }

    function CloseIcon() {
      return h(ToolIcon, null, h('path', { d: 'm6 6 12 12M18 6 6 18' }))
    }

    /** Header utility: capture icon plus a compact options chevron. */
    function CaptureControl({ t, controller }) {
      const state = useController(controller)
      const groupRef = React.useRef(null)
      const open = state.menuAnchor !== null

      const toggle = () => {
        if (open) {
          controller.closeMenu()
          return
        }
        const rect = groupRef.current?.getBoundingClientRect()
        if (rect === undefined || rect === null) return
        controller.openMenu({
          right: Math.max(8, window.innerWidth - rect.right),
          top: Math.max(8, rect.bottom + 6),
        })
      }

      const title = t('button.title', {
        mode: t(`menu.${state.mode}`),
        destination: state.previewMode ? t('menu.preview') : t(`menu.${state.destination}`),
      })

      return h(
        'div',
        { className: 'dsh-capture-group', ref: groupRef },
        h(
          'button',
          {
            type: 'button',
            className: 'dsh-capture-main',
            disabled: state.busy,
            'aria-busy': state.busy,
            'aria-label': title,
            title,
            onClick: () => controller.startCapture(t),
          },
          state.busy ? h('span', { className: 'dsh-capture-spinner', 'aria-hidden': true }) : h(CaptureIcon),
        ),
        h(
          'button',
          {
            type: 'button',
            className: 'dsh-capture-toggle',
            disabled: state.busy,
            'aria-label': t('button.options'),
            'aria-haspopup': 'menu',
            'aria-expanded': open,
            title: t('button.options'),
            onClick: toggle,
          },
          h(ChevronIcon),
        ),
      )
    }

    const ANNOTATION_COLORS = [
      ['#ef4444', 'preview.colorRed'],
      ['#f59e0b', 'preview.colorOrange'],
      ['#22c55e', 'preview.colorGreen'],
      ['#3b82f6', 'preview.colorBlue'],
      ['#a855f7', 'preview.colorPurple'],
      ['#ffffff', 'preview.colorWhite'],
      ['#111827', 'preview.colorBlack'],
    ]

    function annotationLineWidth(width, height) {
      return Math.max(5, Math.round(Math.min(width, height) * 0.007))
    }

    function annotationFontSize(width, height) {
      return Math.max(24, Math.round(Math.min(width, height) * 0.03))
    }

    function drawAnnotationShape(context, shape, lineWidth) {
      if (shape.type === 'ellipse') {
        const centerX = (shape.x1 + shape.x2) / 2
        const centerY = (shape.y1 + shape.y2) / 2
        const radiusX = Math.abs(shape.x2 - shape.x1) / 2
        const radiusY = Math.abs(shape.y2 - shape.y1) / 2
        if (radiusX < 1 || radiusY < 1) return
        context.save()
        context.strokeStyle = shape.color
        context.lineWidth = lineWidth
        context.lineCap = 'round'
        context.beginPath()
        context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2)
        context.stroke()
        context.restore()
        return
      }

      if (shape.type === 'rect') {
        const x = Math.min(shape.x1, shape.x2)
        const y = Math.min(shape.y1, shape.y2)
        const width = Math.abs(shape.x2 - shape.x1)
        const height = Math.abs(shape.y2 - shape.y1)
        if (width < 1 || height < 1) return
        context.save()
        context.strokeStyle = shape.color
        context.lineWidth = lineWidth
        context.lineJoin = 'round'
        context.strokeRect(x, y, width, height)
        context.restore()
        return
      }

      if (shape.type === 'arrow') {
        const deltaX = shape.x2 - shape.x1
        const deltaY = shape.y2 - shape.y1
        const distance = Math.hypot(deltaX, deltaY)
        if (distance < 2) return
        const angle = Math.atan2(deltaY, deltaX)
        const headLength = Math.min(Math.max(lineWidth * 4, 12), distance * 0.6)
        const headAngle = Math.PI / 7
        context.save()
        context.strokeStyle = shape.color
        context.lineWidth = lineWidth
        context.lineCap = 'round'
        context.lineJoin = 'round'
        context.beginPath()
        context.moveTo(shape.x1, shape.y1)
        context.lineTo(shape.x2, shape.y2)
        context.stroke()
        context.beginPath()
        context.moveTo(shape.x2, shape.y2)
        context.lineTo(
          shape.x2 - headLength * Math.cos(angle - headAngle),
          shape.y2 - headLength * Math.sin(angle - headAngle),
        )
        context.moveTo(shape.x2, shape.y2)
        context.lineTo(
          shape.x2 - headLength * Math.cos(angle + headAngle),
          shape.y2 - headLength * Math.sin(angle + headAngle),
        )
        context.stroke()
        context.restore()
        return
      }

      if (shape.type === 'text') {
        const text = typeof shape.text === 'string' ? shape.text.trim() : ''
        if (text.length === 0) return
        const fontSize = shape.fontSize ?? 24
        context.save()
        context.fillStyle = shape.color
        context.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", sans-serif`
        context.textBaseline = 'top'
        context.fillText(text, shape.x, shape.y)
        context.restore()
      }
    }

    function drawAnnotationLayer(context, shapes, draft, width, height) {
      const lineWidth = annotationLineWidth(width, height)
      for (const shape of shapes) drawAnnotationShape(context, shape, lineWidth)
      if (draft !== null) drawAnnotationShape(context, draft, lineWidth)
    }

    function mosaicRadius(width, height) {
      return Math.max(18, Math.round(Math.min(width, height) * 0.04))
    }

    function mosaicBlock(radius) {
      return Math.max(8, Math.round(radius / 3))
    }

    function applyMosaicDab(base, x, y, radius, block) {
      const left = Math.max(0, Math.floor(x - radius))
      const top = Math.max(0, Math.floor(y - radius))
      const right = Math.min(base.width, Math.ceil(x + radius))
      const bottom = Math.min(base.height, Math.ceil(y + radius))
      const width = right - left
      const height = bottom - top
      if (width <= 0 || height <= 0) return
      const columns = Math.max(1, Math.ceil(width / block))
      const rows = Math.max(1, Math.ceil(height / block))
      const sample = document.createElement('canvas')
      sample.width = columns
      sample.height = rows
      const sampleContext = sample.getContext('2d')
      if (sampleContext === null) return
      sampleContext.drawImage(base, left, top, width, height, 0, 0, columns, rows)
      const context = base.getContext('2d')
      if (context === null) return
      context.save()
      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2)
      context.clip()
      context.imageSmoothingEnabled = false
      context.drawImage(sample, 0, 0, columns, rows, left, top, width, height)
      context.restore()
    }

    /** Right-side preview with geometry edits, annotations, and copy/save. */
    function CapturePreview({ t, controller, preview }) {
      const canvasRef = React.useRef(null)
      const baseCanvasRef = React.useRef(null)
      const stageRef = React.useRef(null)
      const cropOverlayRef = React.useRef(null)
      const annotateOverlayRef = React.useRef(null)
      const textInputRef = React.useRef(null)
      const dragRef = React.useRef(null)
      const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 })
      const [frame, setFrame] = React.useState(null)
      const [cropMode, setCropMode] = React.useState(false)
      const [selection, setSelection] = React.useState(null)
      const [annotations, setAnnotations] = React.useState([])
      const [draft, setDraft] = React.useState(null)
      const [activeTool, setActiveTool] = React.useState(null)
      const [annotationColor, setAnnotationColor] = React.useState(ANNOTATION_COLORS[0][0])
      const [textDraft, setTextDraft] = React.useState(null)
      const [busy, setBusy] = React.useState(false)

      const paintBlob = React.useCallback(async (blob) => {
        const base = baseCanvasRef.current ?? (baseCanvasRef.current = document.createElement('canvas'))
        const bitmap = await createImageBitmap(blob)
        try {
          base.width = bitmap.width
          base.height = bitmap.height
          const context = base.getContext('2d')
          if (context === null) throw new Error('could not create the preview canvas')
          context.clearRect(0, 0, base.width, base.height)
          context.drawImage(bitmap, 0, 0)
          return { width: base.width, height: base.height }
        } finally {
          bitmap.close?.()
        }
      }, [])

      React.useEffect(() => {
        let cancelled = false
        paintBlob(preview.blob)
          .then((size) => {
            if (cancelled || size === null) return
            setDimensions(size)
            setAnnotations([])
            setDraft(null)
            setTextDraft(null)
            setActiveTool(null)
            setCropMode(false)
            setSelection(null)
          })
          .catch((error) => {
            if (!cancelled) controller.reportError(error, t)
          })
        return () => {
          cancelled = true
        }
      }, [preview.blob, paintBlob, controller, t])

      const renderVisible = () => {
        const canvas = canvasRef.current
        const base = baseCanvasRef.current
        if (canvas === null || base === null) return
        if (canvas.width !== base.width) canvas.width = base.width
        if (canvas.height !== base.height) canvas.height = base.height
        const context = canvas.getContext('2d')
        if (context === null) return
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(base, 0, 0)
        drawAnnotationLayer(context, annotations, draft, canvas.width, canvas.height)
      }

      React.useEffect(() => {
        renderVisible()
      }, [annotations, draft, dimensions])

      const measure = React.useCallback(() => {
        const canvas = canvasRef.current
        const stage = stageRef.current
        if (canvas === null || stage === null) return
        const canvasRect = canvas.getBoundingClientRect()
        const stageRect = stage.getBoundingClientRect()
        if (canvasRect.width <= 0 || canvasRect.height <= 0) return
        setFrame({
          left: canvasRect.left - stageRect.left,
          top: canvasRect.top - stageRect.top,
          width: canvasRect.width,
          height: canvasRect.height,
        })
      }, [])

      React.useEffect(() => {
        measure()
        const stage = stageRef.current
        const canvas = canvasRef.current
        if (stage === null) return undefined
        const observer = new ResizeObserver(measure)
        observer.observe(stage)
        if (canvas !== null) observer.observe(canvas)
        window.addEventListener('resize', measure)
        return () => {
          observer.disconnect()
          window.removeEventListener('resize', measure)
        }
      }, [measure, dimensions])

      React.useEffect(() => {
        const onKeyDown = (event) => {
          if (event.key !== 'Escape') return
          event.preventDefault()
          if (textDraft !== null) {
            setTextDraft(null)
          } else if (cropMode) {
            setCropMode(false)
            setSelection(null)
          } else {
            controller.closePreview()
          }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
      }, [cropMode, textDraft, controller])

      const cloneCanvas = (source) => {
        const copy = document.createElement('canvas')
        copy.width = source.width
        copy.height = source.height
        const context = copy.getContext('2d')
        if (context !== null) context.drawImage(source, 0, 0)
        return copy
      }

      const bakeAnnotations = () => {
        const base = baseCanvasRef.current
        if (base === null) return
        const context = base.getContext('2d')
        if (context === null) return
        drawAnnotationLayer(context, annotations, null, base.width, base.height)
        setAnnotations([])
      }

      const settleBase = (width, height) => {
        setDimensions({ width, height })
        setAnnotations([])
        setDraft(null)
        setTextDraft(null)
        setCropMode(false)
        setSelection(null)
      }

      const rotate = (direction) => {
        const base = baseCanvasRef.current
        if (base === null) return
        bakeAnnotations()
        const source = cloneCanvas(base)
        base.width = source.height
        base.height = source.width
        const context = base.getContext('2d')
        if (context === null) return
        context.save()
        context.translate(base.width / 2, base.height / 2)
        context.rotate(direction === 'left' ? -Math.PI / 2 : Math.PI / 2)
        context.drawImage(source, -source.width / 2, -source.height / 2)
        context.restore()
        settleBase(base.width, base.height)
      }

      const flip = (axis) => {
        const base = baseCanvasRef.current
        if (base === null) return
        bakeAnnotations()
        const source = cloneCanvas(base)
        const context = base.getContext('2d')
        if (context === null) return
        context.save()
        context.setTransform(1, 0, 0, 1, 0, 0)
        context.clearRect(0, 0, base.width, base.height)
        if (axis === 'horizontal') {
          context.translate(base.width, 0)
          context.scale(-1, 1)
        } else {
          context.translate(0, base.height)
          context.scale(1, -1)
        }
        context.drawImage(source, 0, 0)
        context.restore()
        settleBase(base.width, base.height)
      }

      const reset = () => {
        paintBlob(preview.blob)
          .then((size) => {
            if (size === null) return
            setDimensions(size)
            setAnnotations([])
            setDraft(null)
            setTextDraft(null)
            setActiveTool(null)
            setCropMode(false)
            setSelection(null)
          })
          .catch((error) => controller.reportError(error, t))
      }

      const cropPoint = (event) => {
        const overlay = cropOverlayRef.current
        if (overlay === null) return { x: 0, y: 0 }
        const rect = overlay.getBoundingClientRect()
        return {
          x: clamp(event.clientX - rect.left, 0, rect.width),
          y: clamp(event.clientY - rect.top, 0, rect.height),
        }
      }

      const startCropDrag = (event) => {
        if (event.button !== 0) return
        event.preventDefault()
        event.currentTarget.setPointerCapture?.(event.pointerId)
        const point = cropPoint(event)
        dragRef.current = point
        setSelection({ x: point.x, y: point.y, w: 0, h: 0 })
      }

      const moveCropDrag = (event) => {
        if (dragRef.current === null) return
        setSelection(normalizeRect(dragRef.current, cropPoint(event)))
      }

      const endCropDrag = (event) => {
        if (dragRef.current === null) return
        const start = dragRef.current
        dragRef.current = null
        const rect = normalizeRect(start, cropPoint(event))
        if (rect.w < 4 || rect.h < 4) setSelection(null)
        else setSelection(rect)
      }

      const applyCrop = () => {
        const base = baseCanvasRef.current
        const overlay = cropOverlayRef.current
        if (base === null || overlay === null || selection === null) return
        const overlayRect = overlay.getBoundingClientRect()
        if (overlayRect.width <= 0 || overlayRect.height <= 0) return
        bakeAnnotations()
        const scaleX = base.width / overlayRect.width
        const scaleY = base.height / overlayRect.height
        const x = clamp(Math.round(selection.x * scaleX), 0, Math.max(0, base.width - 1))
        const y = clamp(Math.round(selection.y * scaleY), 0, Math.max(0, base.height - 1))
        const width = clamp(Math.round(selection.w * scaleX), 1, base.width - x)
        const height = clamp(Math.round(selection.h * scaleY), 1, base.height - y)
        if (width < 1 || height < 1) return
        const source = cloneCanvas(base)
        base.width = width
        base.height = height
        const context = base.getContext('2d')
        if (context === null) return
        context.drawImage(source, x, y, width, height, 0, 0, width, height)
        settleBase(base.width, base.height)
      }

      const selectTool = (tool) => {
        setActiveTool((current) => (current === tool ? null : tool))
        setCropMode(false)
        setSelection(null)
        setDraft(null)
        setTextDraft(null)
      }

      const naturalPoint = (event) => {
        const base = baseCanvasRef.current
        const rect = event.currentTarget.getBoundingClientRect()
        const displayX = clamp(event.clientX - rect.left, 0, rect.width)
        const displayY = clamp(event.clientY - rect.top, 0, rect.height)
        return {
          displayX,
          displayY,
          x: base === null ? 0 : (displayX * base.width) / rect.width,
          y: base === null ? 0 : (displayY * base.height) / rect.height,
        }
      }

      const applyMosaicAt = (point) => {
        const base = baseCanvasRef.current
        if (base === null) return
        const radius = mosaicRadius(base.width, base.height)
        applyMosaicDab(base, point.x, point.y, radius, mosaicBlock(radius))
        renderVisible()
      }

      const applyMosaicStroke = (from, to) => {
        const base = baseCanvasRef.current
        if (base === null) return
        const radius = mosaicRadius(base.width, base.height)
        const block = mosaicBlock(radius)
        const distance = Math.hypot(to.x - from.x, to.y - from.y)
        const steps = Math.max(1, Math.ceil(distance / (radius * 0.5)))
        for (let index = 1; index <= steps; index += 1) {
          const ratio = index / steps
          applyMosaicDab(
            base,
            from.x + (to.x - from.x) * ratio,
            from.y + (to.y - from.y) * ratio,
            radius,
            block,
          )
        }
        renderVisible()
      }

      const startAnnotation = (event) => {
        if (activeTool === null || event.button !== 0) return
        event.preventDefault()
        const point = naturalPoint(event)
        if (activeTool === 'text') {
          setTextDraft({ displayX: point.displayX, displayY: point.displayY, value: '' })
          setDraft(null)
          return
        }
        if (activeTool === 'mosaic') {
          event.currentTarget.setPointerCapture?.(event.pointerId)
          dragRef.current = point
          applyMosaicAt(point)
          return
        }
        event.currentTarget.setPointerCapture?.(event.pointerId)
        dragRef.current = point
        setDraft({
          type: activeTool,
          x1: point.x,
          y1: point.y,
          x2: point.x,
          y2: point.y,
          color: annotationColor,
        })
      }

      const moveAnnotation = (event) => {
        if (dragRef.current === null) return
        const point = naturalPoint(event)
        if (activeTool === 'mosaic') {
          applyMosaicStroke(dragRef.current, point)
          dragRef.current = point
          return
        }
        setDraft((current) =>
          current === null ? null : { ...current, x2: point.x, y2: point.y },
        )
      }

      const endAnnotation = (event) => {
        if (dragRef.current === null) return
        if (activeTool === 'mosaic') {
          dragRef.current = null
          return
        }
        const start = dragRef.current
        dragRef.current = null
        const point = naturalPoint(event)
        if (Math.hypot(point.x - start.x, point.y - start.y) < 6) {
          setDraft(null)
          return
        }
        setAnnotations((current) => [
          ...current,
          {
            type: activeTool,
            x1: start.x,
            y1: start.y,
            x2: point.x,
            y2: point.y,
            color: annotationColor,
          },
        ])
        setDraft(null)
      }

      const commitText = () => {
        const draftText = textDraft
        const base = baseCanvasRef.current
        const overlay = annotateOverlayRef.current
        if (draftText === null || base === null || overlay === null) return
        const text = draftText.value.trim()
        if (text.length === 0) {
          setTextDraft(null)
          return
        }
        const rect = overlay.getBoundingClientRect()
        if (rect.width <= 0 || rect.height <= 0) {
          setTextDraft(null)
          return
        }
        setAnnotations((current) => [
          ...current,
          {
            type: 'text',
            x: (draftText.displayX * base.width) / rect.width,
            y: (draftText.displayY * base.height) / rect.height,
            text,
            color: annotationColor,
            fontSize: annotationFontSize(base.width, base.height),
          },
        ])
        setTextDraft(null)
      }

      const onTextKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          event.stopPropagation()
          commitText()
        } else if (event.key === 'Escape') {
          event.preventDefault()
          event.stopPropagation()
          setTextDraft(null)
        }
      }

      const compositeBlob = () =>
        new Promise((resolve, reject) => {
          const base = baseCanvasRef.current
          if (base === null) {
            reject(new Error('the preview canvas is not ready'))
            return
          }
          const canvas = document.createElement('canvas')
          canvas.width = base.width
          canvas.height = base.height
          const context = canvas.getContext('2d')
          if (context === null) {
            reject(new Error('could not composite the preview image'))
            return
          }
          context.drawImage(base, 0, 0)
          drawAnnotationLayer(context, annotations, null, canvas.width, canvas.height)
          canvas.toBlob((blob) => {
            if (blob === null) reject(new Error('could not encode the preview image'))
            else resolve(blob)
          }, 'image/png')
        })

      const runAction = async (action) => {
        if (busy) return
        let completed = false
        setBusy(true)
        try {
          const blob = await compositeBlob()
          completed = (await action(blob)) === true
        } catch (error) {
          controller.reportError(error, t)
        } finally {
          setBusy(false)
        }
        if (completed) controller.closePreview()
      }

      const iconButton = (key, labelKey, icon, options = {}) =>
        h(
          'button',
          {
            key,
            type: 'button',
            className: `dsh-preview-tool${options.active === true ? ' is-active' : ''}`,
            title: t(labelKey),
            'aria-label': t(labelKey),
            'aria-pressed': options.pressed,
            disabled: busy || options.disabled === true,
            onClick: options.onClick,
          },
          icon,
        )

      const cropReady = selection !== null && selection.w >= 4 && selection.h >= 4
      const frameStyle =
        frame === null
          ? undefined
          : {
              left: `${frame.left}px`,
              top: `${frame.top}px`,
              width: `${frame.width}px`,
              height: `${frame.height}px`,
            }
      const textLeft =
        textDraft === null || frame === null
          ? 0
          : Math.min(textDraft.displayX, Math.max(0, frame.width - 224))
      const textTop =
        textDraft === null || frame === null
          ? 0
          : Math.min(textDraft.displayY, Math.max(0, frame.height - 54))

      return h(
        'div',
        { className: 'dsh-preview-backdrop' },
        h(
          'aside',
          {
            className: 'dsh-preview-panel',
            role: 'dialog',
            'aria-modal': 'true',
            'aria-label': t('preview.title'),
          },
        h(
          'div',
          { className: 'dsh-preview-header' },
          h('div', { className: 'dsh-preview-title' }, t('preview.title')),
          h(
            'div',
            { className: 'dsh-preview-size' },
            t('preview.size', {
              w: String(dimensions.width),
              h: String(dimensions.height),
            }),
          ),
          h(
            'button',
            {
              type: 'button',
              className: 'dsh-preview-icon-btn',
              'aria-label': t('preview.close'),
              title: t('preview.close'),
              onClick: () => controller.closePreview(),
            },
            h(CloseIcon),
          ),
        ),
        cropMode
          ? h(
              'div',
              { className: 'dsh-preview-toolbar', role: 'toolbar', 'aria-label': t('preview.toolbar') },
              iconButton('apply-crop', 'preview.applyCrop', h(CheckIcon), {
                disabled: !cropReady,
                onClick: applyCrop,
              }),
              iconButton('cancel-crop', 'preview.cancelCrop', h(CloseIcon), {
                onClick: () => {
                  setCropMode(false)
                  setSelection(null)
                },
              }),
            )
          : h(
              'div',
              { className: 'dsh-preview-toolbar', role: 'toolbar', 'aria-label': t('preview.toolbar') },
              iconButton('rotate-left', 'preview.rotateLeft', h(RotateLeftIcon), {
                onClick: () => rotate('left'),
              }),
              iconButton('rotate-right', 'preview.rotateRight', h(RotateRightIcon), {
                onClick: () => rotate('right'),
              }),
              iconButton('flip-h', 'preview.flipH', h(FlipHorizontalIcon), {
                onClick: () => flip('horizontal'),
              }),
              iconButton('flip-v', 'preview.flipV', h(FlipVerticalIcon), {
                onClick: () => flip('vertical'),
              }),
              iconButton('crop', 'preview.crop', h(CropIcon), {
                onClick: () => {
                  setActiveTool(null)
                  setTextDraft(null)
                  setDraft(null)
                  setSelection(null)
                  setCropMode(true)
                },
              }),
              h('span', { className: 'dsh-preview-sep', 'aria-hidden': true }),
              iconButton('ellipse', 'preview.ellipse', h(EllipseIcon), {
                active: activeTool === 'ellipse',
                pressed: activeTool === 'ellipse',
                onClick: () => selectTool('ellipse'),
              }),
              iconButton('rectangle', 'preview.rectangle', h(RectangleIcon), {
                active: activeTool === 'rect',
                pressed: activeTool === 'rect',
                onClick: () => selectTool('rect'),
              }),
              iconButton('arrow', 'preview.arrow', h(ArrowIcon), {
                active: activeTool === 'arrow',
                pressed: activeTool === 'arrow',
                onClick: () => selectTool('arrow'),
              }),
              iconButton('text', 'preview.text', h(TextIcon), {
                active: activeTool === 'text',
                pressed: activeTool === 'text',
                onClick: () => selectTool('text'),
              }),
              iconButton('mosaic', 'preview.mosaic', h(MosaicIcon), {
                active: activeTool === 'mosaic',
                pressed: activeTool === 'mosaic',
                onClick: () => selectTool('mosaic'),
              }),
              h('span', { className: 'dsh-preview-sep', 'aria-hidden': true }),
              h(
                'div',
                {
                  className: 'dsh-preview-colors',
                  role: 'group',
                  'aria-label': t('preview.color'),
                },
                ANNOTATION_COLORS.map(([color, key]) =>
                  h(
                    'button',
                    {
                      key: color,
                      type: 'button',
                      className: `dsh-preview-color${annotationColor === color ? ' is-active' : ''}`,
                      style: { background: color },
                      title: t(key),
                      'aria-label': t(key),
                      'aria-pressed': annotationColor === color,
                      disabled: busy,
                      onClick: () => setAnnotationColor(color),
                    },
                  ),
                ),
              ),
              h('span', { className: 'dsh-preview-sep', 'aria-hidden': true }),
              iconButton('reset', 'preview.reset', h(ResetIcon), {
                onClick: reset,
              }),
            ),
        h(
          'div',
          { className: 'dsh-preview-stage', ref: stageRef },
          h('canvas', {
            className: 'dsh-preview-canvas',
            ref: canvasRef,
            'aria-label': t('preview.title'),
          }),
          cropMode &&
            frame !== null &&
            h(
              'div',
              {
                className: 'dsh-preview-crop-overlay',
                ref: cropOverlayRef,
                style: frameStyle,
                onPointerDown: startCropDrag,
                onPointerMove: moveCropDrag,
                onPointerUp: endCropDrag,
                onPointerCancel: () => {
                  dragRef.current = null
                  setSelection(null)
                },
              },
              selection !== null &&
                h('div', {
                  className: 'dsh-preview-crop-box',
                  style: {
                    left: `${selection.x}px`,
                    top: `${selection.y}px`,
                    width: `${selection.w}px`,
                    height: `${selection.h}px`,
                  },
                }),
              h('div', { className: 'dsh-preview-crop-hint' }, t('preview.cropHint')),
            ),
          !cropMode &&
            activeTool !== null &&
            frame !== null &&
            h(
              'div',
              {
                className: 'dsh-preview-annotate-overlay',
                ref: annotateOverlayRef,
                style: frameStyle,
                onPointerDown: startAnnotation,
                onPointerMove: moveAnnotation,
                onPointerUp: endAnnotation,
                onPointerCancel: () => {
                  dragRef.current = null
                  setDraft(null)
                },
              },
              textDraft !== null &&
                h(
                  'div',
                  {
                    className: 'dsh-preview-text-editor',
                    style: { left: `${textLeft}px`, top: `${textTop}px` },
                    onPointerDown: (event) => event.stopPropagation(),
                  },
                  h('input', {
                    ref: textInputRef,
                    autoFocus: true,
                    value: textDraft.value,
                    placeholder: t('preview.textPlaceholder'),
                    style: { color: annotationColor },
                    onChange: (event) =>
                      setTextDraft((current) =>
                        current === null ? null : { ...current, value: event.target.value },
                      ),
                    onKeyDown: onTextKeyDown,
                    onBlur: () => setTextDraft(null),
                  }),
                  h('span', { className: 'dsh-preview-text-hint' }, t('preview.textHint')),
                ),
            ),
        ),
        h(
          'div',
          { className: 'dsh-preview-footer' },
          h(
            'button',
            {
              type: 'button',
              className: 'dsh-preview-action',
              disabled: busy,
              onClick: () => runAction((blob) => controller.copyPreview(blob, t)),
            },
            t('preview.copy'),
          ),
          h(
            'button',
            {
              type: 'button',
              className: 'dsh-preview-action primary',
              disabled: busy,
              onClick: () => runAction((blob) => controller.savePreview(blob, t)),
            },
            t('preview.save'),
          ),
        ),
        ),
      )
    }

    /** Menu and region selector live in the frame-wide overlay slot. */
    function CaptureOverlay({ t, controller }) {
      const state = useController(controller)
      const regionUrl = state.region?.url

      React.useEffect(() => {
        if (regionUrl === undefined) return undefined
        return () => {
          try {
            URL.revokeObjectURL(regionUrl)
          } catch {
            /* ignore an already-released URL */
          }
        }
      }, [regionUrl])

      React.useEffect(() => {
        if (state.menuAnchor === null && state.region === null) return undefined
        const onKeyDown = (event) => {
          if (event.key !== 'Escape') return
          if (state.menuAnchor !== null) controller.closeMenu()
          else controller.cancelRegion()
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
      }, [state.menuAnchor, state.region, controller])

      return h(
        React.Fragment,
        null,
        h('style', null, CSS),
        state.menuAnchor !== null &&
          h(CaptureMenu, { t, state, controller }),
        state.region !== null &&
          h(CaptureRegion, { t, controller, region: state.region }),
        state.preview !== null &&
          h(CapturePreview, { t, controller, preview: state.preview }),
        state.toast !== null &&
          h(
            'div',
            {
              className: `dsh-capture-toast${state.toast.kind === 'error' ? ' is-error' : ''}`,
              role: 'status',
            },
            state.toast.message,
          ),
      )
    }

    /** Anchored options panel: capture mode and destination. */
    function CaptureMenu({ t, state, controller }) {
      const anchor = state.menuAnchor
      const choice = (key, label, checked, onSelect, extra) =>
        h(
          'button',
          {
            key,
            type: 'button',
            role: 'menuitemradio',
            'aria-checked': checked,
            className: `dsh-capture-item${checked ? ' is-active' : ''}`,
            disabled: extra?.disabled === true,
            onClick: extra?.disabled === true ? undefined : onSelect,
          },
          h('span', { className: 'dsh-capture-radio', 'aria-hidden': true }),
          h('span', null, label),
          extra?.badge !== undefined
            ? h('span', { className: 'dsh-capture-badge' }, extra.badge)
            : null,
        )

      return h(
        'div',
        {
          className: 'dsh-capture-menu-layer',
          onPointerDown: () => controller.closeMenu(),
          onContextMenu: (event) => event.preventDefault(),
        },
        h(
          'div',
          {
            className: 'dsh-capture-menu',
            role: 'menu',
            'aria-label': t('menu.title'),
            style: { right: `${anchor.right}px`, top: `${anchor.top}px` },
            onPointerDown: (event) => event.stopPropagation(),
          },
          h('div', { className: 'dsh-capture-menu-title' }, t('menu.mode')),
          choice(
            'region',
            t('menu.region'),
            state.mode === 'region',
            () => {
              controller.setMode('region')
              controller.closeMenu()
            },
          ),
          choice(
            'fullscreen',
            t('menu.fullscreen'),
            state.mode === 'fullscreen',
            () => {
              controller.setMode('fullscreen')
              controller.closeMenu()
            },
          ),
          choice(
            'window',
            t('menu.window'),
            state.mode === 'window',
            () => {
              controller.setMode('window')
              controller.closeMenu()
            },
          ),
          h('div', { className: 'dsh-capture-sep' }),
          h('div', { className: 'dsh-capture-menu-title' }, t('menu.destination')),
          choice(
            'clipboard',
            t('menu.clipboard'),
            state.destination === 'clipboard',
            () => {
              controller.setDestination('clipboard')
              controller.closeMenu()
            },
            { disabled: state.previewMode },
          ),
          choice(
            'file',
            t('menu.file'),
            state.destination === 'file',
            () => {
              controller.setDestination('file')
              controller.closeMenu()
            },
            { disabled: state.previewMode },
          ),
          h('div', { className: 'dsh-capture-sep' }),
          h(
            'button',
            {
              type: 'button',
              role: 'menuitemcheckbox',
              'aria-checked': state.previewMode,
              className: `dsh-capture-item${state.previewMode ? ' is-active' : ''}`,
              onClick: () => {
                controller.setPreview(!state.previewMode)
                controller.closeMenu()
              },
            },
            h('span', { className: 'dsh-capture-check', 'aria-hidden': true }),
            h('span', null, t('menu.preview')),
          ),
        ),
      )
    }

    /** Full-screen frozen screenshot plus a draggable crop rectangle. */
    function CaptureRegion({ t, controller, region }) {
      const [viewport, setViewport] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      const [selection, setSelection] = React.useState(null)
      const dragRef = React.useRef(null)

      React.useEffect(() => {
        const onResize = () => {
          dragRef.current = null
          setSelection(null)
          setViewport({ width: window.innerWidth, height: window.innerHeight })
        }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
      }, [])

      const fit = React.useMemo(
        () => computeFit(region.width, region.height, viewport),
        [region.width, region.height, viewport],
      )

      const clampPoint = (x, y) => ({
        x: Math.min(fit.left + fit.width, Math.max(fit.left, x)),
        y: Math.min(fit.top + fit.height, Math.max(fit.top, y)),
      })

      const insideImage = (x, y) =>
        x >= fit.left && x <= fit.left + fit.width && y >= fit.top && y <= fit.top + fit.height

      const onPointerDown = (event) => {
        if (event.button !== 0) return
        if (!insideImage(event.clientX, event.clientY)) return
        event.preventDefault()
        event.currentTarget.setPointerCapture?.(event.pointerId)
        const point = clampPoint(event.clientX, event.clientY)
        dragRef.current = point
        setSelection({ x: point.x, y: point.y, w: 0, h: 0 })
      }

      const onPointerMove = (event) => {
        if (dragRef.current === null) return
        const point = clampPoint(event.clientX, event.clientY)
        const start = dragRef.current
        setSelection(normalizeRect(start, point))
      }

      const finish = (event) => {
        if (dragRef.current === null) return
        const start = dragRef.current
        dragRef.current = null
        event.currentTarget.releasePointerCapture?.(event.pointerId)
        const point = clampPoint(event.clientX, event.clientY)
        const rect = normalizeRect(start, point)
        if (rect.w < 4 || rect.h < 4) {
          setSelection(null)
          return
        }
        setSelection(rect)
        controller.finishRegion(
          {
            x: (rect.x - fit.left) / fit.scale,
            y: (rect.y - fit.top) / fit.scale,
            w: rect.w / fit.scale,
            h: rect.h / fit.scale,
          },
          t,
        )
      }

      const cancel = (event) => {
        if (event !== undefined) {
          event.preventDefault()
          event.stopPropagation()
        }
        dragRef.current = null
        setSelection(null)
        controller.cancelRegion()
      }

      const scrims = buildScrims(viewport, fit, selection)
      const showSelection = selection !== null && selection.w > 0 && selection.h > 0
      const sizeTop = showSelection
        ? Math.min(selection.y + selection.h + 6, viewport.height - 26)
        : 0

      return h(
        'div',
        {
          className: 'dsh-capture-region',
          role: 'dialog',
          'aria-modal': 'true',
          'aria-label': t('overlay.label'),
          onPointerDown,
          onPointerMove,
          onPointerUp: finish,
          onPointerCancel: () => {
            dragRef.current = null
            setSelection(null)
          },
          onContextMenu: (event) => event.preventDefault(),
        },
        h('img', {
          className: 'dsh-capture-shot',
          src: region.url,
          alt: '',
          draggable: false,
          style: {
            left: `${fit.left}px`,
            top: `${fit.top}px`,
            width: `${fit.width}px`,
            height: `${fit.height}px`,
          },
        }),
        scrims.map((box, index) =>
          h('div', {
            key: `scrim-${index}`,
            className: 'dsh-capture-scrim',
            style: {
              left: `${box.left}px`,
              top: `${box.top}px`,
              width: `${box.width}px`,
              height: `${box.height}px`,
            },
          }),
        ),
        showSelection &&
          h(
            'div',
            {
              className: 'dsh-capture-selection',
              style: {
                left: `${selection.x}px`,
                top: `${selection.y}px`,
                width: `${selection.w}px`,
                height: `${selection.h}px`,
              },
            },
            h('span', { className: 'dsh-capture-handle', style: { left: '-3px', top: '-3px' } }),
            h('span', { className: 'dsh-capture-handle', style: { right: '-3px', top: '-3px' } }),
            h('span', { className: 'dsh-capture-handle', style: { left: '-3px', bottom: '-3px' } }),
            h('span', { className: 'dsh-capture-handle', style: { right: '-3px', bottom: '-3px' } }),
          ),
        showSelection &&
          h(
            'div',
            {
              className: 'dsh-capture-size',
              style: {
                left: `${Math.min(selection.x, viewport.width - 90)}px`,
                top: `${sizeTop}px`,
              },
            },
            t('overlay.size', {
              w: String(Math.round(selection.w / fit.scale)),
              h: String(Math.round(selection.h / fit.scale)),
            }),
          ),
        h(
          'div',
          {
            className: 'dsh-capture-hintbar',
            onPointerDown: (event) => event.stopPropagation(),
          },
          h('span', null, t('overlay.hint')),
          h('button', { type: 'button', onClick: cancel }, t('overlay.cancel')),
        ),
      )
    }

    /** Fit a screenshot into the viewport, leaving room for the hint bar. */
    function computeFit(imageWidth, imageHeight, viewport) {
      const horizontalPadding = 32
      const topPadding = 64
      const bottomPadding = 32
      const availableWidth = Math.max(1, viewport.width - horizontalPadding * 2)
      const availableHeight = Math.max(1, viewport.height - topPadding - bottomPadding)
      if (!(imageWidth > 0) || !(imageHeight > 0)) {
        return { scale: 1, left: 0, top: topPadding, width: availableWidth, height: availableHeight }
      }
      const scale = Math.min(availableWidth / imageWidth, availableHeight / imageHeight, 1)
      const width = imageWidth * scale
      const height = imageHeight * scale
      return {
        scale,
        left: (viewport.width - width) / 2,
        top: topPadding + (availableHeight - height) / 2,
        width,
        height,
      }
    }

    /** Normalize two drag points into a positive rectangle. */
    function normalizeRect(start, end) {
      return {
        x: Math.min(start.x, end.x),
        y: Math.min(start.y, end.y),
        w: Math.abs(start.x - end.x),
        h: Math.abs(start.y - end.y),
      }
    }

    /** Four rectangles that dim everything outside the selection. */
    function buildScrims(viewport, fit, selection) {
      const width = viewport.width
      const height = viewport.height
      const box = (left, top, boxWidth, boxHeight) => ({
        left,
        top,
        width: Math.max(0, boxWidth),
        height: Math.max(0, boxHeight),
      })
      if (selection === null) {
        return [
          box(0, 0, width, fit.top),
          box(0, fit.top + fit.height, width, height - (fit.top + fit.height)),
          box(0, fit.top, fit.left, fit.height),
          box(fit.left + fit.width, fit.top, width - (fit.left + fit.width), fit.height),
        ]
      }
      return [
        box(0, 0, width, selection.y),
        box(0, selection.y + selection.h, width, height - (selection.y + selection.h)),
        box(0, selection.y, selection.x, selection.h),
        box(selection.x + selection.w, selection.y, width - (selection.x + selection.w), selection.h),
      ]
    }

    /** Ask the Host for a full-screen image or a native region crop. */
    async function captureScreen(mode) {
      const response = await fetchFromHost(`${HOST_PREFIX}/capture`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ mode }),
      })
      if (response.status === 204) return { canceled: true }
      if (!response.ok) throw new Error(await responseMessage(response))
      const blob = await response.blob()
      if (blob.size === 0) throw new Error('the screenshot was empty')
      let width = Number(response.headers.get('x-capture-width'))
      let height = Number(response.headers.get('x-capture-height'))
      if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(height) || height <= 0) {
        const bitmap = await createImageBitmap(blob)
        width = bitmap.width
        height = bitmap.height
        bitmap.close?.()
      }
      const headerKind = response.headers.get('x-capture-kind')
      const kind = headerKind === 'region' || headerKind === 'window' ? headerKind : 'screen'
      return { blob, width, height, kind, canceled: false }
    }

    /** Crop the frozen screenshot to the selected image-pixel rectangle. */
    async function cropPng(blob, rect) {
      const bitmap = await createImageBitmap(blob)
      try {
        const x = clamp(Math.round(rect.x), 0, Math.max(0, bitmap.width - 1))
        const y = clamp(Math.round(rect.y), 0, Math.max(0, bitmap.height - 1))
        const width = clamp(Math.round(rect.w), 1, bitmap.width - x)
        const height = clamp(Math.round(rect.h), 1, bitmap.height - y)
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext('2d')
        if (context === null) throw new Error('could not create the crop canvas')
        context.drawImage(bitmap, x, y, width, height, 0, 0, width, height)
        return await new Promise((resolve, reject) => {
          canvas.toBlob(
            (result) => {
              if (result === null) reject(new Error('could not encode the cropped image'))
              else resolve(result)
            },
            'image/png',
          )
        })
      } finally {
        bitmap.close?.()
      }
    }

    /** Deliver one PNG to the remembered destination. */
    async function deliver(blob, t, destination, notify) {
      if (destination === 'file') {
        const name = screenshotFileName()
        const result = await saveOnHost(blob, name)
        if (result.canceled === true) return
        notify(t('toast.saved', { path: result.path }))
        return
      }

      try {
        await copyOnHost(blob)
        notify(t('toast.copied'))
      } catch (hostError) {
        try {
          await copyInBrowser(blob)
          notify(t('toast.copied'))
        } catch {
          throw hostError
        }
      }
    }

    /** The Host owns the system clipboard on every supported platform. */
    async function copyOnHost(blob) {
      const response = await fetchFromHost(`${HOST_PREFIX}/copy`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'image/png' },
        body: blob,
      })
      await readHostResult(response)
    }

    /** The Host opens the native save dialog and writes the chosen file. */
    async function saveOnHost(blob, name) {
      const response = await fetchFromHost(`${HOST_PREFIX}/save`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'image/png', 'x-file-name': name },
        body: blob,
      })
      return await readHostResult(response)
    }

    /** Browser clipboard fallback for surfaces without a Host copy route. */
    async function copyInBrowser(blob) {
      if (typeof ClipboardItem === 'undefined' || typeof navigator.clipboard?.write !== 'function') {
        throw new Error('the browser clipboard API is unavailable')
      }
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
    }

    /** Parse the small JSON envelope used by the save/copy routes. */
    async function readHostResult(response) {
      const text = await response.text()
      let payload
      try {
        payload = text.length > 0 ? JSON.parse(text) : null
      } catch {
        throw new Error(text.trim().length > 0 ? text.trim() : `HTTP ${response.status}`)
      }
      if (!response.ok || payload === null || payload.ok !== true) {
        throw new Error(payload?.message ?? `HTTP ${response.status}`)
      }
      return payload
    }

    /** Use the page transport when present, as the rest of the UI does. */
    function fetchFromHost(path, init) {
      const target = path.replace(/^\/+/, '')
      const transport = globalThis.__DSH_TRANSPORT__
      if (typeof transport?.fetch === 'function') return transport.fetch(target, init)
      return fetch(`/${target}`, init)
    }

    /** Prefer a host message over a generic status phrase. */
    async function responseMessage(response) {
      const text = await response.text().catch(() => '')
      if (text.length > 0) {
        try {
          const payload = JSON.parse(text)
          if (typeof payload?.message === 'string' && payload.message.length > 0) {
            return payload.message
          }
        } catch {
          /* plain text is already a useful message */
        }
        return text.trim()
      }
      return `HTTP ${response.status}`
    }

    function screenshotFileName() {
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

    function clamp(value, minimum, maximum) {
      return Math.min(maximum, Math.max(minimum, value))
    }

    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }

    function errorText(error) {
      return error instanceof Error ? error.message : String(error)
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        const controller = createController()

        // The controller is the only owner of the timer and the object URL.
        ctx.effect(() => () => controller.dispose(), 'dsh-screen-capture: controller')
        ctx.effect(
          () => ctx.locale.register(NS, { en, zh }),
          'dsh-screen-capture: dictionaries',
        )

        ctx.slots.inject('conversation.session.header.utilities', () =>
          ctx.slots.register(
            {
              name: 'conversation.session.header.utilities',
              id: 'screen-capture',
              order: -9,
              locale: NS,
              inject: () => ({ controller }),
            },
            CaptureControl,
          ),
        )

        ctx.slots.inject('shell.overlay', () =>
          ctx.slots.register(
            {
              name: 'shell.overlay',
              id: 'screen-capture-overlay',
              order: 1010,
              locale: NS,
              inject: () => ({ controller }),
            },
            CaptureOverlay,
          ),
        )
      },
    }
  },
})
