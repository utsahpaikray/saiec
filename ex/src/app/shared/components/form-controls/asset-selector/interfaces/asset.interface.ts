import { Item } from '@shared/interfaces/item.interface'

/** @TODO (LOW) Remove systemComponentId since it's business-logic. The service should figure it out imho which asset is selected */
export interface Asset extends Item {
  systemComponentId: string
  markCode: string
  markNumber: string
}
