import { GravityOverlayPanel } from '../components/overlay-panel'

export class OverlayPortal {
  private _attachedElement?: HTMLElement
  private _portal: GravityOverlayPanel

  public constructor(public portal: GravityOverlayPanel) {
    this._portal = portal
  }

  public attach(element: HTMLElement): void {
    const elementOrNode =
      element && element instanceof HTMLTemplateElement
        ? (element.content.cloneNode(true) as HTMLElement)
        : element
    this._portal.appendChild(elementOrNode)
    this._attachedElement = elementOrNode
  }

  public detach(): void {
    if (this._attachedElement) {
      this._portal.replaceChildren()
      this._attachedElement = undefined
    }
  }

  public hasAttached(): boolean {
    return !!this._attachedElement
  }
}
