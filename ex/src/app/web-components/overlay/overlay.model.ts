import { DynamicPosition } from './services/overlay-position'

export interface Config {
  closeOnNavigation?: boolean
  position?: DynamicPosition
  scrim?: boolean
  scrimWithBackground?: boolean
}

type PositionType = 'start' | 'center' | 'end'

export interface ElementPosition {
  elementX: PositionType
  elementY: PositionType
}

export interface OffsetPosition {
  offsetX: number
  offsetY: number
}

export interface OverlayPosition {
  overlayX: PositionType
  overlayY: PositionType
}

export interface Position
  extends Partial<ElementPosition & OffsetPosition & OverlayPosition> {}

export interface Positions extends Array<Position> {}

export type OverlayFitsInViewport = 'completely' | 'horizontally' | 'vertically'

export interface OverlayFit {
  visibleView: number
  fitsInViewport: OverlayFitsInViewport
}

export interface Point {
  x: number
  y: number
}
