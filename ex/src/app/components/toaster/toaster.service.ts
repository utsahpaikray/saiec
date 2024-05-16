import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

import { Toast } from './toast/toast.model'

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  toasts$ = new Subject<Toast[]>()

  private toasts: Toast[] = []

  constructor() {}

  getToasts() {
    return this.toasts.slice()
  }

  removeToast(toast: Toast) {
    this.toasts.splice(this.toasts.indexOf(toast), 1)
    this.toasts$.next(this.toasts.slice())
  }

  addToast(toast: Toast) {
    this.toasts.push(toast)
    this.toasts$.next(this.toasts.slice())
  }
}
