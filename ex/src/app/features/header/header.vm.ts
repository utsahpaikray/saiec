export enum HeaderItemType {
  Internal = 'internal',
  External = 'external',
  Static = 'static',
  Menu = 'menu'
}

export type Slot = 'left' | 'right'

interface HeaderMenuOption<T extends HeaderItemType> {
  id: string
  type: T
  label: string
  name?: string
  icon?: string
}

export interface HeaderMenuOptionInternal
  extends HeaderMenuOption<HeaderItemType.Internal> {
  routerLink: string | string[]
  selected?: boolean
}
export interface HeaderMenuOptionExternal
  extends HeaderMenuOption<HeaderItemType.External> {
  href: string
  target: string
}

export enum HeaderMenuId {
  Home = 'home',
  Portals = 'portals',
  Sites = 'sites',
  Applications = 'applications',
  User = 'user'
}

export interface HeaderItem<T extends HeaderItemType> {
  id: HeaderMenuId
  type: T
  slot?: Slot
  label: string
  name?: string
  total?: number
  showing?: number
  labelHiddenOnCompact?: boolean
  labelHiddenOnFull?: boolean
  icon: string
}

export type HeaderMenuOptions = (
  | HeaderMenuOptionInternal
  | HeaderMenuOptionExternal
)[]

export interface HeaderMenuItem extends HeaderItem<HeaderItemType.Menu> {
  items: HeaderMenuOptions
  searchable?: boolean
  selected?: boolean
  total?: number
  showing?: number
}
export interface HeaderMenuLinkInternal
  extends HeaderItem<HeaderItemType.Internal> {
  routerLink: string | string[]
  selected?: boolean
}

export interface HeaderMenuLinkExternal
  extends HeaderItem<HeaderItemType.External> {
  href: string
  target: string
}

export type HeaderMenuStatic = HeaderItem<HeaderItemType.Static>

export type HeaderItems = (
  | HeaderMenuItem
  | HeaderMenuLinkInternal
  | HeaderMenuLinkExternal
  | HeaderMenuStatic
)[]

export interface HeaderVM {
  hidden?: boolean
  loading?: boolean
  items: HeaderItems
}
