import * as Types from '../../../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type ExternalUserAccountQueryVariables = Types.Exact<{
  upn: Types.Scalars['String'];
}>;


export type ExternalUserAccountQuery = { __typename?: 'Query', externalUserAccount: { __typename?: 'GraphUser', id: string, username: string, firstName: string, lastName: string, email: string, accountEnabled: boolean, customerEmail: string } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockExternalUserAccountQuery(
 *   ({ query, variables }) => {
 *     const { upn } = variables;
 *     return HttpResponse.json({
 *       data: { externalUserAccount }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockExternalUserAccountQuery = (resolver: GraphQLResponseResolver<ExternalUserAccountQuery, ExternalUserAccountQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<ExternalUserAccountQuery, ExternalUserAccountQueryVariables>(
    'externalUserAccount',
    resolver,
    options
  )
