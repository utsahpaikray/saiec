import { NgModule, inject } from '@angular/core'
import { ToastStoreModule } from '@stores/toast/toast.module'
import { ToastComponent } from './toast/toast.component'
import { ToastsService } from './toasts.service'

@NgModule({
  declarations: [],
  imports: [ToastStoreModule, ToastComponent],
  providers: [ToastsService],
  exports: []
})
export class ToastModule {
  protected toastsService = inject(ToastsService)
}
