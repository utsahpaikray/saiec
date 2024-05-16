import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type UserSiteContactQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type UserSiteContactQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', sites: Array<{ __typename?: 'Site', accountManagerContact: { __typename?: 'AccountManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean }, contractManagerContact: { __typename?: 'ContractManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null }, itManagerContact: { __typename?: 'ItManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean }, serviceDeskContact: { __typename?: 'ServiceDeskContact', name?: string | null, phoneNumber?: string | null, emailAddress?: string | null, alternativeContactTitle?: string | null, phoneNumberOutsideWorkingHours?: string | null, show: boolean }, sparePartsContact: { __typename?: 'SparePartsContact', emailAddress?: string | null, alternativeContactTitle?: string | null, show: boolean }, visitingOfficeContact: { __typename?: 'VisitingOfficeContact', name?: string | null, address?: string | null, email?: string | null, phoneNumber?: string | null, alternativeContactTitle?: string | null, show: boolean } }> } | null } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUserSiteContactQuery(
 *   ({ query, variables }) => {
 *     const { siteId } = variables;
 *     return HttpResponse.json({
 *       data: { me }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUserSiteContactQuery = (resolver: GraphQLResponseResolver<UserSiteContactQuery, UserSiteContactQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<UserSiteContactQuery, UserSiteContactQueryVariables>(
    'userSiteContact',
    resolver,
    options
  )
