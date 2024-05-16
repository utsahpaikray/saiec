import { FormControl, FormGroup } from '@angular/forms'

export interface UploadDocumentsForm
  extends FormGroup<{
    category: FormControl<string>
    language: FormControl<string>
  }> {}
