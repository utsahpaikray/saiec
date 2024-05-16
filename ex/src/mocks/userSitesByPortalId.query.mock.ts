import { Segment } from '@core/generated/types'
import { UserSitesByPortalIdQuery } from '@stores/sites/graphql/user-sites-by-portal-id.graphql-gen.mock'

export const userSitesByPortalIdResponse: UserSitesByPortalIdQuery = {
  me: {
    relatedPortalData: {
      AccessibleSites: [
        {
          __typename: 'Site',
          name: 'Mos Eisley Spaceport',
          id: 'd4f1ebee-43f6-4082-aede-c0fa1b275f23',
          projects: [
            {
              __typename: 'Project',
              segment: Segment.Airports
            }
          ],
          contractVisible: true,
          published: true,
          sourceId: '1a2b3c4d'
        },
        {
          __typename: 'Site',
          name: 'Cargo Bay 3 DS9',
          id: 'bef5c0f1-a630-45c5-8236-b8d4e02fff44',
          projects: [
            {
              __typename: 'Project',
              segment: Segment.Warehousing
            }
          ],
          contractVisible: true,
          published: true,
          sourceId: '1a2b3c4d'
        },
        {
          __typename: 'Site',
          name: 'Nostromo Cargo Bay',
          id: 'ca34d9ea-26d1-4cfa-879b-5e7a1cbb3f07',
          projects: [
            {
              __typename: 'Project',
              segment: Segment.Amazon
            }
          ],
          contractVisible: true,
          published: true,
          sourceId: '1a2b3c4d'
        },
        {
          __typename: 'Site',
          name: 'Replicant Dispatch Center',
          id: '81c3dbf1-2d7a-46a7-8f56-57c88fecf2df',
          projects: [
            {
              __typename: 'Project',
              segment: Segment.Parcel
            }
          ],
          contractVisible: true,
          published: true,
          sourceId: '1a2b3c4d'
        },
        {
          __typename: 'Site',
          name: 'The Construct',
          id: '4d5edf7g-8h9i-0j1k-2l3m-4567890123de',
          projects: [
            {
              __typename: 'Project',
              segment: Segment.NotApplicable
            }
          ],
          contractVisible: true,
          published: true,
          sourceId: '1a2b3d4d'
        }
      ],
      __typename: 'RelatedPortalData'
    },
    __typename: 'IdentityUser'
  }
}
