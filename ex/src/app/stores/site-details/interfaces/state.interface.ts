import { SiteDetails } from './site-detail.interface'

export interface SiteDetailState {
  site: SiteDetails | null
  loading: boolean
  error: Error | null
}
