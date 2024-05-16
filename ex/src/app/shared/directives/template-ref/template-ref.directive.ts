import {
  AfterViewInit,
  Directive,
  Input,
  inject,
  TemplateRef
} from '@angular/core'
import { Subject } from 'rxjs'

@Directive({
  selector: '[appTemplateRef]',
  standalone: true
})
export class TemplateRefDirective<T> implements AfterViewInit {
  @Input('appTemplateRef')
  public attachedSubject$!: Subject<TemplateRef<T>>
  private templateRef: TemplateRef<T> = inject(TemplateRef)
  public ngAfterViewInit(): void {
    this.attachedSubject$.next(this.templateRef)
  }
}
