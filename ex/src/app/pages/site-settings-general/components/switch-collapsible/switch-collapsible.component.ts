import { CommonModule } from '@angular/common'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  forwardRef,
  input
} from '@angular/core'
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms'
import { BehaviorSubject, Subject } from 'rxjs'

@Component({
  selector: 'app-switch-collapsible',
  templateUrl: './switch-collapsible.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchCollapsibleComponent),
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwitchCollapsibleComponent implements ControlValueAccessor {
  public title = input<string>()
  private valueSubject$ = new BehaviorSubject<boolean>(false)
  public value$ = this.valueSubject$
  public touched$ = new Subject<void>()
  public writeValue(value: boolean): void {
    this.valueSubject$.next(value)
  }
  public registerOnChange(fn: () => boolean): void {
    this.value$.subscribe(fn)
  }
  public registerOnTouched(fn: () => void): void {
    this.touched$.subscribe(fn)
  }
  public onToggle(event: Event): void {
    event.stopPropagation()
    if (this.touched$.closed === false) {
      this.touched$.next()
      this.touched$.complete()
    }
    this.writeValue(!this.valueSubject$.value)
  }
}
