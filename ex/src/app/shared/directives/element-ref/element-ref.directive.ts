/**
 * Directive to get the ElementRef of anything into a Subject.
 * Saves you from having to write the boilerplate code to get the ElementRef of a specific element.
 */
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  inject
} from '@angular/core'
import { Subject } from 'rxjs'

@Directive({
  selector: '[appElementRef]',
  standalone: true
})
export class ElementRefDirective<T> implements AfterViewInit {
  @Input('appElementRef')
  public attachedSubject$!: Subject<ElementRef<T>>
  private elementRef: ElementRef<T> = inject(ElementRef)
  public ngAfterViewInit(): void {
    this.attachedSubject$.next(this.elementRef)
  }
}
