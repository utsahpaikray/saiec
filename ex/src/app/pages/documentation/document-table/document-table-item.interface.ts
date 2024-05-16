export interface DocumentTableItem {
  name: string
  contentLength?: number
  children?: DocumentTableItem[]
  fullName?: string
  location?: string
  depth: number
}
