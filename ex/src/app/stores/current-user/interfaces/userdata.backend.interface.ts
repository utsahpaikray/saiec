export enum ResourceAccess {
  PortalApp = 'portal-app',
  Account = 'account'
}

export interface UserData {
  sub: string
  email_verified: boolean
  role: string[]
  resource_access: PortalAppRoles
  name: string
  preferred_username: string
  given_name: string
  family_name: string
  email: string
  user_type: string
}

export interface PortalAppRoles {
  [ResourceAccess.PortalApp]: {
    roles: string[]
  }
}
