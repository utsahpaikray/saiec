import { CommonModule, TitleCasePipe } from '@angular/common'
import {
  AfterViewChecked,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  inject
} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ApolloQueryResult } from '@apollo/client/core'
import { AssertiveTextComponent } from '@components/assertive-text/assertive-text.component'
import { ComponentsModule } from '@components/components.module'
import { DatalistItem } from '@components/datalist/datalist-item.model'
import { DatalistModule } from '@components/datalist/datalist.module'
import { DropdownItem } from '@components/dropdown/dropdown-item.model'
import { DropdownModule } from '@components/dropdown/dropdown.module'
import { FileUploadModule } from '@components/file-upload/file-upload.module'
import { FormModule } from '@components/form/form.module'
import { LinkModule } from '@components/link/link.module'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { Toast } from '@components/toaster/toast/toast.model'
import { ToasterService } from '@components/toaster/toaster.service'
import { DialogService } from '@core/dialog/dialog.service'
import {
  Asset,
  DocumentInput,
  IssueType,
  MaximoSiteContact,
  Scalars,
  SitePriority,
  TicketCreateInput
} from '@core/generated/types'
import { ServiceDeskLangCodes } from '@core/interfaces/service-desk-lang-codes.enum'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { ControlRequiredModule } from '@core/pipes/control-required.module'
import ticketingConfig from '@core/ticketing/config'
import { SiteTicketsDocument } from '@core/tickets/graphql/site-tickets.graphql-gen'
import { TranslocoService } from '@ngneat/transloco'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import {
  Observable,
  Subject,
  distinctUntilChanged,
  filter,
  first,
  fromEvent,
  map,
  shareReplay,
  switchMap,
  tap
} from 'rxjs'
import { AddAttachmentModalComponent } from '@features/add-attachment-modal/add-attachment-modal.component'
import { CreateTicketGQL } from './graphql/mutation/create-ticket.graphql-gen'
import {
  SiteTicketInfoGQL,
  SiteTicketInfoQuery
} from './graphql/site-ticket-info.graphql-gen'
import { IssueTypeSelector } from './issue-type.interface'

import { TicketCreateForm } from './ticket-create-form.interface'
import {
  SelectAssetDialogComponent,
  SelectAssetDialogVM
} from '@features/select-asset-dialog/select-asset-dialog.component'

