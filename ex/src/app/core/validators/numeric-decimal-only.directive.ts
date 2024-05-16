import { Directive, HostListener } from '@angular/core'

@Directive({
  selector: '[appNumericDecimalOnly]',
  standalone: true
})
export class NumericDecimalOnlyDirective {
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'End',
      'Home',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Decimal',
      'Period',
      'NumpadDecimal',
      'NumpadPeriod'
    ]

    const isSpecialKey = allowedKeys.includes(event.key)
    const isNumeric = /^\d$/.test(event.key)
    const isDecimalPoint = event.key === '.' || event.key === ','
    const containsDecimalPoint = (
      event.target as HTMLInputElement
    ).value.includes('.')

    if (
      !(isSpecialKey || isNumeric || (isDecimalPoint && !containsDecimalPoint))
    ) {
      event.preventDefault()
    }
  }
}
