import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type CurrentUserFragment = { __typename?: 'IdentityUser', firstName?: string | null, lastName?: string | null, prefix?: string | null, customerEmail?: string | null, email?: string | null, id?: any | null, userType: Types.UserType, language?: string | null, roles: Array<{ __typename?: 'Role', id: any, name: string }>, relatedPortalData?: { __typename?: 'RelatedPortalData', portals: Array<{ __typename?: 'Portal', id: any, name: string }>, sites: Array<{ __typename?: 'Site', name: string, id: any, portal: { __typename?: 'Portal', id: any, name: string } }> } | null };

export type CurrentUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', firstName?: string | null, lastName?: string | null, prefix?: string | null, customerEmail?: string | null, email?: string | null, id?: any | null, userType: Types.UserType, language?: string | null, roles: Array<{ __typename?: 'Role', id: any, name: string }>, relatedPortalData?: { __typename?: 'RelatedPortalData', portals: Array<{ __typename?: 'Portal', id: any, name: string }>, sites: Array<{ __typename?: 'Site', name: string, id: any, portal: { __typename?: 'Portal', id: any, name: string } }> } | null } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCurrentUserQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { me }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCurrentUserQuery = (resolver: GraphQLResponseResolver<CurrentUserQuery, CurrentUserQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<CurrentUserQuery, CurrentUserQueryVariables>(
    'currentUser',
    resolver,
    options
  )
