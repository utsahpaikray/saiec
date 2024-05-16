import { Overlay } from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal'
import { Injectable, InjectionToken, Injector, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { filterNull } from '@stores/operators'
import toastActions from '@stores/toast/toast.actions'
import { DEFAULT_TTL, toastFeature } from '@stores/toast/toast.state'
import { map, shareReplay, withLatestFrom } from 'rxjs'
import { ToastComponent, ToastVM } from './toast/toast.component'

export class ToastRef<T = unknown> {
  constructor(public onClose: (result?: T) => void) {}
  private _reason: T | undefined
  public get reason(): T | undefined {
    return this._reason
  }
  public close(result?: T): void {
    this._reason = result
    this.onClose(result)
  }
}

export const TOAST_DATA = new InjectionToken<ToastVM>('TOAST_DATA')
export const TOAST_REF = new InjectionToken<ToastRef>('TOAST_REF')

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  private store = inject(Store)
  private overlay = inject(Overlay)

  private overlayRef = this.overlay.create({
    hasBackdrop: false,
    positionStrategy: this.overlay
      .position()
      .global()
      .bottom('16px')
      .left('16px'),
    scrollStrategy: this.overlay.scrollStrategies.reposition()
  })

  private toast$ = this.store
    .select(toastFeature.selectFirstToast)
    .pipe(filterNull())

  private toastRef$ = this.toast$.pipe(
    map(
      ({ id }) =>
        new ToastRef(() => {
          this.overlayRef.detach()
          this.store.dispatch(toastActions.removeToast({ id }))
        })
    ),
    shareReplay(1)
  )

  private injector$ = this.toastRef$.pipe(
    withLatestFrom(this.toast$),
    map(([toastRef, toast]) =>
      Injector.create({
        providers: [
          {
            provide: TOAST_DATA,
            useValue: {
              messageKey: toast.messageKey,
              type: toast.type
            }
          },
          {
            provide: TOAST_REF,
            useValue: toastRef
          }
        ]
      })
    )
  )

  private toastPortal$ = this.injector$.pipe(
    map((injector) => new ComponentPortal(ToastComponent, null, injector))
  )

  protected showToastEffect$ = this.toastRef$
    .pipe(withLatestFrom(this.toast$, this.toastPortal$))
    .subscribe(([toastRef, toast, portal]) => {
      if (this.overlayRef.hasAttached()) {
        throw new Error('Toast is already attached')
      }
      if (portal.isAttached) {
        throw new Error('Portal is already attached')
      }
      //TODO: replace it with the animation duration
      this.overlayRef.attach(portal)
      setTimeout(() => {
        toastRef.close()
      }, toast.TTL ?? DEFAULT_TTL)
    })
}
