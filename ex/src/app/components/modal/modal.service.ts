import { Injectable } from '@angular/core'
import { ModalComponent } from './modal.component'

@Injectable({ providedIn: 'root' })
export class ModalService {
  public modals: ModalComponent[] = []

  add(modal: ModalComponent) {
    // add modal to array of active modals
    this.modals.push(modal)
  }

  remove(id: string) {
    // remove modal from array of active modals
    this.modals = this.modals.filter((x) => x.id !== id)
  }

  open(id: string) {
    // open modal specified by id
    const modal = this.modals.find((x) => x.id === id)
    if (modal) {
      modal.open()
    }
  }

  close(id: string) {
    // close modal specified by id
    const modal = this.modals.find((x) => x.id === id)
    if (modal) {
      modal.close()
    }
  }
}
