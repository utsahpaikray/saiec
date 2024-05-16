import {
  ActionReducer,
  createFeature,
  createReducer,
  createSelector,
  on
} from '@ngrx/store'
import dragAndDropActions from './drag-and-drop.actions'
import { DragAndDropItem, DragAndDropState } from './interfaces/state.interface'

export const initialState: DragAndDropState = {
  files: null,
  items: null
}

export const reducer: ActionReducer<DragAndDropState> = createReducer(
  initialState,
  on(dragAndDropActions.dragOver, (state, { items }) => ({
    ...state,
    items: items.map((item) => ({
      type: item.type,
      kind: item.kind
    }))
  })),
  on(dragAndDropActions.dragLeave, (state) => ({
    ...state,
    items: null
  })),
  on(dragAndDropActions.dragCancel, (state) => ({
    ...state,
    items: null
  })),
  on(dragAndDropActions.drop, (state, { files }) => ({
    files: state.files ? [...state.files, ...files] : files,
    items: null
  })),
  on(dragAndDropActions.reset, () => ({
    files: null,
    items: null
  }))
)

export const dragAndDropFeature = createFeature({
  name: 'dragAndDrop',
  reducer,
  extraSelectors: ({ selectDragAndDropState }) => ({
    selectDraggedItems: createSelector(
      selectDragAndDropState,
      (state) => state.items
    ),
    selectDraggedItemsCount: createSelector(
      selectDragAndDropState,
      (state) => state.items?.length ?? 0
    ),
    selectDraggedItemsBy: (
      filter: (
        item: DragAndDropItem,
        index: number,
        array: DragAndDropItem[]
      ) => unknown
    ) =>
      createSelector(selectDragAndDropState, (state) =>
        (state.items || []).filter(filter)
      ),
    selectDropedFiles: createSelector(
      selectDragAndDropState,
      (state) => state.files
    ),
    selectDropedFilesCount: createSelector(
      selectDragAndDropState,
      (state) => state.files?.length ?? 0
    )
  })
})
