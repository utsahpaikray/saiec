import {
  TrainingRequestInput,
  TrainingRequestParticipantInput
} from '@core/generated/types'

export interface TrainingRequest extends TrainingRequestInput {
  preferredTrainingLocationGroup?: {
    preferredLocation: string
    preferredTrainingLocation: string
  }
  requestTopics?: {
    topics: string
    trainings: string[]
  }
  requestParticipants?: {
    participants: TrainingRequestParticipantInput[]
    participantLocation: string
  }
}
