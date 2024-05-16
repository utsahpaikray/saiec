import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router'
import { SiteContactsMutationDtoInput } from '@core/generated/types'
import { SiteContacts } from '@core/sites/sites.model'
import { SitesService } from '@core/sites/sites.service'
import { map, switchMap, withLatestFrom } from 'rxjs'
import {
  ContactsForm,
  ReadonlyContacts,
  ReadonlyContactsType,
  ServiceDeskReadonlyContacts
} from './site-settings-contacts-form.interface'
import { SiteSettingsContactsService } from './site-settings-contacts.service'

@Component({
  selector: 'app-site-settings-contacts',
  templateUrl: './site-settings-contacts.component.html'
})
export class SiteSettingsContactsComponent implements OnInit {
  public formattedSiteContacts: SiteContactsMutationDtoInput
  public form: ContactsForm

  private siteSettingsContactsService = inject(SiteSettingsContactsService)
  private activatedRoute = inject(ActivatedRoute)
  private sitesService = inject(SitesService)
  private formBuilder = inject(FormBuilder)
  private destroyRef = inject(DestroyRef)

  public loading = this.siteSettingsContactsService.loading

  private siteId$ = this.activatedRoute.params.pipe(
    map((params: Params) => params.siteId)
  )

  public siteContacts$ = this.siteId$.pipe(
    map((siteId) => {
      this.siteSettingsContactsService.setSiteId(siteId)
      return siteId
    }),
    switchMap((siteId) => this.sitesService.getSiteContacts(siteId)),
    map((siteContacts) => siteContacts)
  )

  private contactForm$ = this.siteContacts$.pipe(
    switchMap((siteContacts) => {
      this.initializeForm()
      this.siteSettingsContactsService.setSiteContactsFormGroupsValidations(
        this.form,
        siteContacts
      )
      this.setSiteContactsFormControls(this.form, siteContacts)
      return this.form.valueChanges
    })
  )

  // create a mapping for the readonly attributes of contacts to be used in the template
  public readOnlyContacts$ = this.siteContacts$.pipe(
    map((siteContacts) => {
      return Object.entries(siteContacts)
        .map(([groupKey, groupValue]) => {
          if (
            groupKey === '__typename' ||
            groupKey === 'sparePartsContact' ||
            groupKey === 'visitingOfficeContact'
          ) {
            return null
          }
          const group = <ReadonlyContactsType>groupValue
          const serviceDeskContact = <ServiceDeskReadonlyContacts>groupValue
          if (groupKey === 'contractManagerContact') {
            const readonlyContacts = <ReadonlyContacts>{
              contractManagerContact: {
                emailAddress: group.emailAddress,
                name: group.name,
                phoneNumber: group.phoneNumber
              }
            }
            return readonlyContacts
          }
          if (groupKey === 'accountManagerContact') {
            const readonlyContacts = <ReadonlyContacts>{
              accountManagerContact: {
                emailAddress: group.emailAddress,
                name: group.name,
                phoneNumber: group.phoneNumber
              }
            }
            return readonlyContacts
          }
          if (groupKey === 'itManagerContact') {
            const readonlyContacts = <ReadonlyContacts>{
              itManagerContact: {
                emailAddress: group.emailAddress,
                name: group.name,
                phoneNumber: group.phoneNumber
              }
            }
            return readonlyContacts
          }
          if (groupKey === 'serviceDeskContact') {
            const readonlyContacts = <ReadonlyContacts>{
              serviceDeskContact: {
                emailAddress: serviceDeskContact.emailAddress,
                name: serviceDeskContact.name,
                phoneNumber: serviceDeskContact.phoneNumber,
                phoneNumberOutsideWorkingHours:
                  serviceDeskContact.phoneNumberOutsideWorkingHours
              }
            }
            return readonlyContacts
          }
          return null
        })
        .filter((group) => group !== null)
    }),
    map((contacts): ReadonlyContacts => Object.assign({}, ...contacts))
  )

  ngOnInit(): void {
    this.contactForm$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        withLatestFrom(this.siteContacts$)
      )
      .subscribe()
  }

  /**
   * Initialize form
   */
  private initializeForm(): void {
    this.form = this.formBuilder.nonNullable.group(
      {
        contractManagerContact: this.formBuilder.nonNullable.group({
          alternativeContactTitle: ['']
        }),
        accountManagerContact: this.formBuilder.nonNullable.group({
          show: [false, { updateOn: 'change' }],
          alternativeContactTitle: ['']
        }),
        itManagerContact: this.formBuilder.nonNullable.group({
          show: [false, { updateOn: 'change' }],
          alternativeContactTitle: ['']
        }),
        serviceDeskContact: this.formBuilder.nonNullable.group({
          show: [false, { updateOn: 'change' }],
          alternativeContactTitle: ['']
        }),
        sparePartsContact: this.formBuilder.nonNullable.group({
          show: [false, { updateOn: 'change' }],
          alternativeContactTitle: [''],
          emailAddress: ['']
        }),
        visitingOfficeContact: this.formBuilder.nonNullable.group({
          show: [false, { updateOn: 'change' }],
          alternativeContactTitle: [''],
          name: [''],
          address: [''],
          email: [''],
          phoneNumber: ['']
        })
      },
      { updateOn: 'submit' }
    ) as ContactsForm
  }

  /**
   * Reset form, redirect user to all site settings page and show success message after form is sent
   */
  public onSubmit(): void {
    if (!this.form.valid) return
    this.siteContacts$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((siteContacts) => {
        this.siteSettingsContactsService.saveSiteContacts(
          this.form,
          siteContacts
        )
      })
  }

  /**
   * Check if form control input is valid
   * @param {AbstractControl} input
   * @returns {boolean}
   */
  public isInvalid(form: ContactsForm, control: string): boolean {
    const input = <ContactsForm>this.getFormControl(form, control)
    return input.invalid && input.touched
  }

  /**
   * Sets/prefills all form controls
   * @param {SiteContacts} siteContacts
   */
  public setSiteContactsFormControls(
    form: ContactsForm,
    siteContacts: SiteContacts
  ) {
    Object.entries(siteContacts)
      .filter(([groupKey, _groupValue]) => groupKey !== '__typename')
      .forEach(([groupKey, groupValue]) => {
        if (groupValue) {
          Object.entries(groupValue).forEach(([key, value]) => {
            const control = this.getFormControl(form, `${groupKey}.${key}`)

            if (control) {
              const filterValue = value !== null ? value : ''
              control.setValue(filterValue)
            }
          })
        }
      })
  }

  /**
   * Get form control
   * @param {string} control
   */
  public getFormControl(form: ContactsForm, control: string) {
    return form.get(control)
  }
}
