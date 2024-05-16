import { Item } from '@shared/interfaces/item.interface'

export interface File extends Item {
  fileHandler?: globalThis.File
  removable?: boolean
  url?: string
}
