/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ComponentRef,
  Injectable,
  InjectionToken,
  Injector,
  ViewContainerRef
} from '@angular/core'
import { DialogRef as GravityDialogRef } from '@vanderlande-gravity/components'
import { Observable, Subject } from 'rxjs'

type InternalDialogRef = Pick<DialogRef, 'close'>

export interface DialogRef {
  result$: Observable<any>
  componentRef: ComponentRef<any>
  close: (result: any) => void
}

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA')
export const DIALOG_REF = new InjectionToken<InternalDialogRef>('DIALOG_REF')

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  create<VM, R = any>(
    viewContainerRef: ViewContainerRef,
    viewModel: VM,
    component: any
  ): DialogRef {
    const dialogRef = new GravityDialogRef()
    const dialogSubject$ = new Subject<R>()
    const close = (result: R) => {
      dialogSubject$.next(result)
      dialogSubject$.complete()
    }
    const injector = Injector.create({
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: viewModel
        },
        {
          provide: DIALOG_REF,
          useValue: { close }
        }
      ]
    })
    const componentRef = viewContainerRef.createComponent<typeof component>(
      component,
      {
        injector
      }
    )

    dialogRef.open(componentRef.location.nativeElement)

    dialogSubject$.subscribe({
      complete: () => {
        componentRef.destroy()
        dialogRef.close()
      }
    })
    return {
      result$: dialogSubject$.asObservable(),
      componentRef,
      close
    }
  }
}
