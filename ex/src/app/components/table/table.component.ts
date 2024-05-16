import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [CommonModule]
})
export class TableComponent {
  @Input()
  hideHeaderBreakpoint: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md'

  public get classes(): string[] {
    if (this.hideHeaderBreakpoint === 'none') {
      return ['divide-y', 'divide-gray-200']
    }

    return [
      `${this.hideHeaderBreakpoint}:divide-y`,
      `${this.hideHeaderBreakpoint}:divide-gray-200`
    ]
  }

  public get headClasses(): string[] {
    if (this.hideHeaderBreakpoint === 'none') {
      return ['d-flex', 'gap-s', 'px-m', 'py-m']
    }

    return [
      `<${this.hideHeaderBreakpoint}:d-none`,
      `${this.hideHeaderBreakpoint}:d-flex`,
      `${this.hideHeaderBreakpoint}:gap-s`,
      `${this.hideHeaderBreakpoint}:px-m`,
      `${this.hideHeaderBreakpoint}:py-m`
    ]
  }
}
