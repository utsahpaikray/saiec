import { ValidationErrors, FormGroup } from '@angular/forms'

// TODO: fix type check error on ValidatorFn later
export const atLeastOneCheckboxCheckedValidator: any = (
  group: FormGroup
): ValidationErrors | null => {
  if (!Object.values(group.value).some((value) => value === true)) {
    return { invalid: true }
  }
  return null
}
