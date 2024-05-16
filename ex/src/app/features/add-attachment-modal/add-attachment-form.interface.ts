import { FormControl, FormGroup } from '@angular/forms'

export interface AddAttachmentForm
  extends FormGroup<{
    description: FormControl<string>
  }> {}
