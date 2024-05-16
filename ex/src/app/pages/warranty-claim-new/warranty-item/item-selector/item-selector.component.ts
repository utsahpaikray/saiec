import { CommonModule } from '@angular/common'
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  forwardRef,
  inject,
  DestroyRef
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router'
import { DialogService } from '@core/dialog/dialog.service'
import { Asset, Scalars } from '@core/generated/types'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import {
  SelectItemDialogComponent,
  SelectItemDialogVM
} from '@pages/warranty-claim-new/select-item-dialog/select-item-dialog.component'
import {
  Observable,
  Subject,
  filter,
  fromEvent,
  map,
  merge,
  shareReplay,
  switchMap
} from 'rxjs'

@Component({
  selector: 'app-item-selector',
  templateUrl: './item-selector.component.html',
  standalone: true,
  imports: [CommonModule, TranslocoRootModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemSelectorComponent),
      multi: true
    }
  ]
})
export class ItemSelectorComponent
  implements ControlValueAccessor, AfterViewInit
{
  @ViewChild('selectItemButton') selectItemButtonRef: ElementRef

  private activatedRoute = inject(ActivatedRoute)
  private viewContainerRef = inject(ViewContainerRef)
  private dialogService = inject(DialogService)

  private initiated$ = new Subject<void>()
  private prefilledSelectedItem$ = new Subject<Asset>()
  private destroy = inject(DestroyRef)

  private readonly siteId$: Observable<Scalars['UUID']> =
    this.activatedRoute.params.pipe(
      map((params: Params) => params.siteId),
      filter(Boolean)
    )

  public selectedItem$ = this.initiated$.pipe(
    switchMap(() => fromEvent(this.selectItemButtonRef.nativeElement, 'click')),
    switchMap(() => {
      return this.dialogService.create<SelectItemDialogVM, undefined>(
        this.viewContainerRef,
        {
          siteId$: this.siteId$
        },
        SelectItemDialogComponent
      ).result$
    }),
    shareReplay(1)
  )

  public value$ = merge(this.prefilledSelectedItem$, this.selectedItem$).pipe(
    shareReplay(1)
  )

  private readonly valueSubscription = this.value$
    .pipe(takeUntilDestroyed(this.destroy))
    .subscribe((value: Asset) => this.onChange(value))

  public ngAfterViewInit(): void {
    this.initiated$.next()
    this.initiated$.complete()
  }

  private onChange = (value: Asset): void => {
    // do nothing
  }
  private onTouched = (): void => {
    // do nothing
  }

  public writeValue(value: Asset) {
    this.prefilledSelectedItem$.next(value)
  }

  public registerOnChange(fn: (value: Asset) => void): void {
    this.onChange = fn
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }
}
