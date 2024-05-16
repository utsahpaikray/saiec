import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type SiteAgreementFragment = { __typename?: 'Agreement', agreementId: string, endDate: any, startDate: any, contractLines: Array<{ __typename?: 'ContractLine', packageCode?: string | null }> };

export type SiteContractLineFragment = { __typename?: 'ContractLine', packageCode?: string | null };

export type SiteAgreementsQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  currentDate?: Types.InputMaybe<Types.Scalars['DateTime']>;
}>;


export type SiteAgreementsQuery = { __typename?: 'Query', agreements: Array<{ __typename?: 'Agreement', agreementId: string, endDate: any, startDate: any, contractLines: Array<{ __typename?: 'ContractLine', packageCode?: string | null }> }> };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSiteAgreementsQuery(
 *   ({ query, variables }) => {
 *     const { siteId, currentDate } = variables;
 *     return HttpResponse.json({
 *       data: { agreements }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSiteAgreementsQuery = (resolver: GraphQLResponseResolver<SiteAgreementsQuery, SiteAgreementsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SiteAgreementsQuery, SiteAgreementsQueryVariables>(
    'siteAgreements',
    resolver,
    options
  )
