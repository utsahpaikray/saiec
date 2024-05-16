export interface SiteContact {
  id: string
  name: string
  email: string
  phone: string
}

export interface MaximoContactsState {
  siteId: string | null
  contacts: SiteContact[] | null
  loading: boolean
  error: Error | null
}
