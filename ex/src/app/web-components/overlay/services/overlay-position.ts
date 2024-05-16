import { GravityOverlayHost } from '../components/overlay-host'
import {
  OverlayFit,
  OverlayFitsInViewport,
  Point,
  Position,
  Positions
} from '../overlay.model'
import {
  applyStyles,
  calculateOverflow,
  coerceNumberToPixelValue,
  getRoundedRect
} from '../overlay.utils'
import { OverlayRef } from './overlay-ref'

export class DynamicPosition {
  private _origin?: HTMLElement
  private _originRect?: DOMRect
  private _host?: GravityOverlayHost
  private _lastBoundingBoxSize: Partial<DOMRect> = { width: 0, height: 0 }
  private _offsetX = 0
  private _offsetY = 0
  private _overlayRect?: DOMRect
  private _positions?: Positions
  private _viewportRect?: DOMRect

  public get positions(): Positions | undefined {
    return this._positions
  }

  // Attach host to the overlay position class
  public attach(): void {
    OverlayRef.hostElement.classList.add('grav-overlay-bounding-box')
    this._host = OverlayRef.hostElement

    this.apply()
  }

  // Apply style and position of the overlay element
  public apply(): void {
    this._resetPanelStyles()
    this._resetHostStyles()

    this._viewportRect = document.documentElement.getBoundingClientRect()
    this._originRect = this._origin?.getBoundingClientRect()
    this._overlayRect = OverlayRef.panelElement.getBoundingClientRect()

    const viewportRect = this._viewportRect
    const overlayRect = this._overlayRect
    const originRect = this._originRect

    if (!originRect) return

    this._positions?.forEach((position) => {
      const originPoint = this._getOriginPoint(originRect, position)
      const overlayPoint = this._getOverlayPoint(
        originPoint,
        overlayRect,
        position
      )
      const overlayFit = this._getOverlayFit(
        overlayPoint,
        overlayRect,
        viewportRect,
        position
      )

      this._applyPosition(originPoint, position)

      // TODO in WPLAT-24693: Fix adjusting position when too close to viewport edge
      // if (overlayFit.fitsInViewport === 'completely') {
      //   this._applyPosition(originPoint, position);
      //   return;
      // }
    })
  }

  // Origin to attach the overlay element to
  public setOrigin(origin: HTMLElement): DynamicPosition {
    this._origin = origin

    return this
  }

  // Define custom positions when the overlay element has to be positioned other then in the center
  public withPositions(positions: Positions): DynamicPosition {
    this._positions = positions

    return this
  }

  // Point of origin relative to the viewport
  private _getOriginPoint(originRect: DOMRect, position: Position): Point {
    let x: number
    let y: number

    if (position.elementX === 'center') {
      x = originRect.left + originRect.width / 2
    } else {
      x = position.elementX === 'start' ? originRect.left : originRect.right
    }

    if (position.elementY === 'center') {
      y = originRect.top + originRect.height / 2
    } else {
      y = position.elementY === 'start' ? originRect.top : originRect.bottom
    }

    return { x, y }
  }

  // Point of overlay relative to the viewport
  private _getOverlayPoint(
    originPoint: Point,
    overlayRect: DOMRect,
    position: Position
  ): Point {
    let x: number
    let y: number

    if (position.overlayX === 'center') {
      x = -overlayRect.width / 2
    } else {
      x = position.overlayX === 'start' ? 0 : -overlayRect.width
    }

    if (position.overlayY === 'center') {
      y = -overlayRect.height / 2
    } else {
      y = position.overlayY === 'start' ? 0 : -overlayRect.height
    }

    return {
      x: originPoint.x + x,
      y: originPoint.y + y
    }
  }

  private _getOverlayFit(
    overlayPoint: Point,
    overlayRect: DOMRect,
    viewportRect: DOMRect,
    position: Position
  ): OverlayFit {
    const overlay = getRoundedRect(overlayRect)

    let { x, y } = overlayPoint
    x += position.offsetX || this._offsetX
    y += position.offsetY || this._offsetY

    const overflowRight = x + overlay.width - viewportRect.width
    const overflowLeft = -x
    const overflowTop = -y
    const overflowBottom = y + overlay.height - viewportRect.height
    const visibleWidth = calculateOverflow(
      overlay.width,
      overflowLeft,
      overflowRight
    )
    const visibleHeight = calculateOverflow(
      overlay.width,
      overflowTop,
      overflowBottom
    )
    const visibleView = visibleWidth * visibleHeight

    let fitsInViewport: OverlayFitsInViewport = 'completely'
    if (overlay.width * overlay.height === visibleView) {
      fitsInViewport = 'completely'
    } else {
      if (visibleWidth === overlay.width) {
        fitsInViewport = 'horizontally'
      }
      if (visibleHeight === overlay.height) {
        fitsInViewport = 'vertically'
      }
    }

    return { visibleView, fitsInViewport }
  }

