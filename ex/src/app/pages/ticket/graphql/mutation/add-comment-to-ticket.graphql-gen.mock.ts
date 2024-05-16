import * as Types from '../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type AddCommentToTicketMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  description: Types.Scalars['String'];
  longDescription?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type AddCommentToTicketMutation = { __typename?: 'Mutation', addCommentToTicket: boolean };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAddCommentToTicketMutation(
 *   ({ query, variables }) => {
 *     const { id, description, longDescription } = variables;
 *     return HttpResponse.json({
 *       data: { addCommentToTicket }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockAddCommentToTicketMutation = (resolver: GraphQLResponseResolver<AddCommentToTicketMutation, AddCommentToTicketMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<AddCommentToTicketMutation, AddCommentToTicketMutationVariables>(
    'addCommentToTicket',
    resolver,
    options
  )
