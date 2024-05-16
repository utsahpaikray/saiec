import { Overlay } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import { NgTemplateOutlet } from '@angular/common'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  merge,
  NEVER,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  withLatestFrom
} from 'rxjs'
import { DropdownItemEvent, EVENT_NAME } from './dropdown-item.directive'

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent<T> implements ControlValueAccessor {
  private overlay = inject(Overlay)
  private viewContainerRef = inject(ViewContainerRef)

  @Input({ transform: booleanAttribute })
  public disabled = false

  public trigger$ = new Subject<ElementRef<HTMLSpanElement>>()
  public popover$ = new Subject<TemplateRef<NgTemplateOutlet>>()

  private overlayRef$ = this.trigger$.pipe(
    distinctUntilChanged(),
    map((trigger) =>
      this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'dropdown-backdrop-transparent',
        scrollStrategy: this.overlay.scrollStrategies.close(),
        positionStrategy: this.overlay
          .position()
          .flexibleConnectedTo(trigger)
          .withPositions([
            {
              originX: 'start',
              originY: 'bottom',
              overlayX: 'start',
              overlayY: 'top'
            },
            {
              originX: 'start',
              originY: 'top',
              overlayX: 'start',
              overlayY: 'bottom'
            }
          ])
      })
    ),
    shareReplay(1)
  )

  private templatePortal$ = this.popover$.pipe(
    distinctUntilChanged(),
    map((popover) => new TemplatePortal(popover, this.viewContainerRef)),
    shareReplay(1)
  )

  public events$ = merge(
    this.trigger$.pipe(
      switchMap((trigger) => fromEvent(trigger.nativeElement, 'click'))
    ),
    this.trigger$.pipe(
      switchMap((trigger) => fromEvent(trigger.nativeElement, 'keyup'))
    )
  )

  protected attach$ = this.events$
    .pipe(
      withLatestFrom(this.overlayRef$, this.templatePortal$),
      filter(([, overlayRef]) => !overlayRef.hasAttached()),
      takeUntilDestroyed()
    )
    .subscribe(([, overlayRef, templatePortal]) =>
      overlayRef.attach(templatePortal)
    )

  private backdropClick$ = this.overlayRef$.pipe(
    switchMap((overlayRef) => overlayRef.backdropClick())
  )
  private detachments$ = this.overlayRef$.pipe(
    switchMap((overlayRef) => overlayRef.detachments())
  )

  /** @TODO Not sure the component should track the value set from outside */
  private valueSubject$ = new Subject<T>()
  private valueFromTemplate$ = this.overlayRef$.pipe(
    switchMap((overlayRef) =>
      fromEvent<DropdownItemEvent>(overlayRef.overlayElement, EVENT_NAME)
    ),
    switchMap((event) => {
      if (event.detail) {
        return of(event.detail)
      }
      return NEVER
    })
  )
  public value$ = merge(this.valueSubject$, this.valueFromTemplate$).pipe(
    shareReplay(1)
  )

  protected detach$ = merge(
    this.backdropClick$,
    this.detachments$,
    this.valueFromTemplate$
  )
    .pipe(withLatestFrom(this.overlayRef$), takeUntilDestroyed())
    .subscribe(([, overlayRef]) => overlayRef.detach())

  public open$ = combineLatest([
    this.overlayRef$,
    this.events$,
    merge(this.backdropClick$, this.detachments$, this.valueFromTemplate$).pipe(
      startWith(null)
    )
  ]).pipe(
    map(([overlayRef]) => overlayRef.hasAttached()),
    distinctUntilChanged()
  )

  /** @TODO Could be a decorator to remove code duplication and reduce risk of mistakes */
  public touched$ = new BehaviorSubject<boolean>(false)
  public onBlur() {
    this.touched$.next(true)
    this.touched$.complete()
  }

  public writeValue(value: T): void {
    return this.valueSubject$.next(value)
  }
  public registerOnChange(fn: () => T): void {
    this.value$.subscribe(fn)
  }
  public registerOnTouched(fn: () => true): void {
    this.touched$.pipe(filter((touched) => touched)).subscribe(fn)
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
}
