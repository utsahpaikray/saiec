import { Component, Input } from '@angular/core'
import { TrainingDetailItemFragment } from '../../graphql/cms-training-detail.graphql-gen'
import { TrainingImageFragment } from '@core/cms-training-assortments/graphql/cms-shared-trainings-fragment.graphql-gen'

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html'
})
export class TrainingDetailsComponent {
  @Input() public training: TrainingDetailItemFragment | null
  @Input() public image: TrainingImageFragment | null
}
