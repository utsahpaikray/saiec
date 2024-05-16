import { html, LitElement, TemplateResult, css } from 'lit'
import { customElement } from 'lit/decorators.js'

const TAG = 'grav-local-overlay-container'

/**
 * Overlay container for rendering portal elements on top of the DOM of a project,
 * or inside a specified HTML element.
 * It contains a slot for projecting a host element.
 * This container can be added to the DOM by using the Gravity Overlay service
 * or updated by using the Gravity OverlayRef service.
 */
@customElement(TAG)
export class GravityOverlayContainer extends LitElement {
  public static override styles = css`
    :host {
      --grav-overlay-container-z-index: 1000;

      position: fixed;
      z-index: var(--grav-overlay-container-z-index);
      pointer-events: none;
      inset: 0;
    }
  `

  protected override render(): TemplateResult {
    return html` <slot></slot> `
  }
}
