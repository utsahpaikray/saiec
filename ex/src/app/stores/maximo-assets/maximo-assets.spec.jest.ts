import { TestBed } from '@angular/core/testing'
import { ApolloQueryResult } from '@apollo/client'
import { SiteMaximoAssetBySiteIdResponse } from '@mocks/siteMaximoAssetBySiteId.query.mock'
import { SiteMaximoAssetsResponse } from '@mocks/siteMaximoAssets.query.mock'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { siteDetailFeature } from '@stores/site-details/site-detail.state'
import { firstValueFrom, of, throwError } from 'rxjs'
import {
  AssetBySystemComponentIdGQL,
  AssetBySystemComponentIdQuery
} from './graphql/site-maximo-asset-by-assetId.graphql-gen'
import {
  SiteMaximoAssetsGQL,
  SiteMaximoAssetsQuery
} from './graphql/site-maximo-assets.graphql-gen'
import maximoAssetsActions from './maximo-assets.actions'
import {
  getMaximoAssets$,
  getMaximoCurrentAsset$
} from './maximo-assets.effects'
import { reducer } from './maximo-assets.state'

describe('MaximoAssetsStore Reducer', () => {
  it('should return the initial state', async () => {
    const action = { type: 'unknown' }
    const state = reducer(undefined, action)
    expect(state).toEqual({
      assets: null,
      currentAsset: null,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false
      },
      loading: false,
      error: null
    })
  })

  it('should change the loading state when getMaximoAssets action triggered', async () => {
    const action = maximoAssetsActions.getMaximoAssets({
      siteId: '1',
      skip: 0,
      take: 10
    })

    const state = reducer(undefined, action)
    expect(state).toEqual({
      assets: null,
      currentAsset: null,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false
      },
      loading: true,
      error: null
    })
  })

  it('should get the assets when getMaximoAssetsSuccess action triggered', async () => {
    const assets = [
      {
        id: '1',
        markCode: 'test code',
        markNumber: 'test number',
        description: 'test'
      }
    ]

    const action = maximoAssetsActions.getMaximoAssetsSuccess({
      assets,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false
      }
    })

    const state = reducer(undefined, action)
    expect(state).toEqual({
      assets,
      currentAsset: null,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false
      },
      loading: false,
      error: null
    })
  })

  it('should get the error when getMaximoAssetsFailure action triggered', async () => {
    const error = new Error('test error')
    const action = maximoAssetsActions.getMaximoAssetsFailure({ error })

    const state = reducer(undefined, action)
    expect(state).toEqual({
      assets: null,
      currentAsset: null,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false
      },
      loading: false,
      error
    })
  })

  it('should change the loading state when getCurrentAsset action triggered', async () => {
    const action = maximoAssetsActions.getCurrentAsset({ assetId: '1' })

    const state = reducer(undefined, action)
    expect(state).toEqual({
      assets: null,
      currentAsset: null,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false
      },
      loading: true,
      error: null
    })
  })

  it('should get the current asset when getCurrentAssetSuccess action triggered', async () => {
    const currentAsset = {
      id: '1',
      siteId: '1',
      markCode: 'test code',
      markNumber: 'test number',
      description: 'test',
      revision: '1.0'
    }

    const action = maximoAssetsActions.getCurrentAssetSuccess({ currentAsset })

    const state = reducer(undefined, action)
    expect(state).toEqual({
      assets: null,
      currentAsset,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false
      },
      loading: false,
      error: null
    })
  })

  it('should get the error when getCurrentAssetFailure action triggered', async () => {
    const error = new Error('test error')
    const action = maximoAssetsActions.getCurrentAssetFailure({ error })

    const state = reducer(undefined, action)
    expect(state).toEqual({
      assets: null,
      currentAsset: null,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false
      },
      loading: false,
      error
    })
  })
})

const siteMaximoAssetBySiteIdMock: ApolloQueryResult<AssetBySystemComponentIdQuery> =
  {
    data: SiteMaximoAssetBySiteIdResponse,
    networkStatus: 7,
    loading: false
  }

const siteMaximoAssetsMock: ApolloQueryResult<SiteMaximoAssetsQuery> = {
  data: SiteMaximoAssetsResponse,
  networkStatus: 7,
  loading: false
}

