import { html, LitElement, TemplateResult, css } from 'lit'
import { customElement } from 'lit/decorators.js'

const TAG = 'grav-local-overlay-host'

/**
 * TBU
 */
@customElement(TAG)
export class GravityOverlayHost extends LitElement {
  public static override styles = css`
    :host {
      display: flex;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    slot {
      pointer-events: auto;
    }
  `

  protected override render(): TemplateResult {
    return html` <slot></slot> `
  }
}
