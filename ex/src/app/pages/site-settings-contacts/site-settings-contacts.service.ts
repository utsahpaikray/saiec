import { inject, Injectable } from '@angular/core'
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms'
import { Toast } from '@components/toaster/toast/toast.model'
import { ToasterService } from '@components/toaster/toaster.service'
import {
  AccountManagerContactDtoInput,
  ContractManagerContactDtoInput,
  ItManagerContactMutationDtoInput,
  ServiceDeskContactMutationDtoInput,
  SiteContactsMutationDtoInput,
  SparePartsContactInput,
  VisitingOfficeContactInput
} from '@core/generated/types'
import { ContactsBySiteIdDocument } from '@core/sites/graphql/contacts-by-site-id.graphql-gen'
import { SiteContacts } from '@core/sites/sites.model'
import { TranslocoService } from '@ngneat/transloco'
import { SetSiteContactsGQL } from './graphql/mutation/set-site-contacts.graphql-gen'
import { ContactsForm } from './site-settings-contacts-form.interface'

@Injectable()
export class SiteSettingsContactsService {
  private setSiteContactsGQL = inject(SetSiteContactsGQL)

  private siteId: string
  public loading: boolean
  private translocoService = inject(TranslocoService)
  private toastService = inject(ToasterService)

  public setSiteId(siteId: string): void {
    this.siteId = siteId
  }

  public setLoading(loading: boolean): void {
    this.loading = loading
  }

  public siteContactsMutationMapping = (
    siteContact: SiteContacts
  ): Pick<
    SiteContactsMutationDtoInput,
    Exclude<keyof SiteContactsMutationDtoInput, '__typename'>
  > => {
    const { ...rest } = siteContact

    const formattedSiteContacts: SiteContactsMutationDtoInput = {
      accountManagerContact: {
        show: rest.accountManagerContact.show,
        alternativeContactTitle:
          rest.accountManagerContact.alternativeContactTitle || ''
      },
      contractManagerContact: {
        alternativeContactTitle:
          rest.contractManagerContact.alternativeContactTitle || ''
      },
      itManagerContact: {
        show: rest.itManagerContact.show,
        alternativeContactTitle:
          rest.itManagerContact.alternativeContactTitle || ''
      },
      serviceDeskContact: {
        show: rest.serviceDeskContact.show,
        alternativeContactTitle:
          rest.serviceDeskContact.alternativeContactTitle || ''
      },
      sparePartsContact: {
        show: rest.sparePartsContact.show,
        alternativeContactTitle:
          rest.sparePartsContact.alternativeContactTitle || '',
        emailAddress: rest.sparePartsContact.emailAddress || ''
      },
      visitingOfficeContact: {
        show: rest.visitingOfficeContact.show,
        address: rest.visitingOfficeContact.address || '',
        email: rest.visitingOfficeContact.email || '',
        phoneNumber: rest.visitingOfficeContact.phoneNumber || '',
        alternativeContactTitle:
          rest.visitingOfficeContact.alternativeContactTitle || ''
      }
    }

    return formattedSiteContacts
  }

  /**
   * Sets the validation logic for each form group
   */
  public setSiteContactsFormGroupsValidations(
    form: ContactsForm,
    siteContacts: SiteContacts
  ): void {
    Object.keys(form.controls).forEach((key) => {
      const group = <FormGroup>form.get(key)
      let controls: string[]

      // Sets the controls you want to validate based on the group type
      switch (key) {
        case 'sparePartsContact':
          controls = ['emailAddress']
          break

        default:
          controls = []
          break
      }

      // Sets the validations based on the group type
      if (key === 'contractManagerContact') {
        this.setValidationsPerGroup(
          group,
          controls,
          !this.setIsReadOnlyField(siteContacts, 'contractManagerContact')
        )
      } else {
        form.get(`${key}.show`)?.valueChanges.subscribe((value: boolean) => {
          this.setValidationsPerGroup(
            group,
            controls,
            value &&
              !this.setIsReadOnlyField(
                siteContacts,
                key as
                  | 'contractManagerContact'
                  | 'accountManagerContact'
                  | 'itManagerContact'
                  | 'serviceDeskContact'
              )
          )
        })
      }
    })
  }

