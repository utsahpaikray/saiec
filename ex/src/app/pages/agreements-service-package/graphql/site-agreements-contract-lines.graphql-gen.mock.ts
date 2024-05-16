import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type ContractLineInfoFragment = { __typename?: 'ContractLine', startDate: any, endDate: any, partsIncluded?: boolean | null, laborIncluded?: boolean | null, hours: number, days: number, packageCode?: string | null, byphone?: number | null, onsite?: number | null, yearvisits?: number | null, vidays?: number | null, subcdays?: number | null, calendarDescription?: string | null, systemComponent?: { __typename?: 'SystemComponent', system?: string | null, markCode?: string | null, markCodeDescription?: string | null, assetType?: string | null, assetMarkNumber?: string | null, assetTypeDescription?: string | null } | null };

export type SiteAgreementsContractLinesQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  currentDate?: Types.InputMaybe<Types.Scalars['DateTime']>;
  packageCodes?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>;
}>;


export type SiteAgreementsContractLinesQuery = { __typename?: 'Query', agreements: Array<{ __typename?: 'Agreement', contractLines: Array<{ __typename?: 'ContractLine', startDate: any, endDate: any, partsIncluded?: boolean | null, laborIncluded?: boolean | null, hours: number, days: number, packageCode?: string | null, byphone?: number | null, onsite?: number | null, yearvisits?: number | null, vidays?: number | null, subcdays?: number | null, calendarDescription?: string | null, systemComponent?: { __typename?: 'SystemComponent', system?: string | null, markCode?: string | null, markCodeDescription?: string | null, assetType?: string | null, assetMarkNumber?: string | null, assetTypeDescription?: string | null } | null }> }> };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSiteAgreementsContractLinesQuery(
 *   ({ query, variables }) => {
 *     const { siteId, currentDate, packageCodes } = variables;
 *     return HttpResponse.json({
 *       data: { agreements }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSiteAgreementsContractLinesQuery = (resolver: GraphQLResponseResolver<SiteAgreementsContractLinesQuery, SiteAgreementsContractLinesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SiteAgreementsContractLinesQuery, SiteAgreementsContractLinesQueryVariables>(
    'siteAgreementsContractLines',
    resolver,
    options
  )
