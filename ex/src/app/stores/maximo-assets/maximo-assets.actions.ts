import { createActionGroup, props } from '@ngrx/store'
import { MaximoAsset, MaximoAssetsPageInfo } from './interfaces/state.interface'

export default createActionGroup({
  source: 'MaximoAssets',
  events: {
    getMaximoAssets: props<{
      siteId: string
      skip: number
      take: number
    }>(),
    getMaximoAssetsSuccess: props<{
      assets: MaximoAsset[]
      pageInfo: MaximoAssetsPageInfo
    }>(),
    getMaximoAssetsFailure: props<{ error: Error }>(),

    getCurrentAsset: props<{ assetId: string }>(),
    getCurrentAssetSuccess: props<{ currentAsset: MaximoAsset }>(),
    getCurrentAssetFailure: props<{ error: Error }>()
  }
})
