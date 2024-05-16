import { html, LitElement, TemplateResult } from 'lit'
import {
  customElement,
  property,
  queryAssignedElements
} from 'lit/decorators.js'
import { Overlay, OverlayRef } from '../overlay'
import { Config, Positions } from '../overlay/overlay.model'
import {
  DropdownPosition,
  DropdownPositionHorizontal,
  DropdownPositionVertical,
  SelectedElementEvent
} from './dropdown.model'

/**
 * TODO: Move this grav-dropdown component to grav repo with all confirmed design
 * and sharable features, and create a PR for Gravity Core team to review.
 **/

const TAG = 'grav-dropdown-local'

@customElement(TAG)
export class GravityDropdown extends LitElement {
  @property({ type: String })
  public trigger = 'click'

  @property()
  public value!: any

  @property({ type: Object })
  public position: DropdownPosition = {
    horizontal: DropdownPositionHorizontal.Left,
    vertical: DropdownPositionVertical.Bottom
  }

  @queryAssignedElements()
  private _elements!: HTMLElement[]

  private get _listTemplate() {
    return this._elements.find(
      (element: HTMLElement) => element instanceof HTMLTemplateElement
    )
  }

  private get _triggerElement() {
    return this._elements.find(
      (element: HTMLElement) => element !== this._listTemplate
    )
  }

  public render(): TemplateResult {
    return html` <slot @slotchange="${this._onSlotChanged}"></slot>`
  }

  private _onSlotChanged(): void {
    this._triggerElement?.addEventListener(
      this.trigger,
      this._slotChangehandler.bind(this)
    )
  }

  private _slotChangehandler(event: Event): void {
    const renderedTemplate = this._openDropdown(event)
    if (!renderedTemplate) return

    const allElements = renderedTemplate.querySelectorAll('*')

    const filteredElements = Array.from(allElements).filter(
      (element) =>
        (element.childElementCount === 0 && element.textContent) ||
        element instanceof HTMLInputElement
    )

    filteredElements.forEach((element) => {
      element.addEventListener(
        'click',
        this._setSelectedElement.bind(this, element),
        { once: true }
      )
    })
  }

  private _openDropdown(event: Event) {
    event.stopPropagation()
    if (this._elements.length > 2)
      throw new Error(
        'A dropdown can only have a trigger element and a list template'
      )
    if (!this._triggerElement) throw new Error('A trigger element must exist')
    if (!this._listTemplate) throw new Error('A list template must exist')

    const config: Config = {
      scrim: true
    }
    const positions: Positions = [
      {
        elementX:
          this.position.horizontal === DropdownPositionHorizontal.Left
            ? 'start'
            : 'end',
        elementY:
          this.position.vertical === DropdownPositionVertical.Bottom
            ? 'end'
            : 'start'
      }
    ]
    const position = Overlay.position()
      .setOrigin(this._triggerElement)
      .withPositions(positions)
    config.position = position

    Overlay.create(config)
    OverlayRef.attach(this._listTemplate)
    document.addEventListener('wheel', this._removeOverlay)

    return OverlayRef.panelElement.firstElementChild
  }

  private _removeOverlay(e: Event): void {
    e.preventDefault()
    e.stopPropagation()

    OverlayRef.remove()
  }

  private _setSelectedElement(element: HTMLInputElement | Element) {
    if (element.hasAttribute('value'))
      this.value = (element as HTMLInputElement).value

    OverlayRef.remove()

    const event = new CustomEvent<SelectedElementEvent>('selectedElement', {
      detail: {
        selectedElement: element
      }
    })
    this.dispatchEvent(event)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG]: GravityDropdown
  }
}
