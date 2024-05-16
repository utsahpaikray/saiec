import { mockCurrentUserQuery } from '@core/current-user/graphql/current-user.graphql-gen.mock'
import { mockAccessiblePortalsQuery } from '@core/portals/graphql/portals.query.graphql-gen.mock'
import { mockAssetBySystemComponentIdQuery } from '@stores/maximo-assets/graphql/site-maximo-asset-by-assetId.graphql-gen.mock'
import { mockSiteMaximoAssetsQuery } from '@stores/maximo-assets/graphql/site-maximo-assets.graphql-gen.mock'
import { mockUserSiteDetailsQuery } from '@stores/site-details/graphql/user-site-by-id.graphql-gen.mock'
import { mockUserSitesByPortalIdQuery } from '@stores/sites/graphql/user-sites-by-portal-id.graphql-gen.mock'
import { HttpResponse } from 'msw'
import { AccessiblePortalsResponse } from './accessiblePortals.query.mock'
import { CurrentUserResponse } from './currentUser.query.mock'
import { SiteMaximoAssetBySiteIdResponse } from './siteMaximoAssetBySiteId.query.mock'
import { SiteMaximoAssetsResponse } from './siteMaximoAssets.query.mock'
import { userSiteDetailsResponse } from './userSiteDetails.query.mock'
import { userSitesByPortalIdResponse } from './userSitesByPortalId.query.mock'

export const handlers = [
  mockAccessiblePortalsQuery(() =>
    HttpResponse.json({
      data: AccessiblePortalsResponse
    })
  ),
  mockCurrentUserQuery(() =>
    HttpResponse.json({
      data: CurrentUserResponse
    })
  ),
  mockUserSitesByPortalIdQuery(() =>
    HttpResponse.json({ data: userSitesByPortalIdResponse })
  ),
  mockUserSiteDetailsQuery(() =>
    HttpResponse.json({ data: userSiteDetailsResponse })
  ),
  mockAssetBySystemComponentIdQuery(() =>
    HttpResponse.json({ data: SiteMaximoAssetBySiteIdResponse })
  ),
  mockSiteMaximoAssetsQuery(() =>
    HttpResponse.json({ data: SiteMaximoAssetsResponse })
  )
]
