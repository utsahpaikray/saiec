export interface CaseTableHeaderVM {
  eventSource: string
  summary: string
  caseNumber: string
  lastUpdated: string
  status: string
  workOrderID: string
}

export interface CaseTableBodyVM {
  caseNumber: string
  eventSource: string
  summary: string
  lastUpdated: Date
  lastUpdatedKey: string
  status: string // translate key of CaseDetailStatus
  workOrderID: string
  routerLink: Array<string>
  tag: string
}

export interface CasesTableVM {
  headers: CaseTableHeaderVM
  body: CaseTableBodyVM[]
  isDesktop: boolean
  lastUpdatedTranslationKey: string
}
