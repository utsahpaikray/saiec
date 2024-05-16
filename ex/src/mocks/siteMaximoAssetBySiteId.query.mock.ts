import { AssetBySystemComponentIdQuery } from '@stores/maximo-assets/graphql/site-maximo-asset-by-assetId.graphql-gen'

export const SiteMaximoAssetBySiteIdResponse: AssetBySystemComponentIdQuery = {
  assetBySystemComponentId: {
    __typename: 'Asset',
    systemComponentId: '1',
    description: 'test desc',
    markCode: '1',
    markNumber: '1'
  }
}
