import { GravityOverlayContainer } from './components/overlay-container'
import { GravityOverlayHost } from './components/overlay-host'
import { GravityOverlayPanel } from './components/overlay-panel'
import { Config } from './overlay.model'
import { OverlayConfig } from './services/overlay-config'
import { OverlayPortal } from './services/overlay-portal'
import { DynamicPosition } from './services/overlay-position'
import { OverlayRef } from './services/overlay-ref'

let uniquePanelId = 0

/**
 * TODO: This is a drafted version of Gravity Overaly manager from Vanderlande warehouse
 * team. Remove this component and use the one from Gravity repo once the final version
 * is approved in Gravity repo
 **/

/**
 * Overlay service for creation of the Overlay components and additional services
 */
export class Overlay {
  private static _container: GravityOverlayContainer

  public static create(config?: Config): OverlayRef {
    const host = this._createHost()
    const panel = this._createPanel(host)
    const portal = this._createPortal(panel)
    const overlayConfig = new OverlayConfig(config)
    const overlayRef = new OverlayRef(host, panel, portal, overlayConfig)
    document.body.prepend(this._container)

    return overlayRef
  }

  public static getContainer(): GravityOverlayContainer {
    if (!this._container) {
      return this._createContainer()
    }
    return this._container
  }

  public static position(): DynamicPosition {
    return new DynamicPosition()
  }

  private static _createContainer(): GravityOverlayContainer {
    const container = document.createElement(
      'grav-local-overlay-container'
    ) as GravityOverlayContainer
    document.body.prepend(container)
    this._container = container
    return this._container
  }

  private static _createHost(): GravityOverlayHost {
    const host = document.createElement(
      'grav-local-overlay-host'
    ) as GravityOverlayHost
    this.getContainer().appendChild(host)

    return host
  }

  private static _createPanel(host: GravityOverlayHost): GravityOverlayPanel {
    const panel = document.createElement(
      'grav-local-overlay-panel'
    ) as GravityOverlayPanel
    panel.id = `grav-overlay-panel-${uniquePanelId++}`
    host.appendChild(panel)

    return panel
  }

  private static _createPortal(panel: GravityOverlayPanel): OverlayPortal {
    return new OverlayPortal(panel)
  }
}
