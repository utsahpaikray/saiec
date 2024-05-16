import * as Types from '../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type UserProfilePortalFragment = { __typename?: 'Portal', id: any, name: string };

export type UserProfileFragment = { __typename?: 'IdentityUser', firstName?: string | null, lastName?: string | null, prefix?: string | null, email?: string | null, id?: any | null, language?: string | null, roles: Array<{ __typename?: 'Role', id: any, name: string }>, relatedPortalData?: { __typename?: 'RelatedPortalData', portals: Array<{ __typename?: 'Portal', id: any, name: string }>, sites: Array<{ __typename?: 'Site', id: any }> } | null };

export type UserProfileQueryVariables = Types.Exact<{
  userId: Types.Scalars['UUID'];
}>;


export type UserProfileQuery = { __typename?: 'Query', user?: { __typename?: 'IdentityUser', firstName?: string | null, lastName?: string | null, prefix?: string | null, customerEmail?: string | null, email?: string | null, id?: any | null, userType: Types.UserType, language?: string | null, roles: Array<{ __typename?: 'Role', id: any, name: string }>, relatedPortalData?: { __typename?: 'RelatedPortalData', portals: Array<{ __typename?: 'Portal', id: any, name: string }>, sites: Array<{ __typename?: 'Site', name: string, id: any, portal: { __typename?: 'Portal', id: any, name: string } }> } | null } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUserProfileQuery(
 *   ({ query, variables }) => {
 *     const { userId } = variables;
 *     return HttpResponse.json({
 *       data: { user }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUserProfileQuery = (resolver: GraphQLResponseResolver<UserProfileQuery, UserProfileQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<UserProfileQuery, UserProfileQueryVariables>(
    'userProfile',
    resolver,
    options
  )
