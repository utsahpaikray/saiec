export type TypeGuard<A, B extends A> = (a: A) => a is B

export type HiddenLabel = 'onCompact' | 'onFull'

export enum HeaderItemType {
  InternalAnchor = 'internal-anchor',
  ExternalAnchor = 'external-anchor',
  MenuItemStandard = 'menu-item-standard',
  MenuItemCustom = 'menu-item-custom'
}

export enum HeaderType {
  menu = 'menu',
  anchor = 'anchor'
}

export type InternalAnchor =
  | {
      label: string
      routerLink: string
      iconKey?: string
      hiddenLabel?: HiddenLabel
      for?: string
      type: HeaderItemType.InternalAnchor
    }
  | {
      label?: string
      routerLink: string
      iconKey: string
      hiddenLabel?: HiddenLabel
      for?: string
      type: HeaderItemType.InternalAnchor
    }

export type ExternalAnchor =
  | {
      label: string
      iconKey?: string
      href: string
      target?: string
      hiddenLabel?: HiddenLabel
      type: HeaderItemType.ExternalAnchor
    }
  | {
      label?: string
      iconKey: string
      href: string
      target?: string
      hiddenLabel?: HiddenLabel
      type: HeaderItemType.ExternalAnchor
    }
export type Anchor = InternalAnchor | ExternalAnchor

export interface IconButton {
  iconKey: string
  routerLink: string
}

export interface BaseMenuItem {
  label: string
  iconButton?: IconButton
}

export interface MenuItemStandard extends BaseMenuItem {
  selected?: boolean
  hiddenLabel?: HiddenLabel
  routerLink: string
  type: HeaderItemType.MenuItemStandard
}

export interface MenuItemCustom extends BaseMenuItem {
  action: () => void
  isExternalLink?: boolean
  type: HeaderItemType.MenuItemCustom
}

export type MenuItem = MenuItemStandard | MenuItemCustom

export interface Menu {
  label?: string
  iconKey?: string
  menuItems: MenuItem[]
  slot?: 'left' | 'right'
  for: string
  type: HeaderType.menu
  warningItem?: string
  warningItemPath?: string
}
export type HeaderItem = Menu | Anchor

export interface HeaderVM {
  items: HeaderItem[]
  hidden?: boolean
}

export enum PortalsSitesEnum {
  Portals = 'portals',
  Sites = 'sites'
}

export enum DefaultMenuItemText {
  SelectPortals = 'select-portals',
  SelectSites = 'select-sites',
  SelectApplications = 'select-application'
}
