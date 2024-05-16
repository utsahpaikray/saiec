import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type AddAttachmentToCaseMutationVariables = Types.Exact<{
  caseId: Types.Scalars['UUID'];
  attachmentName: Types.Scalars['String'];
  attachmentDescription: Types.Scalars['String'];
  attachmentPayloadBase64: Types.Scalars['String'];
}>;


export type AddAttachmentToCaseMutation = { __typename?: 'Mutation', addAttachmentToCase: boolean };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAddAttachmentToCaseMutation(
 *   ({ query, variables }) => {
 *     const { caseId, attachmentName, attachmentDescription, attachmentPayloadBase64 } = variables;
 *     return HttpResponse.json({
 *       data: { addAttachmentToCase }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockAddAttachmentToCaseMutation = (resolver: GraphQLResponseResolver<AddAttachmentToCaseMutation, AddAttachmentToCaseMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<AddAttachmentToCaseMutation, AddAttachmentToCaseMutationVariables>(
    'addAttachmentToCase',
    resolver,
    options
  )
