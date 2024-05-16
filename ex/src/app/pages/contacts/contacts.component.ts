import { Component, inject, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { ApolloQueryResult } from '@apollo/client/core'
import { CurrentUserService } from '@core/current-user/current-user.service'
import { SiteContacts } from '@core/sites/sites.model'
import { SitesService } from '@core/sites/sites.service'
import { Store } from '@ngrx/store'
import applicationActions from '@stores/application/application.actions'
import { Applications } from '@stores/application/interfaces/application.interface'
import { map, Observable, Subject, switchMap, takeUntil } from 'rxjs'
import { Contact } from './contacts.model'
import {
  UserSiteContactGQL,
  UserSiteContactQuery
} from './graphql/user-site-contacts.graphql-gen'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  public contacts: Contact[]
  private unsubscribe$: Subject<void> = new Subject<void>()

  private activatedRoute = inject(ActivatedRoute)
  private currentUserService = inject(CurrentUserService)
  private userSiteContactGQL = inject(UserSiteContactGQL)
  private sitesService = inject(SitesService)
  private store = inject(Store)

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((params: Params) => {
          if (
            this.currentUserService.isSuperUser ||
            this.currentUserService.isPortalAdmin
          ) {
            return this.sitesService.getSiteContacts(params.siteId)
          }
          return this.getUserSiteContacts(params.siteId)
        })
      )
      .subscribe(this.setSiteContactsData.bind(this))

    this.store.dispatch(
      applicationActions.updateCurrentApplication({
        application: Applications.Contacts
      })
    )
  }

  /**
   * Set site contacts data
   */
  private setSiteContactsData(siteContacts: SiteContacts) {
    let originalContactsArray = []
    originalContactsArray = Object.entries(siteContacts)
      .filter(([key, value]: [string, any]) => {
        const isContractManagerOrIsVisible =
          value.show || key === 'contractManagerContact'
        const hasContent = !!(
          value.name ||
          value.email ||
          value.emailAddress ||
          value.phoneNumber ||
          value.address
        )

        return (
          key !== '__typename' &&
          value !== null &&
          isContractManagerOrIsVisible &&
          hasContent
        )
      })
      .map(([key, value]) => {
        const formattedKey = this.convertCamelCaseTextToTranslocoFormat(key)
        return {
          id: key
            .split(/(?=[A-Z])/)
            .join('-')
            .toLowerCase(),
          title: `Contacts.${formattedKey}`,
          iconName: this.setIconName(key),
          ...value
        }
      })

    // rearrange order of contacts array to show contract manager contact first
    this.contacts =
      originalContactsArray.length > 0
        ? this.moveElementsInArray(
            'Contacts.ContractManagerContact',
            originalContactsArray,
            'title'
          )
        : []
  }

  /**
   * Move elements in array based on key
   */
  private moveElementsInArray(option: any, originalArray: any, key: string) {
    const newArray = originalArray.slice()
    newArray.unshift(
      newArray.splice(
        newArray.findIndex((elt: any) => elt[key] === option),
        1
      )[0]
    )
    return newArray
  }

  /**
   * Convert camel case text to key format used in transloco file
   */
  private convertCamelCaseTextToTranslocoFormat(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  /**
   * set icon name based on contact job title
   * @param {string} contactJobTitle
   * @returns {string}
   */
  private setIconName(contactJobTitle: string): string {
    switch (contactJobTitle) {
      case 'serviceDeskContact':
        return 'users'
      case 'sparePartsContact':
        return 'mail'
      case 'visitingOfficeContact':
        return 'portal'
      default:
        return ''
    }
  }

  /**
   * Get site contacts data from user
   * @param {string} siteId
   * @returns {Observable<SiteContactQuery>}
   */
  private getUserSiteContacts(siteId: string): Observable<SiteContacts> {
    return this.userSiteContactGQL
      .fetch(
        {
          siteId
        },
        { fetchPolicy: 'no-cache' }
      )
      .pipe(
        map(
          (result: ApolloQueryResult<UserSiteContactQuery>) =>
            result.data.me?.relatedPortalData?.sites[0] as SiteContacts
        )
      )
  }
}