describe('MaximoAssetsStore Effects', () => {
  let siteMaximoAssetsGQL: jest.Mocked<SiteMaximoAssetsGQL>
  let assetBySystemComponentIdGQL: jest.Mocked<AssetBySystemComponentIdGQL>
  let mockStore: MockStore
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: siteDetailFeature.selectSiteId,
              value: '1'
            }
          ]
        }),
        {
          provide: SiteMaximoAssetsGQL,
          useValue: siteMaximoAssetsMock
        },
        {
          provide: AssetBySystemComponentIdGQL,
          useValue: siteMaximoAssetBySiteIdMock
        }
      ]
    })

    siteMaximoAssetsGQL = TestBed.inject(
      SiteMaximoAssetsGQL
    ) as jest.Mocked<SiteMaximoAssetsGQL>
    assetBySystemComponentIdGQL = TestBed.inject(
      AssetBySystemComponentIdGQL
    ) as jest.Mocked<AssetBySystemComponentIdGQL>

    mockStore = TestBed.inject(MockStore)
  })
  it('should return getMaximoAssetsSuccess action on success', async () => {
    const action = of(
      maximoAssetsActions.getMaximoAssets({ siteId: '1', skip: 0, take: 10 })
    )

    // Mock the fetch method of siteMaximoAssetsGQL
    siteMaximoAssetsGQL.watch = jest.fn().mockReturnValue({
      valueChanges: of(siteMaximoAssetsMock)
    })

    const effect = await firstValueFrom(
      getMaximoAssets$(action, siteMaximoAssetsGQL)
    )

    expect(effect).toEqual(
      maximoAssetsActions.getMaximoAssetsSuccess({
        assets: [
          {
            id: '1',
            description: 'test desc',
            markCode: '1',
            markNumber: '1'
          },
          {
            id: '2',
            description: 'test desc 2',
            markCode: '2',
            markNumber: '2'
          },
          {
            id: '3',
            description: 'test desc 3',
            markCode: '3',
            markNumber: '3'
          }
        ],
        pageInfo: { hasNextPage: false, hasPreviousPage: false }
      })
    )
  })

  it('should return getMaximoAssetsFailure action on error', async () => {
    const action = of(
      maximoAssetsActions.getMaximoAssets({ siteId: '1', skip: 0, take: 10 })
    )

    // Mock the fetch method of siteMaximoAssetsGQL
    siteMaximoAssetsGQL.watch = jest.fn().mockReturnValue({
      valueChanges: throwError(() => new Error('test error'))
    })

    const effect = await firstValueFrom(
      getMaximoAssets$(action, siteMaximoAssetsGQL)
    )

    expect(effect).toEqual(
      maximoAssetsActions.getMaximoAssetsFailure({
        error: new Error('test error')
      })
    )
  })

  it('should return getCurrentAssetSuccess action on success', async () => {
    const action = of(maximoAssetsActions.getCurrentAsset({ assetId: '1' }))

    // Mock the fetch method of assetBySystemComponentIdGQL
    assetBySystemComponentIdGQL.fetch = jest
      .fn()
      .mockReturnValue(of(siteMaximoAssetBySiteIdMock))

    const effect = await firstValueFrom(
      getMaximoCurrentAsset$(action, mockStore, assetBySystemComponentIdGQL)
    )

    expect(effect).toEqual(
      maximoAssetsActions.getCurrentAssetSuccess({
        currentAsset: {
          id: '1',
          description: 'test desc',
          markCode: '1',
          markNumber: '1'
        }
      })
    )
  })

  it('should return getCurrentAssetFailure action on error', async () => {
    const action = of(maximoAssetsActions.getCurrentAsset({ assetId: '1' }))

    // Mock the fetch method of assetBySystemComponentIdGQL
    assetBySystemComponentIdGQL.fetch = jest
      .fn()
      .mockReturnValue(throwError(() => new Error('test error')))

    const effect = await firstValueFrom(
      getMaximoCurrentAsset$(action, mockStore, assetBySystemComponentIdGQL)
    )

    expect(effect).toEqual(
      maximoAssetsActions.getCurrentAssetFailure({
        error: new Error('test error')
      })
    )
  })
})
