export interface MaximoAsset {
  id: string
  markCode: string | null
  markNumber: string | null
  description: string
}

export interface MaximoAssetsPageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface MaximoAssetsState {
  assets: MaximoAsset[] | null
  currentAsset: MaximoAsset | null
  pageInfo: MaximoAssetsPageInfo
  loading: boolean
  error: Error | null
}
