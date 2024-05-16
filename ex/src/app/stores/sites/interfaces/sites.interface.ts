import { SiteSegment } from '@stores/site-details/interfaces/site-detail.interface'

export interface Site {
  id: string
  name: string
  segments: SiteSegment[]
  published: boolean
  sourceId: string
}
