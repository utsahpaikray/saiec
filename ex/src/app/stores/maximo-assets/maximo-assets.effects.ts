import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { siteDetailFeature } from '@stores/site-details/site-detail.state'
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs'
import {
  AssetBySystemComponentIdGQL,
  AssetBySystemComponentIdQuery
} from './graphql/site-maximo-asset-by-assetId.graphql-gen'
import {
  SiteMaximoAssetsGQL,
  SiteMaximoAssetsQuery
} from './graphql/site-maximo-assets.graphql-gen'
import { MaximoAsset } from './interfaces/state.interface'
import {
  default as maximoActions,
  default as maximoAssetsActions
} from './maximo-assets.actions'

const mapMaximoAsset = (
  asset: NonNullable<AssetBySystemComponentIdQuery['assetBySystemComponentId']>
): MaximoAsset => ({
  id: asset.systemComponentId,
  description: asset.description,
  markCode: asset.markCode ?? null,
  markNumber: asset.markNumber ?? null
})

const mapMaximoAssets = (
  assets: NonNullable<
    NonNullable<SiteMaximoAssetsQuery['assetSearch']>['items']
  >
): MaximoAsset[] => {
  return assets.map(mapMaximoAsset)
}

const mapPageInfo = (
  pageInfo:
    | NonNullable<SiteMaximoAssetsQuery['assetSearch']>['pageInfo']
    | undefined
) => ({
  hasNextPage: pageInfo ? pageInfo.hasNextPage : false,
  hasPreviousPage: pageInfo ? pageInfo.hasPreviousPage : false
})

export const getMaximoAssets$ = createEffect(
  (
    actions$ = inject(Actions),
    siteMaximoAssetsGQL = inject(SiteMaximoAssetsGQL)
  ) =>
    actions$.pipe(
      ofType(maximoActions.getMaximoAssets),
      switchMap(({ siteId, skip, take }) =>
        siteMaximoAssetsGQL
          .watch({ siteId, searchText: '*', skip, take })
          .valueChanges.pipe(
            map(({ data }) => {
              if (data.assetSearch?.items) {
                return maximoActions.getMaximoAssetsSuccess({
                  assets: mapMaximoAssets(data.assetSearch.items),
                  pageInfo: mapPageInfo(data.assetSearch.pageInfo)
                })
              }

              return maximoActions.getMaximoAssetsFailure({
                error: new Error('No assets found')
              })
            }),
            catchError((error) =>
              of(maximoActions.getMaximoAssetsFailure({ error }))
            )
          )
      ),
      catchError((error) => of(maximoActions.getMaximoAssetsFailure({ error })))
    ),
  { functional: true }
)

export const getMaximoCurrentAsset$ = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    assetBySystemComponentIdGQL = inject(AssetBySystemComponentIdGQL)
  ) =>
    actions$.pipe(
      ofType(maximoAssetsActions.getCurrentAsset),
      withLatestFrom(store.select(siteDetailFeature.selectSiteId)),
      switchMap(([{ assetId }, siteId]) =>
        assetBySystemComponentIdGQL
          .fetch({ siteId, systemComponentId: assetId })
          .pipe(
            map(({ data }) => {
              if (data.assetBySystemComponentId) {
                return maximoAssetsActions.getCurrentAssetSuccess({
                  currentAsset: mapMaximoAsset(data.assetBySystemComponentId)
                })
              }

              return maximoAssetsActions.getCurrentAssetFailure({
                error: new Error('No asset found')
              })
            }),
            catchError((error) =>
              of(maximoAssetsActions.getCurrentAssetFailure({ error }))
            )
          )
      )
    ),
  { functional: true }
)
