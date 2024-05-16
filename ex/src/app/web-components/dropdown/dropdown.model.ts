export interface DropdownPosition {
  horizontal: DropdownPositionHorizontal
  vertical: DropdownPositionVertical
}

export enum DropdownPositionHorizontal {
  Left = 'left',
  Right = 'right'
}

export enum DropdownPositionVertical {
  Top = 'top',
  Bottom = 'bottom'
}

export interface SelectedElementEvent {
  selectedElement: HTMLInputElement | Element
}
