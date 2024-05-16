import toastActions from './toast.actions'
import { ToastType, initialState, reducer, toastFeature } from './toast.state'

describe('Toast Reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState)
  })

  it('should add toast for the actions', () => {
    const toast = {
      id: 'test_id',
      messageKey: 'Copied to clipboard',
      type: ToastType.Success,
      TTL: 7000
    }
    const action = toastActions.addToast({ toast })
    const expectedState = {
      toasts: [toast]
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should remove toast for the actions', () => {
    const toast = {
      id: 'test_id',
      messageKey: 'Copied to clipboard',
      type: ToastType.Success,
      TTL: 7000
    }
    const action = toastActions.removeToast({ id: 'test_id' })
    const state = {
      toasts: [toast]
    }
    const expectedState = {
      toasts: []
    }
    expect(reducer(state, action)).toEqual(expectedState)
  })

  it('should not remove toast if id is not found', () => {
    const toast = {
      id: 'test_id',
      messageKey: 'Copied to clipboard',
      type: ToastType.Success,
      TTL: 7000
    }
    const action = toastActions.removeToast({ id: 'non_existing_id' })
    const state = {
      toasts: [toast]
    }
    const expectedState = {
      toasts: [toast]
    }
    expect(reducer(state, action)).toEqual(expectedState)
  })
})

describe('Toast Selectors', () => {
  it('should return the toasts', () => {
    const toasts = [
      {
        id: 'test_id',
        messageKey: 'Copied to clipboard',
        type: ToastType.Success,
        TTL: 7000
      }
    ]
    const state = {
      toast: {
        toasts
      }
    }
    expect(toastFeature.selectToasts(state)).toEqual(toasts)
  })

  it('should return an empty array if toasts are empty', () => {
    const state = {
      toast: {
        toasts: []
      }
    }
    expect(toastFeature.selectToasts(state)).toEqual([])
  })

  it('should return the single toast', () => {
    const toasts = [
      {
        id: 'test_id',
        messageKey: 'Copied to clipboard',
        type: ToastType.Success,
        TTL: 7000
      }
    ]
    const state = {
      toast: {
        toasts
      }
    }
    expect(toastFeature.selectFirstToast(state)).toEqual(toasts[0])
  })

  it('should return null if toasts are empty, in case of selectToast', () => {
    const state = {
      toast: {
        toasts: []
      }
    }
    expect(toastFeature.selectFirstToast(state)).toEqual(null)
  })
})