  /**
   * Sets field's is read only property based on contact isImported property
   * @param {'contractManagerContact' | 'accountManagerContact' | 'itManagerContact' | 'serviceDeskContact'} contact
   * @param {string} contactField
   * @returns {boolean}
   */
  private setIsReadOnlyField(
    siteContacts: SiteContacts,
    contact:
      | 'contractManagerContact'
      | 'accountManagerContact'
      | 'itManagerContact'
      | 'serviceDeskContact'
  ): boolean {
    return siteContacts ? !!siteContacts[contact] : false
  }

  /**
   * Sets validations per form group
   * @param {FormGroup} group
   * @param {string[]} controlNames
   * @param {boolean} hasValidations
   */
  public setValidationsPerGroup(
    group: FormGroup,
    controlNames: string[],
    hasValidations: boolean
  ): void {
    controlNames.forEach((controlName) => {
      if (hasValidations) {
        const validators = this.getValidators(controlName)
        if (
          group.controls[controlName] &&
          controlName !== 'phoneNumberOutsideWorkingHours'
        ) {
          group.controls[controlName].setValidators(validators)
        }
      } else {
        group.controls[controlName].clearValidators()
      }
      group.controls[controlName].markAsUntouched()
      group.controls[controlName].updateValueAndValidity()
    })
  }

  /**
   * Get Validators based on the control name
   */
  public getValidators(controlName: string): ValidatorFn[] {
    switch (controlName) {
      case 'emailAddress':
        return [Validators.required, Validators.email]
      case 'email':
        return [Validators.email]
      default:
        return [Validators.required]
    }
  }

  /**
   * Save site contatcs
   */
  public saveSiteContacts(
    form: ContactsForm,
    siteContacts: SiteContacts
  ): void {
    const mappedSiteContacts = this.siteContactsMutationMapping(siteContacts)

    const formattedSiteContacts = <SiteContactsMutationDtoInput>(
      Object.fromEntries(
        Object.entries(mappedSiteContacts)
          .filter(([key, _]) => key !== '__typename')
          .map(([key, value]) => {
            const updatedContactValue = this.getUpdatedContactValue(
              form,
              key,
              value
            )
            return [key, updatedContactValue]
          })
      )
    )

    this.setSiteContactsGQL
      .mutate(
        {
          siteId: this.siteId,
          siteContacts: formattedSiteContacts
        },
        {
          refetchQueries: [
            {
              query: ContactsBySiteIdDocument,
              variables: { siteId: this.siteId }
            }
          ]
        }
      )
      .subscribe({
        next: ({ data, loading }) => {
          this.loading = loading
          if (data?.editSiteContacts) {
            this.showSuccessToast()
          }
        },
        error: () => {
          this.showErrorToast()
          this.loading = false
        }
      })
  }

  /**
   * get updated contact value
   * @param {string} key
   * @param {ContractManagerContactInput | ItManagerContactInput | AccountManagerContactInput | VisitingOfficeContactInput | ServiceDeskContactInput | SparePartsContactInput | null} value
   */
  private getUpdatedContactValue(
    form: ContactsForm,
    key: string,
    value:
      | AccountManagerContactDtoInput
      | ContractManagerContactDtoInput
      | ItManagerContactMutationDtoInput
      | ServiceDeskContactMutationDtoInput
      | SparePartsContactInput
      | VisitingOfficeContactInput
  ) {
    const formGroup = <ContactsForm>form.get(key)

    if (!value && !formGroup) {
      return value
    }
    return Object.fromEntries(
      Object.entries(formGroup.controls).map(([key, value]) => {
        const formControl = formGroup.get(key) as
          | FormControl<string>
          | FormControl<boolean>
        return formControl ? [key, formControl.value] : [key, value]
      })
    )
  }

  /**
   * Show success toast
   */
  private showSuccessToast(): void {
    const message = this.translocoService.translate(
      'PortalGeneralSettings.SettingsSaveSuccessMsg'
    )
    const success = new Toast('success', message)
    this.toastService.addToast(success)
  }

  /**
   * Show error toast
   */
  private showErrorToast(): void {
    const message = this.translocoService.translate('General.ApiError')
    const error = new Toast('error', message)
    this.toastService.addToast(error)
  }
}
