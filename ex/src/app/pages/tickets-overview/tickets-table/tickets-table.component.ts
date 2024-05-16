import { CommonModule } from '@angular/common'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core'
import { RouterModule } from '@angular/router'
import { Viewports } from '@core/interfaces/breakpoint.enum'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { WindowResizeService } from '@core/window-resize/window-resize.service'
import { Observable, Subject, takeUntil } from 'rxjs'
import { TicketFragment } from '@core/tickets/graphql/site-tickets.graphql-gen'

@Component({
  selector: 'app-tickets-table',
  templateUrl: './tickets-table.component.html',
  standalone: true,
  imports: [CommonModule, TranslocoRootModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsTableComponent implements OnInit, OnDestroy {
  @Input()
  tickets: TicketFragment[]

  @Input()
  noTicketTexts: string

  private windowResizeService = inject(WindowResizeService)

  public headers: string[] = []
  public breakpoint$: Observable<Viewports> =
    this.windowResizeService.breakpoint$
  public viewports = Viewports

  private unsubscribe$: Subject<void> = new Subject<void>()

  public ngOnInit(): void {
    this.breakpoint$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((breakpoint: Viewports) => {
        this.setTableHeader(breakpoint)
      })
  }

  /**
   * Clean up subscription on component destroy
   */
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  /**
   * Set table header
   */
  public setTableHeader(breakpoint: Viewports): void {
    if (breakpoint === Viewports.Mobile) {
      this.headers = ['Title']
    } else {
      this.headers = [
        'Title',
        'Priority',
        'Number',
        'Type',
        'ReportOn',
        'Status'
      ]
    }
  }
}
