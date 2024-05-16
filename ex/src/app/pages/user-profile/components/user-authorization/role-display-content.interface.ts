import { Roles } from '@core/interfaces/roles.enum'

export interface RoleDisplayContent {
  id: Roles
  label: string
  isDisabled: boolean
  description?: string
}
