import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { TranslocoModule } from '@ngneat/transloco'
import { CrumbtrailComponent } from '@shared/components/crumbtrail/crumbtrail.component'
import { FormPageComponent } from '@shared/components/form-page/form-page.component'
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component'
import { CasesStoreModule } from '@stores/cases/cases.module'
import { MaximoContactsStoreModule } from '@stores/maximoContacts/maximo-contacts.module'
import { map, shareReplay, switchMap, take } from 'rxjs'
import { NewCaseFormComponent } from './components/new-case-form/new-case-form.component'
import { ManualCase } from './components/new-case-form/new-case-form.interface'
import { ContextualCollaborationNewCaseService } from './contextual-collaboration-new-case.service'

@Component({
  selector: 'app-contextual-collaboration-new-case',
  standalone: true,
  imports: [
    CommonModule,
    FormPageComponent,
    NewCaseFormComponent,
    ReactiveFormsModule,
    MaximoContactsStoreModule,
    CasesStoreModule,
    TranslocoModule,
    RouterModule,
    CrumbtrailComponent,
    PageHeaderComponent
  ],
  templateUrl: './contextual-collaboration-new-case.component.html',
  styleUrls: ['./contextual-collaboration-new-case.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContextualCollaborationNewCaseComponent {
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  public siteId$ = this.route.params.pipe(
    map((params) => params.siteId),
    shareReplay(1),
    takeUntilDestroyed()
  )

  private contextualCollaborationNewCaseService = inject(
    ContextualCollaborationNewCaseService
  )

  public newCaseFormVM$ =
    this.contextualCollaborationNewCaseService.getNewCaseFormVM$(this.siteId$)

  public control = new FormControl<ManualCase | null>(null, [
    Validators.required
  ])

  public onSubmit(value: ManualCase | null) {
    if (!value) {
      return
    }
    this.siteId$
      .pipe(
        take(1),
        switchMap((siteId) =>
          this.contextualCollaborationNewCaseService.submitNewCaseForm(
            value,
            siteId
          )
        )
      )
      .subscribe((result) => {
        if (result instanceof Error || !result) {
          // TODO Show error somewhere?
          return
        }
        this.router.navigate(['../', result], {
          relativeTo: this.route
        })
      })
  }
}
