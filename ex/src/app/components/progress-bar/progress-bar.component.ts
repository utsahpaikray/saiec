import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core'
import { breakpointMdMin } from 'src/tokens/build/js/es6'

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html'
})
export class ProgressBarComponent implements OnInit {
  /**
   * Progress value
   */
  @Input() progress: number

  /**
   * Max number of progress value
   */
  @Input() total: number

  /**
   * Cancel progress bar handler
   */
  @Output() cancel: EventEmitter<void> = new EventEmitter()

  public currentWindowWidth: number
  public breakpointMd = parseInt(breakpointMdMin, 10)

  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth
  }

  public ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth

    //if we don't have progress, set it to 0.
    if (!this.progress) {
      this.progress = 0
    }
    //if we don't have a total aka no requirement, it's 100%.
    if (this.total === 0) {
      this.total = this.progress
    } else if (!this.total) {
      this.total = 100
    }
    //if the progress is greater than the total, it's also 100%.
    if (this.progress > this.total) {
      this.progress = 100
      this.total = 100
    }
    this.progress = (this.progress / this.total) * 100
  }
}
