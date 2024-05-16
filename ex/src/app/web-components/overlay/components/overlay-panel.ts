import { html, LitElement, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'

const TAG = 'grav-local-overlay-panel'

/**
 * TBU
 */
@customElement(TAG)
export class GravityOverlayPanel extends LitElement {
  protected override render(): TemplateResult {
    return html` <slot></slot> `
  }
}
