import { FormControl, FormGroup } from '@angular/forms'

export interface AddUserForm
  extends FormGroup<{
    upnId: FormControl<string>
  }> {}
