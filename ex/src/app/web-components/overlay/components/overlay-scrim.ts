import { html, LitElement, TemplateResult, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

const TAG = 'grav-local-overlay-scrim'

/**
 * TBU
 */
@customElement(TAG)
export class GravityOverlayScrim extends LitElement {
  public static override styles = css`
    :host {
      position: fixed;
      inset: 0;
    }

    :host([withBackground]) {
      opacity: 0.6;
      background-color: var(--grav-color-base-grey-900);
    }
  `
  @property({ type: Boolean, reflect: true })
  public withBackground = false

  protected override render(): TemplateResult {
    return html` <slot></slot> `
  }
}
