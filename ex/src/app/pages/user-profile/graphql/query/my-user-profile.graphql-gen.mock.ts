import * as Types from '../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type MyUserProfileQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyUserProfileQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', firstName?: string | null, lastName?: string | null, prefix?: string | null, email?: string | null, id?: any | null, language?: string | null, roles: Array<{ __typename?: 'Role', id: any, name: string }>, relatedPortalData?: { __typename?: 'RelatedPortalData', portals: Array<{ __typename?: 'Portal', id: any, name: string }>, sites: Array<{ __typename?: 'Site', id: any }> } | null } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockMyUserProfileQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { me }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockMyUserProfileQuery = (resolver: GraphQLResponseResolver<MyUserProfileQuery, MyUserProfileQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<MyUserProfileQuery, MyUserProfileQueryVariables>(
    'myUserProfile',
    resolver,
    options
  )