@UntilDestroy()
@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormModule,
    TranslocoRootModule,
    LinkModule,
    ComponentsModule,
    DropdownModule,
    DatalistModule,
    ProgressSpinnerModule,
    AssertiveTextComponent,
    FileUploadModule,
    SelectAssetDialogComponent,
    AddAttachmentModalComponent,
    ControlRequiredModule
  ],
  providers: [TitleCasePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketNewComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('selectAssetButton') selectAssetButtonRef: ElementRef

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private formBuilder = inject(FormBuilder)
  private toastService = inject(ToasterService)
  private translocoService = inject(TranslocoService)
  private titleCasePipe = inject(TitleCasePipe)
  private siteTicketInfoGQL = inject(SiteTicketInfoGQL)
  private createTicketGQL = inject(CreateTicketGQL)

  private unsubscribe$: Subject<void> = new Subject<void>()

  public loading: boolean
  public priorityItems: DropdownItem[] = []
  public contactsItems: DropdownItem[] = []
  public siteContacts: MaximoSiteContact[]
  public selectedSiteContact: MaximoSiteContact | null
  public siteId: Scalars['UUID']
  public selectedAsset: Asset
  private filesToUpload: File[]
  public document?: DocumentInput
  public showFileAlert = false
  public alertMessage = ''
  public issueTypes: IssueTypeSelector[] = []
  public serviceDeskLangCode: ServiceDeskLangCodes = ServiceDeskLangCodes.EN

  private initiated$ = new Subject<void>()
  private viewContainerRef = inject(ViewContainerRef)
  private dialogService = inject(DialogService)

  // max counts are defined by Maximo documentation validation rules
  public customerReferenceMaxCount = 30
  public titleReferenceMaxCount = 320
  public descriptionReferenceMaxCount = 32000
  public acceptedFilesType =
    ticketingConfig.attachments.allowedExtensions.toString()

  public form: TicketCreateForm = this.formBuilder.nonNullable.group(
    {
      customerPriority: '',
      customerReference: '',
      title: ['', { validators: [Validators.required] }],
      description: ['', { validators: [Validators.required] }],
      customerSiteContactId: ['', { validators: [Validators.required] }],
      issueType: [IssueType.Incident, { updateOn: 'change' }],
      systemComponentId: ['']
    },
    { updateOn: 'submit' }
  )

  public ngOnInit(): void {
    this.formatTicketIssueTypes()

    this.activatedRoute.params
      .pipe(
        first(),
        tap((params: Params) => (this.siteId = params.siteId)),
        switchMap((params: Params) => this.getSiteTicketInfo(params.siteId)),
        untilDestroyed(this)
      )
      .subscribe({
        next: ({ data, loading }) => {
          this.loading = loading

          if (!data) return
          const { contacts, priorities, languageCode } = data.ticketingSiteInfo
          this.siteContacts = contacts

          this.contactsItems = this.convertToDropdownItems(
            contacts,
            'id',
            'name'
          )

          this.serviceDeskLangCode =
            ServiceDeskLangCodes[
              languageCode as keyof typeof ServiceDeskLangCodes
            ]

          this.setPrioritiesInitialValue(priorities)
          this.setDescriptionInitialValue()
        },
        error: () => {
          this.showErrorToast()
          this.loading = false
        }
      })

    this.onIssueTypeChanges()

    // updating the systemComponentId form field on selectAsset coming from dialogRef
    this.selectAssetDialog$
      .pipe(untilDestroyed(this))
      .subscribe((selectedAsset) => {
        this.systemComponentId.patchValue(selectedAsset.systemComponentId)
        this.systemComponentId.markAsTouched()
      })
  }

  /**
   * Clean up subscriptions on component destroy
   */
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
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
   * Set on site contact dropdown items
   * @param {any[]} items
   * @param {string} valueKey
   * @param {string} labelKey
   * @returns {DropdownItem[]}
   */
  private convertToDropdownItems(
    items: any[],
    valueKey: string,
    labelKey: string
  ): DropdownItem[] {
    return items.map((item: any) => {
      return new DropdownItem(item[valueKey], item[labelKey])
    })
  }

  /**
   * Run query to get site ticket for the siteId specified
   * @returns { Observable<ApolloQueryResult<SiteTicketInfoQuery>>}
   */
  private getSiteTicketInfo(
    siteId: string
  ): Observable<ApolloQueryResult<SiteTicketInfoQuery>> {
    return this.siteTicketInfoGQL.watch(
      {
        siteId
      },
      { useInitialLoading: true, fetchPolicy: 'no-cache' }
    ).valueChanges
  }

  /**
   * Show error toast
   */
  private showErrorToast(): void {
    const message = this.translocoService.translate('General.ApiError')
    const error = new Toast('error', message)
    this.toastService.addToast(error)
  }

  /**
   * Set priorities initial value when translation files are available
   * @param {SitePriority[]} priorities
   */
  private setPrioritiesInitialValue(priorities: SitePriority[]): void {
    this.translocoService
      .selectTranslate(
        'Tickets.Priority.Placeholder',
        {},
        this.serviceDeskLangCode
      )
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (!value) return

        this.priorityItems = priorities.length
          ? [
              new DropdownItem('', value),
              ...this.convertToDropdownItems(priorities, 'value', 'description')
            ]
          : []
      })
  }

  private readonly siteId$: Observable<Scalars['UUID']> =
    this.activatedRoute.params.pipe(
      map((params: Params) => params.siteId),
      filter(Boolean)
    )

  public selectAssetBtn$ = this.initiated$.pipe(
    filter(() => !!this.selectAssetButtonRef),
    map(() => this.selectAssetButtonRef.nativeElement),
    distinctUntilChanged()
  )

  public selectAssetDialog$ = this.selectAssetBtn$.pipe(
    switchMap((button) => {
      return fromEvent(button, 'click')
    }),
    switchMap((): Observable<Asset> => {
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

  public ngAfterViewChecked(): void {
    this.initiated$.next()
  }

  /**
   * Set description initial value when translation files are available
   */
  private setDescriptionInitialValue(): void {
    this.translocoService
      .selectTranslate(
        `Tickets.Description.Incident`,
        {},
        this.serviceDeskLangCode
      )
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (!value) return

        this.description.setValue(value)
      })
  }

  /**
   * Watch value change of issueType to set the correct description template
   */
  private onIssueTypeChanges(): void {
    this.issueType?.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        const key = this.titleCasePipe.transform(value)

        this.description.setValue(
          this.translocoService.translate(
            `Tickets.Description.${key}`,
            {},
            this.serviceDeskLangCode
          )
        )

        if (value === IssueType.Incident) {
          this.form.controls['systemComponentId'].setValidators(
            Validators.required
          )
        } else {
          this.form.controls['systemComponentId'].clearValidators()
        }

        this.form.controls['systemComponentId'].markAsUntouched()
        this.form.controls['systemComponentId'].updateValueAndValidity()
      })
  }

  /**
   * Format ticket issue types based on IssueType enum
   */
  private formatTicketIssueTypes(): void {
    const createTicketIssueTypes = [
      IssueType.Incident,
      IssueType.Servicerequest,
      IssueType.Problemreport,
      IssueType.Changerequest
    ]
    createTicketIssueTypes.forEach((value) => {
      const formattedValue = this.titleCasePipe.transform(value)
      this.issueTypes.push({
        codeName: value,
        label: `Tickets.IssueType.${formattedValue}.Label`,
        description: `Tickets.IssueType.${formattedValue}.Description`
      })
    })
  }

  /**
   * Show success toast if ticket created
   */
  private showSuccessMessage(): void {
    const message = this.translocoService.translate('Tickets.TicketCreated')
    const success = new Toast('success', message)
    this.toastService.addToast(success)
  }

  /**
   * Reset form
   */
  private resetForm(): void {
    this.form.reset()
  }

  /**
   * Save files to upload to property
   * @param {File[]} files
   */
  public onUploadFiles(files: File[]): void {
    this.filesToUpload = files
  }

  /**
   * Save document to upload
   * @param {DocumentInput} document
   */
  public addDocumentToTicket(document: DocumentInput): void {
    this.document = document
  }

  /**
   * Remove files from list
   * @param {number} index
   */
  public removeAttachment(): void {
    this.document = undefined
  }

  /**
   * Validate and format form and create ticket on submit
   */
  public onSubmit(): void {
    if (this.form.invalid) return

    this.createTicket(this.formatTicket())
  }

  /**
   * Format ticket before running the create ticket mutation
   * @returns {TicketCreateInput}
   */
  public formatTicket(): TicketCreateInput {
    const formattedDescription = this.form.value.description?.replace(
      /(?:\r\n|\r|\n)/g,
      '<br>'
    )

    let formattedTicket = {
      ...this.form.value,
      description: formattedDescription
    } as TicketCreateInput

    if (this.document) {
      formattedTicket = {
        ...formattedTicket,
        document: this.document
      } as TicketCreateInput
    }
    return formattedTicket
  }

  /**
   * Run mutation to create ticket to site
   */
  private createTicket(ticket: TicketCreateInput): void {
    this.createTicketGQL
      .mutate(
        {
          siteId: this.siteId,
          ticket
        },
        {
          refetchQueries: [
            {
              query: SiteTicketsDocument,
              variables: { siteId: this.siteId }
            }
          ]
        }
      )
      .pipe(untilDestroyed(this))
      .subscribe({
        next: ({ data, loading }) => {
          this.loading = loading
          if (data?.createTicket) {
            this.showSuccessMessage()
            this.resetForm()
            this.goToOpenTicketsPage()
          }
        },
        error: () => {
          this.loading = false
          this.showErrorToast()
        }
      })
  }

  /**
   * Navigate to open tickets page
   */
  public goToOpenTicketsPage() {
    this.router.navigate([`../`], { relativeTo: this.activatedRoute })
  }

  /**
   * Set selected site contact
   * @param {DatalistItem | undefined | null} item
   */
  public onDatalistChange(item: DatalistItem | undefined | null) {
    if (item) {
      // find selected contact email and phone
      this.selectedSiteContact = this.siteContacts.filter(
        (siteContact: MaximoSiteContact) => siteContact.id === item.value
      )?.[0]
    } else {
      this.selectedSiteContact = null
    }
  }

  /**
   * Get title form control
   * @returns {FormControl<string>}
   */
  public get title(): FormControl<string> {
    return this.form.get('title') as FormControl<string>
  }

  /**
   * Get description form control
   * @returns {FormControl<string>}
   */
  public get description(): FormControl<string> {
    return this.form.get('description') as FormControl<string>
  }

  /**
   * Get customerSiteContactId form control
   * @returns {FormControl<string>}
   */
  public get customerSiteContactId(): FormControl<string> {
    return this.form.get('customerSiteContactId') as FormControl<string>
  }

  /**
   * Get systemComponentId form control
   * @returns {FormControl<string>}
   */
  public get systemComponentId(): FormControl<string> {
    return this.form.get('systemComponentId') as FormControl<string>
  }

  /**
   * Get issueType form control
   * @returns {FormControl<string>}
   */
  public get issueType(): FormControl<string> {
    return this.form.get('issueType') as FormControl<string>
  }
}
