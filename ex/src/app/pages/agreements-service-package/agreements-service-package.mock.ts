import { ContractLineInfoFragment } from './graphql/site-agreements-contract-lines.graphql-gen'

export const mockContractLine: ContractLineInfoFragment = {
  startDate: '2016-01-01T12:32:10.000\u002B01:00',
  endDate: '2023-01-01T12:32:10.000\u002B01:00',
  partsIncluded: true,
  laborIncluded: false,
  hours: 8,
  days: 5,
  packageCode: 'CO P01',
  byphone: 1.25,
  onsite: 24,
  yearvisits: 10.75,
  vidays: 26.5,
  subcdays: 2,
  calendarDescription: '8/5 Mon-Fri 08:00 - 17:00',
  systemComponent: {
    system: '2380678',
    markCode: 'LFT',
    markCodeDescription: 'Lift',
    assetType: 'LFTA',
    assetMarkNumber: null,
    assetTypeDescription: 'Lift Asset'
  },
  __typename: 'ContractLine'
}
