import { CommonModule } from '@angular/common'
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit
} from '@angular/core'
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { FormModule } from '@components/form/form.module'
import { MaximoSiteContact, Scalars } from '@core/generated/types'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { ApolloQueryResult } from '@apollo/client/core'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { SiteTicketContactsQuery } from '@core/tickets/graphql/site-ticket-contacts.graphql-gen'
import { TicketsService } from '@core/tickets/tickets.service'
import { SelectedElementEvent } from '@web-components/dropdown/dropdown.model'
import { combineLatest, filter, map, Observable, switchMap } from 'rxjs'
import {
  WarrantyCreateForm,
  WarrantyItem,
  WarrantyItemControl
} from './warranty-create-form.interface'
import { WarrantyItemComponent } from './warranty-item/warranty-item.component'

@Component({
  selector: 'app-warranty-claim-new',
  templateUrl: './warranty-claim-new.component.html',
  styleUrls: ['./warranty-claim-new.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslocoRootModule,
    RouterModule,
    ReactiveFormsModule,
    FormModule,
    ProgressSpinnerModule,
    WarrantyItemComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WarrantyClaimNewComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  private formBuilder = inject(FormBuilder)
  private ticketsService = inject(TicketsService)

  public isDropdownOpen: boolean
  public warrantyItemsEditStatus: boolean[] = []
  public form: WarrantyCreateForm = this.formBuilder.nonNullable.group(
    {
      customerSiteContactId: ['', { validators: [Validators.required] }],
      ticketReference: '',
      summary: ['', { validators: [Validators.required] }],
      warrantyItems: this.formBuilder.array<WarrantyItemControl>([])
    },
    { updateOn: 'submit' }
  )

  private readonly siteId$: Observable<Scalars['UUID']> =
    this.activatedRoute.params.pipe(
      map((params: Params) => params.siteId),
      filter(Boolean)
    )

  private siteTicketContactsQuery$: Observable<
    ApolloQueryResult<SiteTicketContactsQuery>
  > = this.siteId$.pipe(
    switchMap((siteId) => this.ticketsService.getSiteTicketContacts(siteId))
  )

  public loading$: Observable<boolean> = this.siteTicketContactsQuery$.pipe(
    map(({ loading }) => loading)
  )

  public siteTicketContacts$: Observable<MaximoSiteContact[]> =
    this.siteTicketContactsQuery$.pipe(
      map(({ data }) => data?.ticketingSiteInfo.contacts)
    )

  public selectedSiteContact$ = combineLatest([
    this.customerSiteContactId.valueChanges,
    this.siteTicketContacts$
  ]).pipe(
    map(([customerSiteContactId, siteTicketContacts]) => {
      return siteTicketContacts?.filter(
        (contact) => contact.id === customerSiteContactId
      )?.[0]
    })
  )

  public ngOnInit(): void {
    this.addWarrantyItem()
  }

  public onSubmit(): void {
    this.form.markAllAsTouched()

    if (this.form.invalid) return
    // TODO: this is for testing purpose, remove in MYVI-5248
  }

  public addWarrantyItem() {
    this.warrantyItems.push(this.createWarrantyItem())
    this.warrantyItemsEditStatus.push(false)
  }

  public updateWarrantyItemsEditStatus(event: {
    index: number
    isEdit: boolean
  }) {
    this.warrantyItemsEditStatus[event.index] = event.isEdit
  }

  public isAnyWarrantyItemsOnEdit(): boolean {
    return this.warrantyItemsEditStatus.some((status) => status === true)
  }

  public removeWarrantyItem(index: number) {
    this.warrantyItems.removeAt(index)
    this.warrantyItemsEditStatus.splice(index, 1)
  }

  private createWarrantyItem(): FormControl<WarrantyItem | null> {
    return new FormControl(null, {
      validators: [Validators.required],
      updateOn: 'change'
    })
  }

  /**
   * Patch customer site contact id on select
   * @param {CustomEvent<SelectedElementEvent>} event
   */
  public onSelect(event: CustomEvent<SelectedElementEvent>) {
    if (!(event.target as HTMLInputElement).value) return

    this.customerSiteContactId.patchValue(
      (event.target as HTMLInputElement).value
    )
  }

  /**
   * Check if form control input is valid
   * @param {AbstractControl} input
   * @returns {boolean}
   */
  public isInvalid(input: AbstractControl): boolean {
    return input.invalid && input.touched
  }

  /**
   * Get customerSiteContactId form control
   * @returns {FormControl<string>}
   */
  public get customerSiteContactId(): FormControl<string> {
    return this.form.controls.customerSiteContactId as FormControl<string>
  }

  /**
   * Get summary form control
   * @returns {FormControl<string>}
   */
  public get summary(): FormControl<string> {
    return this.form.controls.summary as FormControl<string>
  }

  /**
   * Get warranty items form array
   * @returns {FormArray<FormControl<WarrantyItem | null>>}
   */
  public get warrantyItems(): FormArray<FormControl<WarrantyItem | null>> {
    return this.form.controls.warrantyItems as FormArray<
      FormControl<WarrantyItem | null>
    >
  }
}
