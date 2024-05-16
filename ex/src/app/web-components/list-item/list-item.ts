import { GravityContainer } from '../container'
import { css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

const TAG = 'grav-local-list-item-local'

@customElement(TAG)
export class GravityListItem extends GravityContainer {
  @property({ type: String, reflect: true })
  public value?: string

  @property({ type: Boolean, reflect: true })
  public disabled = false

  @property({ type: Boolean, reflect: true })
  public selected = false

  public static styles = [
    ...GravityContainer.styles,
    css`
      :host {
        --grav-list-item-bg-default: var(
          --grav-color-layout-component-bg-default
        );
        --grav-list-item-bg-hover: var(--grav-color-layout-component-bg-hover);
        --grav-list-item-bg-active: var(
          --grav-color-layout-component-bg-active
        );
        --grav-list-item-bg-disabled: var(
          --grav-color-layout-component-bg-disabled
        );

        display: flex;
        gap: var(--grav-space-m);
        padding: 0 var(--grav-space-m);
        align-items: center;
        background-color: var(--grav-list-item-bg-default);
        position: relative;
      }

      :host(:hover:not([disabled])) {
        background-color: var(--grav-list-item-bg-hover);
      }

      :host(:where(:active, [selected]):not([disabled])) {
        background-color: var(--grav-list-item-bg-active);
      }

      :host([disabled]):after {
        content: '';
        inset: calc(-1 * var(--gravity-container-border-size));
        position: absolute;
        opacity: 75%;
        pointer-events: none;
        background-color: var(--grav-list-item-bg-disabled);
      }

      ::slotted(grav-button:first-of-type) {
        margin-left: auto;
      }

      ::slotted(label),
      ::slotted(grav-svg-icon) {
        order: 1;
      }
      ::slotted(label) {
        flex-grow: 1;
      }
      ::slotted(grav-button) {
        order: 2;
      }
    `
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG]: GravityListItem
  }
}
