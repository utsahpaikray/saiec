import dragAndDropActions from './drag-and-drop.actions'
import {
  dragAndDropFeature,
  initialState,
  reducer
} from './drag-and-drop.state'
import { DragAndDropItem } from './interfaces/state.interface'

describe('Drag and Drop Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState)
  })

  it('should handle dragOver action', () => {
    const items = [
      { type: 'image/png', kind: 'file' },
      { type: 'text/plain', kind: 'text' }
    ]
    const action = dragAndDropActions.dragOver({ items })
    const expectedState = {
      ...initialState,
      items: [
        { type: 'image/png', kind: 'file' },
        { type: 'text/plain', kind: 'text' }
      ]
    }
    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle dragLeave action', () => {
    const action = dragAndDropActions.dragLeave()
    const state = {
      ...initialState,
      items: [{ type: 'image/png', kind: 'file' }]
    }
    const expectedState = { ...initialState, items: null }
    expect(reducer(state, action)).toEqual(expectedState)
  })

  it('should handle dragCancel action', () => {
    const action = dragAndDropActions.dragCancel()
    const state = {
      ...initialState,
      items: [{ type: 'image/png', kind: 'file' }]
    }
    const expectedState = { ...initialState, items: null }
    expect(reducer(state, action)).toEqual(expectedState)
  })

  it('should handle drop action', () => {
    const files = [new File(['test'], 'test.txt', { type: 'text/plain' })]
    const action = dragAndDropActions.drop({ files })
    const state = {
      ...initialState,
      files: [new File(['hello'], 'hello.txt', { type: 'text/plain' })]
    }
    const expectedState = {
      ...initialState,
      files: [...state.files, ...files],
      items: null
    }
    expect(reducer(state, action)).toEqual(expectedState)
  })

  it('should handle reset action', () => {
    const action = dragAndDropActions.reset()
    const state = {
      ...initialState,
      files: [new File(['test'], 'test.txt', { type: 'text/plain' })],
      items: [{ type: 'image/png', kind: 'file' }]
    }
    expect(reducer(state, action)).toEqual(initialState)
  })
})

describe('Drag and Drop Selectors', () => {
  it('should select dragged items', () => {
    const state = {
      dragAndDrop: {
        items: [
          { type: 'image/png', kind: 'file' },
          { type: 'text/plain', kind: 'text' }
        ]
      }
    }
    const result = dragAndDropFeature.selectDraggedItems(state)
    expect(result).toEqual(state.dragAndDrop.items)
  })

  it('should select dragged items count', () => {
    const state = {
      dragAndDrop: {
        items: [
          { type: 'image/png', kind: 'file' },
          { type: 'text/plain', kind: 'text' }
        ]
      }
    }
    const result = dragAndDropFeature.selectDraggedItemsCount(state)
    expect(result).toBe(state.dragAndDrop.items.length)
  })

  it('should select dragged items by filter', () => {
    const state = {
      dragAndDrop: {
        items: [
          { type: 'image/png', kind: 'file' },
          { type: 'text/plain', kind: 'text' }
        ]
      }
    }
    const filter = (item: DragAndDropItem) => item.kind === 'file'
    const result = dragAndDropFeature.selectDraggedItemsBy(filter)(state)
    expect(result).toEqual([{ type: 'image/png', kind: 'file' }])
  })

  it('should select dropped files', () => {
    const state = {
      dragAndDrop: {
        files: [new File(['test'], 'test.txt', { type: 'text/plain' })]
      }
    }
    const result = dragAndDropFeature.selectDropedFiles(state)
    expect(result).toEqual(state.dragAndDrop.files)
  })

  it('should select dropped files count', () => {
    const state = {
      dragAndDrop: {
        files: [new File(['test'], 'test.txt', { type: 'text/plain' })]
      }
    }
    const result = dragAndDropFeature.selectDropedFilesCount(state)
    expect(result).toBe(state.dragAndDrop.files.length)
  })
})
