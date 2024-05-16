import { DynamicPosition } from './overlay-position'
import { Config } from '../overlay.model'

export class OverlayConfig {
  public closeOnNavigation = true
  public position?: DynamicPosition
  public scrim = false
  public scrimWithBackground = false

  constructor(public config?: Config) {
    this.closeOnNavigation = config?.closeOnNavigation ?? true
    this.position = config?.position
    this.scrim = config?.scrim ?? false
    this.scrimWithBackground = config?.scrimWithBackground ?? false
  }
}
