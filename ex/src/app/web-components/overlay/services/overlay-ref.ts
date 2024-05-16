import { Overlay } from '../overlay'
import { GravityOverlayScrim } from '../components/overlay-scrim'
import { GravityOverlayHost } from '../components/overlay-host'
import { GravityOverlayPanel } from '../components/overlay-panel'
import { OverlayConfig } from './overlay-config'
import { OverlayPortal } from './overlay-portal'
import { DynamicPosition } from './overlay-position'

export class OverlayRef {
  private static _host: GravityOverlayHost
  private static _panel: GravityOverlayPanel
  private static _scrim?: GravityOverlayScrim
  private static _portal: OverlayPortal
  private static _config?: OverlayConfig
  private static _position?: DynamicPosition

  public static get hostElement(): GravityOverlayHost {
    return OverlayRef._host
  }

  public static get panelElement(): GravityOverlayPanel {
    return OverlayRef._panel
  }

  public constructor(
    public host: GravityOverlayHost,
    public panel: GravityOverlayPanel,
    public portal: OverlayPortal,
    public config?: OverlayConfig
  ) {
    OverlayRef._host = host
    OverlayRef._panel = panel
    OverlayRef._portal = portal
    OverlayRef._config = config
    OverlayRef._position = config?.position
  }

  public static attach(element: HTMLElement): void {
    if (this.hasAttached()) {
      throw new Error('Portal already has an element attached.')
    }

    this._portal.attach(element)
    if (this._position) {
      this._position.attach()
    }

    if (this._config?.closeOnNavigation) {
      // TODO in WPLAT-24693: Perform action on window location change
    }
    if (this._config?.scrimWithBackground) {
      Overlay.getContainer().style.pointerEvents = 'auto'
      this._attachScrim(true)
    } else if (this._config?.scrim) {
      Overlay.getContainer().style.pointerEvents = 'auto'
      this._attachScrim()
    }
  }

  public static detach(): void {
    if (!this.hasAttached) {
      return
    }

    this._scrim?.remove()
    this._scrim = undefined
    Overlay.getContainer().style.pointerEvents = 'none'
  }

  public static remove(): void {
    this.detach()
    this._host.remove()
  }

  public static hasAttached(): boolean {
    return this._portal.hasAttached()
  }

  private static _attachScrim(withBackground?: boolean): void {
    this._scrim = document.createElement(
      'grav-local-overlay-scrim'
    ) as GravityOverlayScrim
    if (withBackground) {
      this._scrim.toggleAttribute('withBackground', true)
    }
    this._scrim.addEventListener('click', this.remove.bind(this))
    this._host.parentElement?.insertBefore(this._scrim, this._host)
  }
}
