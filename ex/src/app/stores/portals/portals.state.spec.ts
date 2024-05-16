import { TestBed } from '@angular/core/testing'
import { Actions } from '@ngrx/effects'
import { provideMockActions } from '@ngrx/effects/testing'
import { MyPortals, PortalsState } from './interfaces/state.interface'
import portalsActions from './portals.actions'
import { reducer } from './portals.state'

const initialState: PortalsState = {
  myPortals: { portals: [], loading: false, error: null },
  userPortals: { userId: '', portals: [], loading: false, error: null },
  currentPortal: null,
  portalsLoaded: false
}

const mockPortals: MyPortals[] = [
  {
    portals: [
      {
        id: '1',
        name: 'portal1'
      },
      {
        id: '2',
        name: 'portal2'
      }
    ],
    loading: false,
    error: null
  }
]

describe('PortalsState', () => {
  let action: Actions
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => action)]
    })
  })

  describe('Reducers', () => {
    it('action getMyPortals updates myPortals loading state', () => {
      const loading = true
      const state = reducer(initialState, portalsActions.getMyPortals())

      expect(state).toEqual({
        ...initialState,
        myPortals: {
          ...initialState.myPortals,
          loading
        }
      })
    })

    it('action getMyPortalsSuccess updates myPortals portals and loading state', () => {
      const portals = mockPortals[0].portals
      const loading = false
      const portalsLoaded = true

      const state = reducer(
        initialState,
        portalsActions.getMyPortalsSuccess({
          portals: portals
        })
      )

      expect(state).toEqual({
        ...initialState,
        myPortals: {
          ...initialState.myPortals,
          portals,
          loading
        },
        portalsLoaded
      })
    })

    it('action getMyPortalsFailure updates myPortals error and loading state', () => {
      const error = new Error('error')
      const loading = false
      const portalsLoaded = true

      const state = reducer(
        initialState,
        portalsActions.getMyPortalsFailure({
          error
        })
      )

      expect(state).toEqual({
        ...initialState,
        myPortals: {
          ...initialState.myPortals,
          error,
          loading
        },
        portalsLoaded
      })
    })

    it('action getUserPortals updates userPortals loading state', () => {
      const loading = true
      const state = reducer(
        initialState,
        portalsActions.getUserPortals({ userId: '1' })
      )

      expect(state).toEqual({
        ...initialState,
        userPortals: {
          ...initialState.userPortals,
          loading
        }
      })
    })

    it('action getUserPortalsSuccess updates userPortals portals and loading state', () => {
      const portals = mockPortals[0].portals
      const loading = false
      const portalsLoaded = true

      const state = reducer(
        initialState,
        portalsActions.getUserPortalsSuccess({
          portals: portals
        })
      )

      expect(state).toEqual({
        ...initialState,
        userPortals: {
          ...initialState.userPortals,
          portals,
          loading
        },
        portalsLoaded
      })
    })

    it('action getUserPortalsFailure updates myPortals error and loading state', () => {
      const error = new Error('error')
      const loading = false
      const portalsLoaded = true

      const state = reducer(
        initialState,
        portalsActions.getUserPortalsFailure({
          error
        })
      )

      expect(state).toEqual({
        ...initialState,
        userPortals: {
          ...initialState.userPortals,
          error,
          loading
        },
        portalsLoaded
      })
    })
  })
})
