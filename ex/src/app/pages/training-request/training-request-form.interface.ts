import { FormArray, FormControl, FormGroup } from '@angular/forms'

export interface TrainingRequestForm
  extends FormGroup<{
    requestTypes: RequestTypesGroup
    requestTopics: RequestTopicsGroup
    remarks: FormControl<string>
    previousTraining: FormControl<string>
    preferredDates: FormControl<string>
    preferredTrainingLocationGroup: PreferredTrainingLocationGroup
    requestParticipants: RequestParticipantsGroup
    contact: FormControl<string>
    requesterName: FormControl<string>
    requesterTitle: FormControl<string>
    requesterEmail: FormControl<string>
  }> {}

export interface RequestTypesGroup
  extends FormGroup<{
    training: FormControl<boolean>
    certification: FormControl<boolean>
  }> {}

export interface RequestTopicsGroup
  extends FormGroup<{
    topics: FormControl<string>
    trainings: FormGroup
  }> {}

export interface PreferredTrainingLocationGroup
  extends FormGroup<{
    preferredTrainingLocation: FormControl<string>
    preferredLocation: FormControl<string | null>
  }> {}

export interface RequestParticipantsGroup
  extends FormGroup<{
    participants: FormArray<ParticipantsGroup>
    participantLocation: FormControl<string>
  }> {}

export interface ParticipantsGroup
  extends FormGroup<{
    name: FormControl<string>
    email: FormControl<string>
  }> {}
