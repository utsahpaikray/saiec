import { FormControl, FormGroup } from '@angular/forms'

export interface TicketCommentForm
  extends FormGroup<{
    title: FormControl<string>
    message: FormControl<string>
  }> {}
