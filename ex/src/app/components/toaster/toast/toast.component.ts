import { Component, Input, OnInit } from '@angular/core'
import { ToasterService } from '../toaster.service'
import { Toast } from './toast.model'

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input()
  index = 0

  /**
   * The toast object with all the necessary data.
   */
  @Input()
  toast?: Toast

  /**
   * Sets the visibility of the toast.
   */
  @Input()
  isVisible = false

  /**
   * Enables or disables the toast to hide automatically after 8s after it get's visible.
   */
  @Input()
  autoHide = true

  constructor(private toasterService: ToasterService) {}

  ngOnInit() {
    if (!this.isVisible) {
      setTimeout(() => {
        this.isVisible = true
      }, 100)
    }

    if (this.autoHide) {
      setTimeout(() => {
        this.remove()
      }, 8000)
    }
  }

  remove() {
    this.isVisible = false

    // Can only be really removed after css transition is done
    setTimeout(() => {
      if (this.toast) {
        this.toasterService.removeToast(this.toast)
      }
    }, 300)
  }
}
