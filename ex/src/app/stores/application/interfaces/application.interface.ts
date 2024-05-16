import { environment } from '@environments/environment'

/* eslint-disable no-unused-vars */
export enum Applications {
  Cases = 'cases', // if user Employee
  Contacts = 'contacts',
  Contracts = 'contracts', //SiteMaximoAccessCanReadGuard
  DivertHealth = 'divert-health', // if user Employee and site-setting needs to checked
  Documentation = 'documentation',
  Home = 'home',
  PaceInsights = 'pace-insights', // try to fetch if getting 403 then user dont have access and site-setting needs to checked
  ProcessInsights = 'process-insights', // if user Employee and site-setting needs to checked
  Settings = 'settings', // SuperUserOrPortalAdminGuard
  ShuttleHealth = 'shuttle-health', // if user Employee and site-setting needs to checked
  SpareParts = 'spare-parts', // try to fetch if getting 403 then user dont have access and site-setting needs to checked
  System = 'system', // not in use
  Tickets = 'tickets', // if user have SiteMaximoAccessCanReadGuard
  Training = 'training',
  VIAInsights = 'via-insights', // try to fetch if getting 403 then user dont have access and site-setting needs to checked
  VIDI = 'vidi', // try to fetch if getting 403 then user dont have access and site-setting needs to checked
  WSInsights = 'ws-insights', // try to fetch if getting 403 then user dont have access and site-setting needs to checked
  WarrantyClaims = 'warranty-claims', // not in use
  SiteOverview = 'site-overview' // Temporary for demo, will be removed
}

export const ExternalMenuItemApplications = {
  [Applications.SpareParts]: environment.sparePartsUrl,
  [Applications.VIDI]: environment.vidiUrl,
  [Applications.PaceInsights]: environment.vidiUrl,
  [Applications.VIAInsights]: environment.vidiUrl,
  [Applications.WSInsights]: environment.vidiUrl,
  [Applications.DivertHealth]: '',
  [Applications.ShuttleHealth]: ''
}

export const ApplicationVidiName = {
  [Applications.VIDI]: 'VIDI',
  [Applications.VIAInsights]: 'VIA Insights',
  [Applications.WSInsights]: 'WS Insights',
  [Applications.PaceInsights]: 'Pace Insights'
}
