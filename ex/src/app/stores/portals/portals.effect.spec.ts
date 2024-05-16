import { TestBed } from '@angular/core/testing'
import { ApolloQueryResult } from '@apollo/client/core'
import {
  AccessiblePortalsGQL,
  AccessiblePortalsQuery,
  PortalByPortalIdGQL,
  PortalByPortalIdQuery
} from '@core/portals/graphql/portals.query.graphql-gen'
import { provideMockActions } from '@ngrx/effects/testing'
import { Action } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { firstValueFrom, Observable, of, throwError } from 'rxjs'
import { MyPortals } from './interfaces/state.interface'
import portalsActions from './portals.actions'
import {
  fetchCurrentPortalsByPortalId$,
  getCurrentPortalByPortalId$,
  getPortals$
} from './portals.effects'
import { mapPortals, portalsFeature } from './portals.state'

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

describe('PortalsEffects', () => {
  let action$: Observable<Action>
  let accessiblePortalsGQL: jasmine.SpyObj<AccessiblePortalsGQL>
  let portalByPortalIdGQL: jasmine.SpyObj<PortalByPortalIdGQL>
  let store: MockStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AccessiblePortalsGQL,
          useValue: jasmine.createSpyObj('AccessiblePortalsGQL', ['fetch'])
        },
        {
          provide: PortalByPortalIdGQL,
          useValue: jasmine.createSpyObj('PortalByPortalIdGQL', ['fetch'])
        },
        provideMockActions(() => action$),
        provideMockStore({
          selectors: [
            {
              selector: portalsFeature.selectMyPortals,
              value: {
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
            },
            {
              selector: portalsFeature.selectCurrentPortal,
              value: {
                id: '1',
                name: 'portal1'
              }
            },
            {
              selector: portalsFeature.selectPortalsLoaded,
              value: true
            }
          ]
        })
      ]
    })

    action$ = new Observable<Action>()
    accessiblePortalsGQL = TestBed.inject(
      AccessiblePortalsGQL
    ) as jasmine.SpyObj<AccessiblePortalsGQL>
    portalByPortalIdGQL = TestBed.inject(
      PortalByPortalIdGQL
    ) as jasmine.SpyObj<PortalByPortalIdGQL>
    store = TestBed.inject(MockStore)
  })

  describe('getPortals$', () => {
    it('should return a getMyPortalsSuccess action if getMyPortals action triggered', async () => {
      action$ = of(portalsActions.getMyPortals())
      const apolloQueryResponseMock: ApolloQueryResult<AccessiblePortalsQuery> =
        {
          data: {
            me: {
              relatedPortalData: {
                AccessiblePortals: mockPortals[0].portals
              }
            }
          },
          loading: false,
          networkStatus: 7
        }
      accessiblePortalsGQL.fetch.and.returnValue(of(apolloQueryResponseMock))

      const effect = await firstValueFrom(
        getPortals$(action$, accessiblePortalsGQL)
      )

      const portals = mapPortals(mockPortals[0].portals) || []

      expect(effect).toEqual(
        portalsActions.getMyPortalsSuccess({
          portals
        })
      )
    })

    it('should return a getMyPortalsFailure action if accessiblePortalsGQL have error', async () => {
      action$ = of(portalsActions.getMyPortals())
      const error = new Error('error')

      accessiblePortalsGQL.fetch.and.returnValue(throwError(() => error))

      const effect = await firstValueFrom(
        getPortals$(action$, accessiblePortalsGQL)
      )

      expect(effect).toEqual(
        portalsActions.getMyPortalsFailure({
          error
        })
      )
    })
  })

  describe('fetchCurrentPortalsByPortalId$', () => {
    it('should return a fetchCurrentPortalSuccess action', async () => {
      action$ = of(portalsActions.fetchCurrentPortal({ portalId: '1' }))
      const apolloQueryResponseMock: ApolloQueryResult<PortalByPortalIdQuery> =
        {
          data: {
            me: {
              relatedPortalData: {
                AccessiblePortals: mockPortals[0].portals
              }
            }
          },
          loading: false,
          networkStatus: 7
        }
      portalByPortalIdGQL.fetch
        .withArgs({ id: '1' })
        .and.returnValue(of(apolloQueryResponseMock))

      const effect = await firstValueFrom(
        fetchCurrentPortalsByPortalId$(action$, portalByPortalIdGQL)
      )

      expect(effect).toEqual(
        portalsActions.fetchCurrentPortalSuccess({
          portal: {
            id: '1',
            name: 'portal1'
          }
        })
      )
    })

    it('should return a fetchCurrentPortalFailure action', async () => {
      action$ = of(portalsActions.fetchCurrentPortal({ portalId: '1' }))
      const error = new Error('error')

      portalByPortalIdGQL.fetch
        .withArgs({ id: '1' })
        .and.returnValue(throwError(() => error))

      const effect = await firstValueFrom(
        fetchCurrentPortalsByPortalId$(action$, portalByPortalIdGQL)
      )

      expect(effect).toEqual(
        portalsActions.fetchCurrentPortalFailure({
          error
        })
      )
    })
  })

  describe('getCurrentPortalByPortalId$', () => {
    it('should return a fetchCurrentPortalSuccess action', async () => {
      action$ = of(portalsActions.getCurrentPortal({ portalId: '1' }))
      store.overrideSelector(portalsFeature.selectCurrentPortal, {
        id: '1',
        name: 'portal1'
      })
      store.overrideSelector(portalsFeature.selectPortalsLoaded, true)
      const effect = await firstValueFrom(
        getCurrentPortalByPortalId$(action$, store)
      )

      expect(effect).toEqual(
        portalsActions.getCurrentPortalSuccess({
          portal: {
            id: '1',
            name: 'portal1'
          }
        })
      )
    })
  })
})
