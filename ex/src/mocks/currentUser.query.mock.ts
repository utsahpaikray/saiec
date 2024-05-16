import { CurrentUserQuery } from '@core/current-user/graphql/current-user.graphql-gen.mock'
import { UserType } from '@core/generated/types'

export const CurrentUserResponse: CurrentUserQuery = {
  me: {
    firstName: 'Homer',
    lastName: 'Simpson',
    prefix: null,
    customerEmail: null,
    email: 'max.power@springfield.com',
    id: 'fce6be72-095f-4cea-bff4-38be5a507028',
    userType: UserType.Employee,
    roles: [
      {
        id: 'ba123017-a1ab-42f6-bee5-e48b5935e3f6',
        name: 'SuperUser',
        __typename: 'Role'
      },
      {
        id: 'e06c28a6-5f25-4b0b-8fa4-3a2338a7379c',
        name: 'VanderlandeUser',
        __typename: 'Role'
      }
    ],
    language: null,
    relatedPortalData: {
      portals: [
        {
          id: 'ad0eb957-6d58-428f-bb1f-e2b0618be5b0',
          name: 'Springfield Nuclear Power Plant',
          __typename: 'Portal'
        },
        {
          id: 'd734fad5-5c64-4d60-a1f7-317f34b9f5ba',
          name: "Moe's Tavern",
          __typename: 'Portal'
        },
        {
          id: 'a743fd80-6b89-436b-b17e-4a8a9d4a3b7e',
          name: 'Krusty Burger HQ',
          __typename: 'Portal'
        },
        {
          id: 'b87f2468-6558-495a-9a09-5d73f4b6f58e',
          name: 'Pin Pals Bowling League',
          __typename: 'Portal'
        }
      ],
      sites: [
        {
          name: 'Sector 7G Control Room',
          id: '1a2b3c4d-5e6f-7g8h-9i0j-1234567890ab',
          portal: {
            id: 'ad0eb957-6d58-428f-bb1f-e2b0618be5b0',
            name: 'Springfield Nuclear Power Plant',
            __typename: 'Portal'
          },
          __typename: 'Site'
        },
        {
          name: "Flaming Moe's Pop-up Bar",
          id: '2b3c4d5e-6f7g-8h9i-0j1k-2345678901bc',
          portal: {
            id: 'd734fad5-5c64-4d60-a1f7-317f34b9f5ba',
            name: "Moe's Tavern",
            __typename: 'Portal'
          },
          __typename: 'Site'
        },
        {
          name: 'Krusty Burger Test Kitchen',
          id: '3c4d5e6f-7g8h-9i0j-1k2l-3456789012cd',
          portal: {
            id: 'a743fd80-6b89-436b-b17e-4a8a9d4a3b7e',
            name: 'Krusty Burger HQ',
            __typename: 'Portal'
          },
          __typename: 'Site'
        },
        {
          name: 'Springfield Bowl-O-Rama',
          id: '4d5e6f7g-8h9i-0j1k-2l3m-4567890123de',
          portal: {
            id: 'b87f2468-6558-495a-9a09-5d73f4b6f58e',
            name: 'Pin Pals Bowling League',
            __typename: 'Portal'
          },
          __typename: 'Site'
        }
      ],
      __typename: 'RelatedPortalData'
    },
    __typename: 'IdentityUser'
  }
}
