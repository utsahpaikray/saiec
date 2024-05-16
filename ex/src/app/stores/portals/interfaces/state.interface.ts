import { Portal } from './portal.interface'

export interface MyPortals {
  portals: Portal[]
  loading: boolean
  error: Error | null
}

export interface UserPortals {
  userId: string
  portals: Portal[]
  loading: boolean
  error: Error | null
}

export interface PortalsState {
  myPortals: MyPortals
  userPortals: UserPortals
  currentPortal: Portal | null
  portalsLoaded: boolean
}
