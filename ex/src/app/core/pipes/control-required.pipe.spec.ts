import { FormControl, Validators } from '@angular/forms'
import { ControlRequiredPipe } from './control-required.pipe'

describe('ControlRequiredPipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new ControlRequiredPipe()

  it('should return true if control has validator', () => {
    const control = new FormControl('control', {
      validators: [Validators.required]
    })
    expect(pipe.transform(control.validator!)).toBe(true)
  })

  it('should return false if control has no validator', () => {
    const control = new FormControl('control')
    expect(pipe.transform(control.validator!)).toBe(false)
  })
})
