import { Component, Input } from '@angular/core'
import { TrainingDetailModuleFragment } from '../../graphql/cms-training-detail.graphql-gen'

@Component({
  selector: 'app-training-detail-modules',
  templateUrl: './training-detail-modules.component.html'
})
export class TrainingDetailModulesComponent {
  @Input() public modules?: TrainingDetailModuleFragment[] | null
}
