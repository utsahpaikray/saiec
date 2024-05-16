import * as Types from '../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type ChangeUserLanguageMutationVariables = Types.Exact<{
  userId: Types.Scalars['UUID'];
  language: Types.Scalars['String'];
}>;


export type ChangeUserLanguageMutation = { __typename?: 'Mutation', changeUserLanguage: boolean };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockChangeUserLanguageMutation(
 *   ({ query, variables }) => {
 *     const { userId, language } = variables;
 *     return HttpResponse.json({
 *       data: { changeUserLanguage }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockChangeUserLanguageMutation = (resolver: GraphQLResponseResolver<ChangeUserLanguageMutation, ChangeUserLanguageMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<ChangeUserLanguageMutation, ChangeUserLanguageMutationVariables>(
    'changeUserLanguage',
    resolver,
    options
  )
