import { IssueType } from '@core/generated/types'

export interface IssueTypeSelector {
  codeName: IssueType
  label: string
  description: string
}
