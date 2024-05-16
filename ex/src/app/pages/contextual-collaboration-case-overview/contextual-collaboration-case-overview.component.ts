import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  HostBinding,
  inject
} from '@angular/core'
import { RouterModule } from '@angular/router'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { Store } from '@ngrx/store'
import { CrumbtrailComponent } from '@shared/components/crumbtrail/crumbtrail.component'
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component'
import { CasesTableComponent } from './components/cases-table/cases-table.component'
import { CasesTableVM } from './components/cases-table/cases-table.interface'
import { ContextualCollaborationCasesService } from './contextual-collaboration-case-overview.service'

export interface CaseOverviewVM {
  caseTableVM: CasesTableVM
  loading: boolean
  hasNextPage: boolean
  siteId: string
  endCursor?: string
}
@Component({
  selector: 'app-contextual-collaboration-cases',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoRootModule,
    ProgressSpinnerModule,
    CasesTableComponent,
    RouterModule,
    PageHeaderComponent,
    CrumbtrailComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './contextual-collaboration-case-overview.component.html',
  styleUrls: ['./contextual-collaboration-case-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextualCollaborationCasesComponent {
  @HostBinding('class') class = 'd-block p-m m-auto'

  private store = inject(Store)
  private contextCollaborationCasesService = inject(
    ContextualCollaborationCasesService
  )

  public VM$ = this.contextCollaborationCasesService.getCaseOverviewVM$()

  public loadMoreCases =
    this.contextCollaborationCasesService.loadMoreCases.bind(
      this.contextCollaborationCasesService
    )
}
