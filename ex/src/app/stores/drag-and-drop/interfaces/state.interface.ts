export interface DragAndDropItem {
  type: string
  kind: string
}

export interface DragAndDropState {
  files: File[] | null
  items: DragAndDropItem[] | null
}
