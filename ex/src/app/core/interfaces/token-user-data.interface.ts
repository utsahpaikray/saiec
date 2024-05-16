import { Roles } from './roles.enum'

export interface TokenUserData {
  role: Roles[]
  sub: string
}
