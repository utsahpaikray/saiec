import { ServicePackage } from './service-package.interface'

export interface BuildingBlock {
  buildingBlockTitle: string
  servicePackages: ServicePackage[]
}
