import { Applications } from './application.interface'

export type AppState = {
  enabled: boolean | null
  external?: true
  url?: string
}

export interface ApplicationState extends Record<Applications, AppState> {
  currentApplication: Applications | null
}
