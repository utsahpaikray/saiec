import { DOCUMENT } from '@angular/common'
import { Inject, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class WindowScrollService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  public enable() {
    this.document.body.classList.add('overflow-hidden')
  }

  public disable() {
    this.document.body.classList.remove('overflow-hidden')
  }
}
