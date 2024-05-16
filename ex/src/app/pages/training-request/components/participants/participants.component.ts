import { Component, Input, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms'
import {
  ParticipantsGroup,
  RequestParticipantsGroup
} from '../../training-request-form.interface'

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html'
})
export class ParticipantsComponent implements OnInit {
  @Input() formGroup: RequestParticipantsGroup

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    for (var i = 0; i < 2; i++) {
      this.addParticipant()
    }
  }

  public addParticipant(): void {
    this.participants.push(this.createParticipantItem())
  }

  public removeParticipant(i: number): void {
    this.participants.removeAt(i)
  }

  private createParticipantItem(): ParticipantsGroup {
    return this.formBuilder.nonNullable.group({
      name: '',
      email: ['', [Validators.email]]
    })
  }

  public get participants(): FormArray<ParticipantsGroup> {
    return this.formGroup.get('participants') as FormArray<ParticipantsGroup>
  }

  /**
   * Check if form control input is valid
   * @param {AbstractControl} input
   * @returns {boolean}
   */
  public isInvalid(input: AbstractControl | null): boolean {
    if (!input) return false
    return input.invalid && input.touched
  }
}
