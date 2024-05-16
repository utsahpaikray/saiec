import { ViewContainerRef } from '@angular/core'
import { Subject } from 'rxjs'
import { DialogRef } from './dialog.service'

export class MockDialogService {
  private dialogSubject$ = new Subject<any>()

  create<VM, R = any>(
    viewContainerRef: ViewContainerRef,
    viewModel: VM,
    component: any
  ): DialogRef {
    const close = (result: R) => {
      this.dialogSubject$.next(result)
      this.dialogSubject$.complete()
    }

    return {
      result$: this.dialogSubject$.asObservable(),
      componentRef:
        viewContainerRef.createComponent<typeof component>(component),
      close
    }
  }
}
