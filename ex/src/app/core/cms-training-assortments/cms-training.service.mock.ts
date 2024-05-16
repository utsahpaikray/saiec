import { Segment } from '@core/generated/types'
import { TrainingRequestCertificationPathItemFragment } from './graphql/cms-certification-paths.graphql-gen'
import { RecommendedAssortedTrainingItemFragment } from './graphql/cms-recommended-assorted-trainings.graphql-gen'
import {
  CertificationPathItemFragment,
  TrainingImageFragment
} from './graphql/cms-shared-trainings-fragment.graphql-gen'
import { AssortedTrainingItemByCertificationPathFragment } from './graphql/cms-assorted-trainings-by-certification-path.graphql-gen'

export const mockSegment = Object.keys(Segment)[0] as Segment
export const mockCertificationPathId = '1DmCN821RCw0cgxTBAMNuP'
export const mockTrainingId = '2n9BBYojgx2iB2Tetmv0Af'
export const mockAssortedTrainingIds = [mockTrainingId]

export const mockCardImage: TrainingImageFragment = {
  title: 'image',
  url: 'image1-url'
}

export const mockCertificationPath: CertificationPathItemFragment = {
  title: 'Operations',
  description:
    'How to operate your system - efficient utilization of operator workstations.',
  sys: { id: '1DmCN821RCw0cgxTBAMNuP' }
}

export const mockTrainingRequestCertificationPath: TrainingRequestCertificationPathItemFragment =
  {
    title: 'Operations',
    sys: { id: '3T7hjch4wHUSzWSk99Fnak' }
  }

export const mockRecommendedAssortedTraining: RecommendedAssortedTrainingItemFragment =
  {
    title: '[Test] Training Airport Recommended',
    description: 'Test description 1',
    targetGroup:
      'Maintenance Engineers, (JR) Service Engineers (Preventive Maintenance Engineers)',
    duration: '2 days',
    sys: { id: '3T7hjch4wHUSzWSk99Fnak' }
  }

export const mockRecommendedAssortedTrainings: RecommendedAssortedTrainingItemFragment[] =
  [
    {
      ...mockRecommendedAssortedTraining,
      cardImageCollection: {
        items: [{ ...mockCardImage }]
      },
      linkedFrom: {
        certificationPathCollection: {
          items: [
            {
              ...mockCertificationPath
            }
          ]
        }
      }
    }
  ]

export const mockAssortedTraining1: AssortedTrainingItemByCertificationPathFragment =
  {
    title: '[Test] Training Airport+Amazon / Logistics / Not recommended',
    targetGroup:
      'Maintenance Engineers, (JR) Service Engineers (Preventive Maintenance Engineers)',
    duration: '2 days',
    sys: { id: '3T7hjch4wHUSzWSk99Fnak' }
  }

export const mockAssortedTraining2: AssortedTrainingItemByCertificationPathFragment =
  {
    title: '[Test] Training Amazon+Parcel / Operations / Recommended',
    targetGroup: 'Maintenance Engineers',
    duration: '4 days',
    sys: { id: '6l5eiiVT472o60nNhKHRIK' }
  }
