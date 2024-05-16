import { Site } from './sites.interface'

export interface SitesState {
  sites: Site[] | null
  loading: boolean
  error: Error | null
}