  private _applyPosition(originPoint: Point, position: Position): void {
    this._setPanelStyles(position)
    this._setHostStyles(originPoint, position)
  }

  private _setPanelStyles(position: Position): void {
    const styles: Partial<CSSStyleDeclaration> = {
      position: 'absolute'
    }

    let transformString = ''
    const offsetX = position.offsetX || this._offsetX
    const offsetY = position.offsetY || this._offsetY
    if (offsetX) {
      transformString += `translateX(${offsetX}px) `
    }
    if (offsetY) {
      transformString += `translateY(${offsetY}px)`
    }
    if (transformString.length) {
      styles.transform = transformString.trim()
    }

    applyStyles(OverlayRef.panelElement.style, styles)
  }

  private _resetPanelStyles(): void {
    applyStyles(OverlayRef.panelElement.style, {
      top: '',
      right: '',
      bottom: '',
      left: '',
      position: '',
      transform: ''
    })
  }

  private _setHostStyles(originPoint: Point, position: Position): void {
    const styles: Partial<CSSStyleDeclaration> = {}
    const boundingBoxRect = this._calculateHostBoundingBoxRect(
      originPoint,
      position
    )

    styles.top = coerceNumberToPixelValue(boundingBoxRect.top)
    styles.right = coerceNumberToPixelValue(boundingBoxRect.right)
    styles.bottom = coerceNumberToPixelValue(boundingBoxRect.bottom)
    styles.left = coerceNumberToPixelValue(boundingBoxRect.left)
    styles.width = coerceNumberToPixelValue(boundingBoxRect.width)
    styles.height = coerceNumberToPixelValue(boundingBoxRect.height)

    if (position.overlayX === 'center' || position.elementX === 'center') {
      styles.justifyContent = 'center'
    } else if (position.overlayX === 'end' || position.elementX === 'end') {
      styles.justifyContent = 'flex-end'
    } else if (position.overlayX === 'start' || position.elementX === 'start') {
      styles.justifyContent = 'flex-start'
    }

    if (position.overlayY === 'center' || position.elementY === 'center') {
      styles.alignItems = 'center'
    } else if (position.overlayY === 'end' || position.elementY === 'start') {
      styles.alignItems = 'flex-end'
    } else if (position.overlayY === 'start' || position.elementY === 'end') {
      styles.alignItems = 'flex-start'
    }

    this._lastBoundingBoxSize = boundingBoxRect

    if (this._host) {
      applyStyles(OverlayRef.hostElement.style, styles)
    }
  }

  private _resetHostStyles(): void {
    applyStyles(OverlayRef.hostElement.style, {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      width: '',
      height: '',
      justifyContent: 'center',
      alignItems: 'center'
    })
  }

  // Calculate host and its position relative to the viewport
  private _calculateHostBoundingBoxRect(
    originPoint: Point,
    position: Position
  ): Partial<DOMRect> {
    const viewportRect = this._viewportRect
    const originRect = this._originRect
    let top, right, bottom, left, width, height

    if (viewportRect && originRect) {
      if (position.elementY === 'start') {
        bottom = viewportRect.height - originPoint.y
        height = viewportRect.height - bottom
      } else if (position.elementY === 'end') {
        top = originPoint.y
        height = viewportRect.height - top
      } else if (position.elementY === 'center') {
        const closestToViewportEdge = Math.min(
          viewportRect.bottom - originPoint.y + viewportRect.top,
          originPoint.y
        )
        const previousHeight = this._lastBoundingBoxSize.height
        height = closestToViewportEdge * 2
        top = originPoint.y - closestToViewportEdge

        if (previousHeight && height > previousHeight) {
          top = originPoint.y - previousHeight / 2
        }
      }

      if (position.elementX === 'end') {
        right = viewportRect.width - originPoint.x
        width = originPoint.x
      } else if (position.elementX === 'start') {
        left = originPoint.x
        width = viewportRect.right - originPoint.x
      } else if (position.elementX === 'center') {
        const closestToViewportEdge = Math.min(
          viewportRect.right - originPoint.x + viewportRect.left,
          originPoint.x
        )
        const previousWidth = this._lastBoundingBoxSize.width
        width = closestToViewportEdge * 2
        left = originPoint.x - closestToViewportEdge

        if (previousWidth && width > previousWidth) {
          left = originPoint.x - previousWidth / 2
        }
      }
    }

    return { top, right, bottom, left, width, height }
  }
}
