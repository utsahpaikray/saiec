import { Pipe, PipeTransform } from '@angular/core'
import { AbstractControl, ValidatorFn } from '@angular/forms'

@Pipe({
  name: 'controlRequired'
})
export class ControlRequiredPipe implements PipeTransform {
  transform(validatorFn: ValidatorFn): boolean {
    if (!validatorFn) {
      return false
    }

    //  Return the required state of the validator
    const validator = validatorFn({} as AbstractControl) || {}
    return validator?.required
  }
}
