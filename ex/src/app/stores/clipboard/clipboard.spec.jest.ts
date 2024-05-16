import { firstValueFrom, of } from 'rxjs'
import clipboardActions from './clipboard.actions'
import { copyToClipboard$ } from './clipboard.effects'
import { reducer } from './clipboard.state'

describe('Clipboard Effects', () => {
  it('should return the initial state', async () => {
    const action = { type: 'unknown' }
    const state = reducer(undefined, action)
    expect(state).toEqual({})
  })

  it('should not update the state with an unknown action', async () => {
    const action = { type: 'unknown' }
    const state = reducer(undefined, action)
    expect(state).toEqual({})
  })

  it('should trigger the effect with the "copyToClipBoard" action', async () => {
    const action = of(clipboardActions.copyToClipBoard({ text: 'test' }))

    jest.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)

    const effect = await firstValueFrom(copyToClipboard$(action))

    expect(effect).toEqual(clipboardActions.copyToClipBoardSuccess())
  })

  it('should trigger the effect with the "copyToClipBoardFailure" action', async () => {
    const action = of(clipboardActions.copyToClipBoard({ text: 'test' }))

    jest
      .spyOn(navigator.clipboard, 'writeText')
      .mockRejectedValue(new Error('test'))

    const effect = await firstValueFrom(copyToClipboard$(action))

    expect(effect).toEqual(
      clipboardActions.copyToClipBoardFailure({ error: new Error('test') })
    )
  })
})
