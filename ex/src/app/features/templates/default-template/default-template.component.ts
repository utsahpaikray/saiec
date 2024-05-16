import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { CurrentUserService } from '@core/current-user/current-user.service'
import { Scalars } from '@core/generated/types'
import { OidcSecurityService } from 'angular-auth-oidc-client'
import { combineLatest, Observable, Subject, takeUntil } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-default-template',
  templateUrl: './default-template.component.html',
  styleUrls: ['./default-template.component.scss']
})
export class DefaultTemplateComponent implements OnInit, OnDestroy {
  @Input()
  hasBanner = false

  public isAuthenticated$: Observable<boolean>
  public hasAccessToPortalOverview$: Observable<boolean>
  public siteId: Scalars['UUID']
  public isMenuButtonVisible: boolean = false

  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(
    private activatedRoute: ActivatedRoute,
    private oidcSecurityService: OidcSecurityService,
    private currentUserService: CurrentUserService
  ) {}

  public ngOnInit(): void {
    this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$.pipe(
      takeUntil(this.unsubscribe$),
      map((x) => x.isAuthenticated)
    )

    this.hasAccessToPortalOverview$ =
      this.currentUserService.hasAccessToPortalOverview$

    combineLatest([
      this.params$,
      this.isAuthenticated$,
      this.hasAccessToPortalOverview$
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        ([params, isAuthenticated, hasAccessToPortalOverview]: [
          Params,
          boolean,
          boolean
        ]) => {
          this.siteId = params.siteId
          this.isMenuButtonVisible =
            isAuthenticated &&
            !!((params.portalId && hasAccessToPortalOverview) || this.siteId)
        }
      )
  }

  /**
   * Clean up subscriptions on component destroy
   */
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  /**
   * Get params from activated route
   */
  public get params$(): Observable<Params> {
    return this.activatedRoute.params.pipe(map((params: Params) => params))
  }
}
