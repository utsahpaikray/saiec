import { SiteMaximoAssetsQuery } from '@stores/maximo-assets/graphql/site-maximo-assets.graphql-gen'

export const SiteMaximoAssetsResponse: SiteMaximoAssetsQuery = {
  assetSearch: {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      __typename: 'CollectionSegmentInfo'
    },
    items: [
      {
        systemComponentId: '1',
        description: 'test desc',
        markCode: '1',
        markNumber: '1',
        __typename: 'Asset'
      },
      {
        systemComponentId: '2',
        description: 'test desc 2',
        markCode: '2',
        markNumber: '2',
        __typename: 'Asset'
      },
      {
        systemComponentId: '3',
        description: 'test desc 3',
        markCode: '3',
        markNumber: '3',
        __typename: 'Asset'
      }
    ],
    totalCount: 3,
    __typename: 'AssetSearchCollectionSegment'
  }
}
