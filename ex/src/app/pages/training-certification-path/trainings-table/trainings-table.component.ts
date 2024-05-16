import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AssortedTrainingItemByCertificationPathFragment } from '@core/cms-training-assortments/graphql/cms-assorted-trainings-by-certification-path.graphql-gen'
import { Viewports } from '@core/interfaces/breakpoint.enum'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { WindowResizeService } from '@core/window-resize/window-resize.service'
import { Observable, map } from 'rxjs'

@Component({
  selector: 'app-trainings-table',
  templateUrl: './trainings-table.component.html',
  standalone: true,
  imports: [CommonModule, TranslocoRootModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrainingsTableComponent {
  @Input() trainings: (AssortedTrainingItemByCertificationPathFragment | null)[]

  private windowResizeService = inject(WindowResizeService)

  public breakpoint$: Observable<Viewports> =
    this.windowResizeService.breakpoint$
  public viewports = Viewports

  public isTable$ = this.breakpoint$.pipe(
    map((breakpoint) => breakpoint === this.viewports.Desktop)
  )
}
