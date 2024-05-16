import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  forwardRef,
  inject,
  OnDestroy
} from '@angular/core'
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { distinctUntilChanged, filter, map, Subject, takeUntil } from 'rxjs'
import { SwitchCollapsibleComponent } from '../switch-collapsible/switch-collapsible.component'
import {
  EventSources,
  SiteSetting,
  SiteSettingFormValue,
  WorkOrderPromotionRule
} from './site-setting-form.interface'

const ShuttleHealthValidator =
  (): ValidatorFn =>
  (control: AbstractControl<SiteSettingFormValue>): ValidationErrors | null => {
    const value = control.value
    if (value[SiteSetting.ShuttleHealth]) {
      return value[SiteSetting.ShuttleHealthUrl]
        ? null
        : { shuttleHealthUrlRequired: true }
    }
    return null
  }
const DivertHealthValidator =
  (): ValidatorFn =>
  (control: AbstractControl<SiteSettingFormValue>): ValidationErrors | null => {
    const value = control.value
    if (value[SiteSetting.DivertHealth]) {
      return value[SiteSetting.DivertHealthUrl]
        ? null
        : { divertHealthUrlRequired: true }
    }
    return null
  }

@Component({
  selector: 'app-site-setting-form',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    ReactiveFormsModule,
    SwitchCollapsibleComponent
  ],
  templateUrl: './site-setting-form.component.html',
  styleUrls: ['./site-setting-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SiteSettingFormComponent),
      multi: true
    }
  ]
})
export class SiteSettingFormComponent
  implements ControlValueAccessor, OnDestroy
{
  private formBuilder = inject(FormBuilder)
  public SiteSetting = SiteSetting
  public WorkOrderPromotionRule = WorkOrderPromotionRule
  public EventSources = EventSources
  // Validate the URL format
  private urlValidator = Validators.pattern(
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/
  )
  private destroy$ = new Subject<void>()
  public form = this.formBuilder.nonNullable.group(
    {
      [SiteSetting.SpareParts]: [false, [Validators.required]],
      [SiteSetting.Vidi]: [false, [Validators.required]],
      [SiteSetting.ProcessInsights]: [false, [Validators.required]],
      [SiteSetting.MyContracts]: [false, [Validators.required]],
      [SiteSetting.DivertHealth]: [false, [Validators.required]],
      [SiteSetting.ShuttleHealth]: [false, [Validators.required]],
      [SiteSetting.DivertHealthUrl]: ['', [this.urlValidator]],
      [SiteSetting.ShuttleHealthUrl]: ['', [this.urlValidator]],
      [SiteSetting.Cases]: [false, [Validators.required]],
      [SiteSetting.CasesWorkOrderPromotionalRules]:
        this.formBuilder.nonNullable.group({
          [EventSources.Monitron]: [
            WorkOrderPromotionRule.Manual,
            [Validators.required]
          ],
          [EventSources.DivertHealth]: [
            WorkOrderPromotionRule.Manual,
            [Validators.required]
          ],
          [EventSources.ShuttleHealth]: [
            WorkOrderPromotionRule.Manual,
            [Validators.required]
          ],
          [EventSources.OperationalAwareness]: [
            WorkOrderPromotionRule.Manual,
            [Validators.required]
          ]
        })
    },
    { validators: [ShuttleHealthValidator(), DivertHealthValidator()] }
  )

  public workOrderPromotionalRulesGroup =
    this.form.controls[SiteSetting.CasesWorkOrderPromotionalRules]
  public workOrderPromotionalRulesControls =
    this.workOrderPromotionalRulesGroup.controls

  public panels: { titleKey: string; formControlName: string }[] = [
    {
      titleKey:
        'SiteAdminGeneralSettings.GeneralSettingOverview.configs.SpareParts.Title',
      formControlName: SiteSetting.SpareParts
    },
    {
      titleKey:
        'SiteAdminGeneralSettings.GeneralSettingOverview.configs.Vidi.Title',
      formControlName: SiteSetting.Vidi
    },
    {
      titleKey:
        'SiteAdminGeneralSettings.GeneralSettingOverview.configs.ProcessInsights.Title',
      formControlName: SiteSetting.ProcessInsights
    },
    {
      titleKey:
        'SiteAdminGeneralSettings.GeneralSettingOverview.configs.MyContracts.Title',
      formControlName: SiteSetting.MyContracts
    },
    {
      titleKey:
        'SiteAdminGeneralSettings.GeneralSettingOverview.configs.DivertHealth.Title',
      formControlName: SiteSetting.DivertHealth
    },
    {
      titleKey:
        'SiteAdminGeneralSettings.GeneralSettingOverview.configs.ShuttleHealth.Title',
      formControlName: SiteSetting.ShuttleHealth
    },
    {
      titleKey:
        'SiteAdminGeneralSettings.GeneralSettingOverview.configs.Cases.Title',
      formControlName: SiteSetting.Cases
    }
  ]
  private value$ = this.form.valueChanges.pipe(
    map((value) => (this.form.valid && <SiteSettingFormValue>value) || null),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    takeUntil(this.destroy$)
  )

  writeValue(value: SiteSettingFormValue): void {
    this.form.patchValue(value)
  }

  registerOnChange(fn: (value: SiteSettingFormValue | null) => void): void {
    this.value$.subscribe(fn)
  }

  registerOnTouched(fn: () => void): void {
    this.form.valueChanges
      .pipe(
        filter(() => this.form.touched),
        takeUntil(this.destroy$)
      )
      .subscribe(fn)
  }
  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable()
    } else {
      this.form.enable()
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
