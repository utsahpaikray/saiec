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
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router'
import { DialogService } from '@core/dialog/dialog.service'
import { Asset, Scalars } from '@core/generated/types'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import {
  SelectAssetDialogComponent,
  SelectAssetDialogVM
} from '@features/select-asset-dialog/select-asset-dialog.component'
import {
  Observable,
  Subject,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  merge,
  shareReplay,
  switchMap
} from 'rxjs'

@Component({
  selector: 'app-asset-selector',
  templateUrl: './asset-selector.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, TranslocoRootModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AssetSelectorComponent),
      multi: true
    }
  ]
})
export class AssetSelectorComponent
  implements ControlValueAccessor, AfterViewInit
{
  @ViewChild('selectAssetButton') selectAssetButtonRef: ElementRef

  private activatedRoute = inject(ActivatedRoute)
  private dialogService = inject(DialogService)
  private viewContainerRef = inject(ViewContainerRef)

  private initiated$ = new Subject<void>()
  private prefilledSelectedAsset$ = new Subject<Asset>()
  private destroy = inject(DestroyRef)

  private readonly siteId$: Observable<Scalars['UUID']> =
    this.activatedRoute.params.pipe(
      map((params: Params) => params.siteId),
      filter(Boolean)
    )

  public selectAssetBtn$ = this.initiated$.pipe(
    map(() => this.selectAssetButtonRef.nativeElement),
    distinctUntilChanged()
  )

  public selectedAsset$ = this.selectAssetBtn$.pipe(
    switchMap((button) => {
      return fromEvent(button, 'click')
    }),
    switchMap(() => {
      return this.dialogService.create<SelectAssetDialogVM, undefined>(
        this.viewContainerRef,
        {
          siteId$: this.siteId$
        },
        SelectAssetDialogComponent
      ).result$
    }),
    shareReplay(1)
  )

  public value$ = merge(this.prefilledSelectedAsset$, this.selectedAsset$).pipe(
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
    /** onChange */
  }
  private onTouched = (): void => {
    /** onTouched */
  }

  public writeValue(value: Asset) {
    this.prefilledSelectedAsset$.next(value)
  }

  public registerOnChange(fn: (value: Asset) => void): void {
    this.onChange = fn
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }
}
