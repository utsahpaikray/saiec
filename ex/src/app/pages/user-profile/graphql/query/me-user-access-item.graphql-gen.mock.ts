import * as Types from '../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type MeUserAccessItemQueryVariables = Types.Exact<{
  portalId?: Types.InputMaybe<Types.Scalars['UUID']>;
}>;


export type MeUserAccessItemQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', portals: Array<{ __typename?: 'Portal', name: string, id: any, sites: Array<{ __typename?: 'Site', id: any, name: string }> }> } | null } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockMeUserAccessItemQuery(
 *   ({ query, variables }) => {
 *     const { portalId } = variables;
 *     return HttpResponse.json({
 *       data: { me }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockMeUserAccessItemQuery = (resolver: GraphQLResponseResolver<MeUserAccessItemQuery, MeUserAccessItemQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<MeUserAccessItemQuery, MeUserAccessItemQueryVariables>(
    'meUserAccessItem',
    resolver,
    options
  )
