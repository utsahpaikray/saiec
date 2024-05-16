import { Applications } from '@stores/application/interfaces/application.interface'

export enum SiteRouteSegments {
  Home = Applications.Home,
  Documentation = Applications.Documentation,
  Contracts = Applications.Contracts,
  Training = Applications.Training,
  Settings = Applications.Settings,
  Contacts = Applications.Contacts,
  Tickets = Applications.Tickets,
  WarrantyClaims = Applications.WarrantyClaims,
  System = Applications.System,
  ProcessInsights = Applications.ProcessInsights,
  Cases = Applications.Cases,
  NotFound = 'not-found',
  AccessDenied = 'access-denied',

  // Temporary
  SiteOverview = Applications.SiteOverview
}
