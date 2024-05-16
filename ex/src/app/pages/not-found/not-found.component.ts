import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit, OnDestroy {
  public isSitePage = false

  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(private activatedRoute: ActivatedRoute) {}

  /**
   * Subscribe to route params to check if site context
   */
  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (params: Params) => (this.isSitePage = params.siteId !== undefined)
      )
  }

  /**
   * Clean up subscriptions on component destroy
   */
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
