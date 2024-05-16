import clipboardActions from '@stores/clipboard/clipboard.actions'
import { reducer } from './error.state'
describe('Error Reducer', () => {
  it('should return the initial state', async () => {
    const action = { type: 'unknown' }
    const state = reducer(undefined, action)
    expect(state).toEqual({ error: null })
  })

  it('should update the state with the "copyToClipBoardFailure" action', async () => {
    const error = new Error('Test error')
    const action = clipboardActions.copyToClipBoardFailure({ error })
    const state = reducer(undefined, action)
    expect(state.error).toEqual(error)
  })

  it('should update the state with the "getMaximoAssetsFailure" action', async () => {
    const error = new Error('Test error')
    const action = clipboardActions.copyToClipBoardFailure({ error })
    const state = reducer(undefined, action)
    expect(state.error).toEqual(error)
  })

  it('should update the state with the "getCurrentAssetFailure" action', async () => {
    const error = new Error('Test error')
    const action = clipboardActions.copyToClipBoardFailure({ error })
    const state = reducer(undefined, action)
    expect(state.error).toEqual(error)
  })
})
