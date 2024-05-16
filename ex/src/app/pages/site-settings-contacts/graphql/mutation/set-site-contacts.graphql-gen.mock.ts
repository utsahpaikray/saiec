import * as Types from '../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type SetSiteContactsMutationVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  siteContacts: Types.SiteContactsMutationDtoInput;
}>;


export type SetSiteContactsMutation = { __typename?: 'Mutation', editSiteContacts: boolean };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSetSiteContactsMutation(
 *   ({ query, variables }) => {
 *     const { siteId, siteContacts } = variables;
 *     return HttpResponse.json({
 *       data: { editSiteContacts }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSetSiteContactsMutation = (resolver: GraphQLResponseResolver<SetSiteContactsMutation, SetSiteContactsMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<SetSiteContactsMutation, SetSiteContactsMutationVariables>(
    'setSiteContacts',
    resolver,
    options
  )
