import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent {
  @Input()
  size: 'xs' | 's' | 'm' | 'l' | 'xl' | '2-xl' | '3-xl' | '4-xl' = '2-xl'

  public get sizeClass() {
    return `text-${this.size}`
  }
}
