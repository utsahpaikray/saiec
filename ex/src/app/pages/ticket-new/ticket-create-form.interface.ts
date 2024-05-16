import { FormControl, FormGroup } from '@angular/forms'
import { IssueType } from '@core/generated/types'

export interface TicketCreateForm
  extends FormGroup<{
    customerPriority: FormControl<string>
    customerReference: FormControl<string>
    title: FormControl<string>
    description: FormControl<string>
    customerSiteContactId: FormControl<string>
    issueType: FormControl<IssueType>
    systemComponentId: FormControl<string>
  }> {}
