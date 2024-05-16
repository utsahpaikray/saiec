import { Component, DestroyRef, HostListener, inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  NavigationEnd,
  Params,
  Router
} from '@angular/router'
import { AzureBlobStorageService } from '@core/azure/azure-blob-storage.service'
import { TranslocoService } from '@ngneat/transloco'
import { BehaviorSubject, Subject, combineLatest } from 'rxjs'
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  startWith,
  take,
  withLatestFrom
} from 'rxjs/operators'

import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ModalService } from '@components/modal/modal.service'
import { AzureBlobStorageFile } from '@core/azure/azure-blob-storage-file.interface'
import { WindowScrollService } from '@core/window-scroll/window-scroll.service'
import { Store } from '@ngrx/store'
import currentUserActions from '@stores/current-user/current-user.actions'
import { currentUserFeature } from '@stores/current-user/current-user.state'
import { filterNull } from '@stores/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private store$ = inject(Store)
  private router = inject(Router)
  private translocoService = inject(TranslocoService)
  private windowScroll = inject(WindowScrollService)
  public azureBlobStorageService = inject(AzureBlobStorageService)
  private modalService = inject(ModalService)
  private destroy = inject(DestroyRef)

  // TODO fix this with Portal access with Portals State

  private userLanguage$ = this.store$
    .select(currentUserFeature.selectUserLanguage)
    .pipe(takeUntilDestroyed(this.destroy))
  public isAuthenticated$ = this.store$
    .select(currentUserFeature.selectIsAuthenticated)
    .pipe(filterNull(), takeUntilDestroyed(this.destroy))

  public params$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map(() =>
      this.getParamsFromSnapshot({}, this.router.routerState.snapshot.root)
    ),
    takeUntilDestroyed(this.destroy),
    shareReplay(1)
  )

  public portalId$ = this.params$.pipe(map((params: Params) => params.portalId))
  public siteId$ = this.params$.pipe(map((params: Params) => params.siteId))

  private azureFiles$ = this.azureBlobStorageService.files$.pipe(
    takeUntilDestroyed(this.destroy)
  )

  public bottomSheetIsOpen$ = combineLatest([
    this.isAuthenticated$,
    this.azureFiles$
  ]).pipe(
    map(
      ([isAuthenticated, files]: [boolean, AzureBlobStorageFile[]]) =>
        isAuthenticated && files.length > 0
    ),
    startWith(false)
  )

  private isMenuOpenSubject$ = new Subject<boolean>()
  public isMenuOpen$ = this.isMenuOpenSubject$.pipe(distinctUntilChanged())
  public bottomSheetIsExpanded$ = this.azureFiles$.pipe(
    map((files) => files.length > 0)
  )

  public navigationEnd$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    withLatestFrom(this.bottomSheetIsOpen$),
    takeUntilDestroyed(this.destroy)
  )

  protected languageChangedSubscription = this.userLanguage$
    .pipe(
      filter(
        (userLanguage) =>
          Boolean(userLanguage) &&
          this.translocoService.getActiveLang() !== userLanguage
      ),
      takeUntilDestroyed(this.destroy)
    )
    .subscribe(this.translocoService.setActiveLang.bind(this.translocoService))

  protected logoutSubscription = this.isAuthenticated$
    .pipe(
      filter((isAuthenticated) => !isAuthenticated),
      filter(() => this.router.url !== '/'),
      takeUntilDestroyed(this.destroy)
    )
    .subscribe(() => this.router.navigate(['/']))

  protected navigationEndSubscription = this.navigationEnd$.subscribe(
    ([, bottomSheetIsOpen]) => {
      const amountOfActiveUploads =
        this.azureBlobStorageService.activeUploads.length
      const hasActiveUploads = amountOfActiveUploads > 0
      // close bottom sheet on route change if there is no active upload
      if (!hasActiveUploads && bottomSheetIsOpen) {
        this.closeBottomSheetAndRemoveFiles()
      }

      // close menu on route change
      this.setMenuVisibility(false)
    }
  )
  protected windowScrollSubscription = this.isMenuOpen$.subscribe(
    (isMenuOpen) =>
      isMenuOpen ? this.windowScroll.enable() : this.windowScroll.disable()
  )

  public logoutSubject$ = new BehaviorSubject<boolean>(false)
  public logout$ = this.logoutSubject$.pipe(takeUntilDestroyed(this.destroy))

  public logout = this.logoutSubject$.next.bind(this.logoutSubject$)

  // confirmation modal
  public confirmationModalConfirmText: string
  public confirmationModalCancelText: string
  public confirmationModalText: string

  /*
   * show warning alert to prevent browser refresh
   * close browser tab when there is active uploads
   */
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent) {
    if (this.azureBlobStorageService.activeUploads.length) {
      $event.returnValue = true
    }
  }

  /**
   * close the entire bottom sheet and remove all files
   */
  private closeBottomSheetAndRemoveFiles(): void {
    this.azureBlobStorageService.removeAllFiles()
  }

  /**
   * Set menu's visibility
   * @param {boolean} isVisible
   */
  public setMenuVisibility = this.isMenuOpenSubject$.next.bind(
    this.isMenuOpenSubject$
  )

  /**
   * Check angular router tree and get all child params
   * @param {Params} params
   * @param {ActivatedRouteSnapshot} snapshot
   * @returns {Params}
   */
  private getParamsFromSnapshot(
    params: Params,
    snapshot: ActivatedRouteSnapshot
  ) {
    Object.assign(params, snapshot.params)

    snapshot.children.forEach((childSnapshot) =>
      this.getParamsFromSnapshot(params, childSnapshot)
    )
    return params
  }

  /*
   * Open cancel all uploads modal if active uploads,
   * or close bottom sheet and remove files
   */
  public onBottomSheetClose(): void {
    switch (true) {
      case !!this.azureBlobStorageService.activeUploads.length:
        this.confirmationModalText = this.translocoService.translate(
          'SiteAdminDocumentation.CancelUploadsModalText'
        )
        this.confirmationModalConfirmText = this.translocoService.translate(
          'SiteAdminDocumentation.CancelUploadsModalConfirmText'
        )
        this.confirmationModalCancelText = this.translocoService.translate(
          'SiteAdminDocumentation.CancelUploadsModalCancelText'
        )
        this.modalService.open('cancel-all-uploads-confirmation-modal')
        break

      case !!this.azureBlobStorageService.activeProcessingFiles.length:
        this.confirmationModalText = this.translocoService.translate(
          'SiteAdminDocumentation.CancelUploadsModalText2'
        )
        this.confirmationModalConfirmText = this.translocoService.translate(
          'SiteAdminDocumentation.CancelUploadsModalConfirmText2'
        )
        this.confirmationModalCancelText = ''
        this.modalService.open('cancel-all-uploads-confirmation-modal')
        break

      default:
        this.closeBottomSheetAndRemoveFiles()
        break
    }
  }

  /**
   * Confirmation modal of cancel all uploads is closed.
   * If confirmed, cancel all uploads, otherwise do nothing
   * @param {boolean} confirmed
   */
  public onConfirmationClose(confirmed: boolean): void {
    if (confirmed) {
      this.azureBlobStorageService.cancelAllFiles()
      this.logout$.pipe(take(1)).subscribe((isLogoutRequest) => {
        if (isLogoutRequest) {
          this.store$.dispatch(currentUserActions.logOff())
        } else {
          this.closeBottomSheetAndRemoveFiles()
        }
      })
    }
    this.logoutSubject$.next(false)
  }
}
