import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewContainerRef,
  booleanAttribute,
  forwardRef,
  inject
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslocoModule } from '@ngneat/transloco'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { DialogService } from '@core/dialog/dialog.service'
import {
  BehaviorSubject,
  NEVER,
  Subject,
  map,
  merge,
  of,
  shareReplay,
  startWith,
  switchMap,
  withLatestFrom
} from 'rxjs'
import { Asset } from './interfaces/asset.interface'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
interface AssetSelectorLabels {
  EYEBROW?: string
  SELECT_ASSET?: string
  EMPTY_STATE_TITLE?: string
  EMPTY_STATE_EXPLANATION?: string
  CHANGE_ASSET?: string
}

//See:
// - https://github.com/Microsoft/TypeScript/issues/26347
// - https://github.com/Microsoft/TypeScript/issues/4881
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AssetSelectorVM<VM = any, C = any, L = AssetSelectorLabels> {
  siteId?: string
  value?: Asset | null
  labels?: L
  modalComponent?: C
  modalComponentVM?: VM
  disabled?: boolean
}

const defaultLabels: Required<AssetSelectorLabels> = {
  EYEBROW: 'AssetSelector.Eyebrow',
  SELECT_ASSET: 'AssetSelector.SelectAsset',
  EMPTY_STATE_TITLE: 'AssetSelector.EmptyState.Title',
  EMPTY_STATE_EXPLANATION: 'AssetSelector.EmptyState.Explanation',
  CHANGE_ASSET: 'AssetSelector.ChangeAsset'
}

@Component({
  selector: 'app-asset-selector',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './asset-selector.component.html',
  styleUrls: ['./asset-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AssetSelectorComponent),
      multi: true
    }
  ]
})
export class AssetSelectorComponent implements ControlValueAccessor, OnChanges {
  private dialogService = inject(DialogService)
  private viewContainerRef = inject(ViewContainerRef)

  @Input({ transform: booleanAttribute })
  public error!: boolean

  @Input()
  public vm: AssetSelectorVM | null = null
  public vm$ = new BehaviorSubject<AssetSelectorVM | null>(this.vm)
  /* Lifecycle */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.vm) {
      this.vm$.next(this.vm)
    }
  }

  public labels$ = this.vm$.pipe(
    map((vm) => Object.assign({}, defaultLabels, vm?.labels))
  )

  public openDialog$ = new Subject<void>()
  public dialogResult$ = this.openDialog$.pipe(
    withLatestFrom(this.vm$),
    switchMap(([, vm]) =>
      vm?.modalComponent
        ? this.dialogService
            .create<AssetSelectorVM['modalComponentVM'], Asset>(
              this.viewContainerRef,
              vm.modalComponentVM,
              vm.modalComponent
            )
            .result$.pipe(
              switchMap((asset) => (asset ? of(asset) : NEVER)),
              map((asset) => ({
                ...asset,
                name: asset.description
              }))
            )
        : NEVER
    ),
    startWith<Asset | null>(null),
    takeUntilDestroyed(),
    shareReplay(1)
  )

  public value$ = merge(
    this.vm$.pipe(map((vm) => vm?.value || null)),
    this.dialogResult$
  )

  /** @TODO Could be a decorator to remove code duplication and reduce risk of mistakes */
  public touched$ = new BehaviorSubject<boolean>(false)
  public onBlur() {
    this.touched$.next(true)
    this.touched$.complete()
  }

  /* ControlValueAccessor */
  public writeValue(value: Asset | null): void {
    this.vm$.next({ ...this.vm$.value, value })
  }
  public registerOnChange(fn: (asset: Asset | null) => void): void {
    this.dialogResult$.subscribe((asset) => fn(asset))
  }
  public registerOnTouched(fn: () => void): void {
    this.touched$.subscribe(() => fn())
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.vm$.next({ ...this.vm$.value, disabled: isDisabled })
  }
}
