export enum BusinessUnit {
  Airport = 'airport',
  Parcel = 'parcel',
  Warehouse = 'warehouse'
}

export enum UserType {
  Customer = 'customer',
  Employee = 'employee'
}

export interface Role {
  id: string
  isAssignedThroughMembership?: boolean
  name: string
}

export interface Portal {
  id: string
  name: string
  customerSourceId?: string
  businessUnit?: BusinessUnit
}

export interface Site {
  id: string
  name: string
  portal: Portal
}

export interface CurrentUser {
  id?: string
  roles: string[]
  username: string
  userType: UserType
  email?: string
  customerEmail?: string
  name: string
  prefix?: string
  language?: string
}
