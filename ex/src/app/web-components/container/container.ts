import { css, html, LitElement, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'

const TAG = 'grav-container-local'

@customElement(TAG)
export class GravityContainer extends LitElement {
  @property({ type: Boolean, reflect: true })
  public elevated = false

  public static styles = [
    css`
      :host {
        --gravity-container-background-color-hover: var(
          --grav-color-layout-component-bg-hover
        );
        --gravity-container-box-shadow: var(--grav-elevation-s);

        display: inline-block;
        background-color: var(--grav-color-layout-content-bg-lighter);
        border: var(--grav-space-m) solid transparent;
      }

      :host([tabindex]:not(:where([tabindex=''], [tabindex^='-']))) {
        cursor: pointer;
        outline: none;
        transition: background-color 300ms ease-out, box-shadow 300ms ease-out;
      }

      :host(
          [tabindex][elevated]:not(:where([tabindex=''], [tabindex^='-'])):focus
        ) {
        box-shadow: var(--gravity-container-box-shadow),
          0 0 0 var(--grav-border-size-m)
            var(--grav-color-layout-component-border-hover);
      }

      :host(
          [tabindex]:not(
              :where([elevated], [tabindex=''], [tabindex^='-'])
            ):focus
        ) {
        box-shadow: 0 0 0 var(--grav-border-size-m)
          var(--grav-color-layout-component-border-hover);
      }

      :host([tabindex]:not(:where([tabindex=''], [tabindex^='-'])):hover),
      :host([tabindex]:not(:where([tabindex=''], [tabindex^='-'])):active) {
        background-color: var(--gravity-container-background-color-hover);
      }

      :host(
          [tabindex]:not(
              :where([elevated], [tabindex=''], [tabindex^='-'])
            ):active
        ) {
        box-shadow: none;
      }

      :host([elevated]),
      :host(
          [tabindex][elevated]:not(
              :where([tabindex=''], [tabindex^='-'])
            ):active
        ) {
        box-shadow: var(--gravity-container-box-shadow);
      }
    `
  ]

  public render(): TemplateResult {
    return html`<slot></slot>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG]: GravityContainer
  }
}
