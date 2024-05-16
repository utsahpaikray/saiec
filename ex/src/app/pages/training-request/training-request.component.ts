import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { TranslocoService } from '@ngneat/transloco'
import { first, Observable, Subject, switchMap, take, tap } from 'rxjs'

import { DropdownItem } from '@components/dropdown/dropdown-item.model'
import { Toast } from '@components/toaster/toast/toast.model'
import { ToasterService } from '@components/toaster/toaster.service'
import { CurrentUserService } from '@core/current-user/current-user.service'
import { TrainingLocations } from '@core/interfaces/training-locations.enum'
import { atLeastOneCheckboxCheckedValidator } from '@core/validators/at-least-one-checkbox-checked-validator'
import {
  Scalars,
  TrainingRequestInput,
  TrainingRequestParticipantInput
} from '@core/generated/types'
import { RequestTrainingGQL } from './graphql/mutation/request-training.graphql-gen'
import { TrainingRequest } from './training-request.interface'
import {
  SiteByIdContractManagerGQL,
  SiteByIdContractManagerQuery
} from './graphql/site-by-id-contract-manager.graphql-gen'
import { ApolloQueryResult } from '@apollo/client/core'
import { Alert } from '@components/alert/alert.model'
import {
  UserSiteContractManagerGQL,
  UserSiteContractManagerQuery
} from './graphql/user-site-contract-manager.graphql-gen'
import {
  ParticipantsGroup,
  RequestParticipantsGroup,
  RequestTopicsGroup,
  RequestTypesGroup,
  TrainingRequestForm
} from './training-request-form.interface'
import { AppRouteSegments } from 'src/app/app-route-segments.enum'
import { PortalRouteSegments } from '@pages/portal/portal-route-segments.enum'
import { SiteRouteSegments } from '@pages/site/site-route-segments.enum'

@Component({
  selector: 'app-training-request',
  templateUrl: './training-request.component.html'
})
export class TrainingRequestComponent implements OnInit, OnDestroy {
  public form: TrainingRequestForm
  public userName?: string
  public certificationPaths: DropdownItem[] = []
  public trainingLocations: TrainingLocations[] =
    Object.values(TrainingLocations)
  public trainingRequest: TrainingRequestInput
  public siteId: Scalars['UUID']
  public hasContractManager: boolean
  public loading: boolean
  public requestTrainingLoading: boolean

  public noContractManagerAlert = new Alert(
    'error',
    this.translocoService.translate(
      'TrainingRequest.NoSiteContracManager.ErrorText'
    )
  )

  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(
    private currentUserService: CurrentUserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToasterService,
    private translocoService: TranslocoService,
    private requestTrainingGQL: RequestTrainingGQL,
    private siteByIdContractManagerGQL: SiteByIdContractManagerGQL,
    private userSiteContractManagerGQL: UserSiteContractManagerGQL,
    private formBuilder: FormBuilder
  ) {
    this.initializeForm()
  }

  /**
   * get user name on init and set it in training request form for read only field
   */
  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        take(1),
        tap((params: Params) => (this.siteId = params.siteId)),
        switchMap(() => {
          if (this.isSuperUserOrPortalAdmin) {
            return this.getSiteContractManager()
          }
          return this.getUserSiteContractManager()
        })
      )
      .subscribe({
        next: ({ data, loading }) => {
          let contractManagerEmailAddress: string | null | undefined
          if (this.isSuperUserOrPortalAdmin) {
            data = data as SiteByIdContractManagerQuery
            contractManagerEmailAddress =
              data?.sites[0].contractManagerContact.emailAddress
          } else {
            data = data as UserSiteContractManagerQuery
            contractManagerEmailAddress =
              data?.me.relatedPortalData?.sites[0].contractManagerContact
                .emailAddress
          }
          this.hasContractManager = contractManagerEmailAddress ? true : false
          this.loading = loading
        },
        error: () => {
          this.hasContractManager = false
        }
      })

    this.currentUserService.userData$.pipe(first()).subscribe((userData) => {
      if (userData?.me && userData.me.firstName && userData.me.lastName) {
        this.userName = `${userData.me.firstName} ${userData.me.lastName}`
        this.form.patchValue({
          requesterName: this.userName,
          requesterEmail: userData.me.customerEmail || userData.me.email || ''
        })
      }
    })

    this.onTrainingLocationChanges()
  }

  /**
   * Clean up subscriptions on component destroy
   */
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  /**
   * Initiialize training request form
   */
  private initializeForm(): void {
    this.form = this.formBuilder.nonNullable.group(
      {
        requestTypes: this.formBuilder.nonNullable.group(
          {
            training: false,
            certification: false
          },
          { validators: atLeastOneCheckboxCheckedValidator }
        ),
        requestTopics: this.formBuilder.nonNullable.group({
          topics: [
            '',
            { updateOn: 'change', validators: [Validators.required] }
          ],
          trainings: this.formBuilder.nonNullable.group(
            {},
            {
              validators: atLeastOneCheckboxCheckedValidator
            }
          )
        }),
        remarks: '',
        previousTraining: '',
        preferredDates: '',
        preferredTrainingLocationGroup: this.formBuilder.group(
          {
            preferredTrainingLocation: '',
            preferredLocation: ''
          },
          { updateOn: 'change' }
        ),
        requestParticipants: this.formBuilder.nonNullable.group({
          participants: this.formBuilder.array<ParticipantsGroup>([]),
          participantLocation: ''
        }),
        contact: '',
        requesterName: ['', { validators: [Validators.required] }],
        requesterTitle: '',
        requesterEmail: [
          '',
          {
            validators: [Validators.required, Validators.email]
          }
        ]
      },
      { updateOn: 'submit' }
    ) as TrainingRequestForm
  }

  /**
   * watch value change of training location to reset preferred location field
   */
  private onTrainingLocationChanges(): void {
    this.preferredTrainingLocation?.valueChanges.subscribe((val) => {
      if (val === this.trainingLocations[0]) {
        this.preferredLocation?.reset()
      }
    })
  }

  /**
   * format training request for mutation
   */
  public formatTrainingRequest(trainingRequest: TrainingRequest) {
    // remove radio buttons group and set each fields individually
    trainingRequest.preferredLocation =
      trainingRequest.preferredTrainingLocationGroup?.preferredLocation
    trainingRequest.preferredTrainingLocation =
      trainingRequest.preferredTrainingLocationGroup?.preferredTrainingLocation
    delete trainingRequest.preferredTrainingLocationGroup

    // update requestTypes
    const filteredRequestTypes = this.capitalizeWords(
      this.filterObjectKeyBasedOnObjectValue(trainingRequest['requestTypes'])
    )
    trainingRequest.requestTypes = filteredRequestTypes

    // update trainings
    const filteredTrainings = this.filterObjectKeyBasedOnObjectValue(
      trainingRequest.requestTopics?.trainings
    )

    trainingRequest.topics = trainingRequest.requestTopics?.topics || ''
    trainingRequest.trainings = filteredTrainings
    delete trainingRequest.requestTopics

    // remove empty participants
    if (!trainingRequest.requestParticipants?.participants) return

    trainingRequest.participants =
      trainingRequest.requestParticipants.participants.filter(
        (participant: TrainingRequestParticipantInput) =>
          Object.values(participant).some((value) => value !== '')
      )
    trainingRequest.participantLocation =
      trainingRequest.requestParticipants.participantLocation
    delete trainingRequest.requestParticipants
  }

  /**
   * filter object key based on object values
   * @param {any} objValues
   * @returns {filteredKeysArray}
   */
  private filterObjectKeyBasedOnObjectValue(objValues: unknown) {
    const filteredKeysArray: string[] = []
    if (objValues instanceof Object) {
      Object.entries(objValues).map(([key, value]) => {
        if (value) {
          filteredKeysArray.push(key)
        }
      })
    }
    return filteredKeysArray
  }

  /**
   * captialize first letter of word in an array
   * @param {any} array
   * @returns {string}
   */
  private capitalizeWords(array: string[]) {
    return array.map((element: string) => {
      return element.charAt(0).toUpperCase() + element.substring(1)
    })
  }

  /**
   * show success message, reset form and redirect user to training overview page after form is sent
   */
  public onSubmit(): void {
    if (!this.form.valid) return

    // copy the form object and assign to a new object to format to what's accepted in server
    this.trainingRequest = Object.assign(
      {},
      this.form.value as TrainingRequestInput
    )
    this.formatTrainingRequest(this.trainingRequest)

    this.requestTraining()
  }

  /**
   * Run mutation to add user to my vanderlande
   * @returns {Observable<Mutation>}
   */
  public requestTraining() {
    this.requestTrainingGQL
      .mutate({
        siteId: this.siteId,
        trainingRequest: this.trainingRequest
      })
      .subscribe({
        next: ({ data, loading }) => {
          this.requestTrainingLoading = loading
          if (data?.requestTraining) {
            this.showSuccessMessage()
            this.resetForm()
            this.goToTrainingOverviewPage()
          }
        },
        error: () => {
          this.requestTrainingLoading = false
          this.showErrorToast()
        }
      })
  }

  /**
   * Run query to get contract manager for the siteId specified
   * @returns { Observable<ApolloQueryResult<SiteByIdContractManagerQuery>>}
   */
  public getSiteContractManager(): Observable<
    ApolloQueryResult<SiteByIdContractManagerQuery>
  > {
    return this.siteByIdContractManagerGQL.watch(
      {
        siteId: this.siteId
      },
      { useInitialLoading: true }
    ).valueChanges
  }

  /**
   * Get site contacts data from user
   * @returns {Observable<ApolloQueryResult<UserSiteContractManagerQuery>>}
   */
  private getUserSiteContractManager(): Observable<
    ApolloQueryResult<UserSiteContractManagerQuery>
  > {
    return this.userSiteContractManagerGQL.watch(
      {
        siteId: this.siteId
      },
      { useInitialLoading: true }
    ).valueChanges
  }

  /**
   * Check if current user is portal admin or super user
   * @returns {boolean}
   */
  private get isSuperUserOrPortalAdmin(): boolean {
    return (
      this.currentUserService.isSuperUser ||
      this.currentUserService.isPortalAdmin
    )
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
   * show success message on toast component
   */
  private showSuccessMessage(): void {
    const message = this.translocoService.translate('General.SuccessMessage')
    const success = new Toast('success', message)
    this.toastService.addToast(success)
  }

  /**
   * reset form
   */
  private resetForm(): void {
    this.form.reset()
  }

  /**
   * redirect to training overview page
   */
  private goToTrainingOverviewPage(): void {
    this.activatedRoute.paramMap.pipe(first()).subscribe((params: Params) => {
      const siteId = params.get('siteId')
      const portalId = params.get('portalId')
      this.router.navigate([
        '/',
        AppRouteSegments.Portals,
        portalId,
        PortalRouteSegments.Sites,
        siteId,
        SiteRouteSegments.Training
      ])
    })
  }

  /**
   * Check if form control input is valid
   * @param {AbstractControl} input
   * @returns {boolean}
   */
  public isInvalid(input: AbstractControl | null): boolean {
    if (!input) return false
    return input.invalid && input.touched
  }

  /**
   * Get checkbox form group
   * @returns {FormGroup}
   */
  public get requestTypes(): RequestTypesGroup {
    return this.form.get('requestTypes') as RequestTypesGroup
  }

  /**
   * Get training location form control
   * @returns {FormControl}
   */
  public get preferredTrainingLocation(): FormControl<string> {
    return this.form.get(
      'preferredTrainingLocationGroup.preferredTrainingLocation'
    ) as FormControl<string>
  }

  /**
   * Get preferred location form control
   * @returns {FormControl}
   */
  public get preferredLocation(): FormControl<string> {
    return this.form.get(
      'preferredTrainingLocationGroup.preferredLocation'
    ) as FormControl<string>
  }

  /**
   * Get requester name form control
   * @returns {FormControl}
   */
  public get requesterName(): FormControl<string> {
    return this.form.get('requesterName') as FormControl<string>
  }

  /**
   * Get requester email form control
   * @returns {FormControl}
   */
  public get requesterEmail(): FormControl<string> {
    return this.form.get('requesterEmail') as FormControl<string>
  }

  /**
   * Get requester topics form group
   * @returns {FormGroup}
   */
  public get requestTopics(): RequestTopicsGroup {
    return this.form.get('requestTopics') as RequestTopicsGroup
  }

  /**
   * Get requester participants form group
   * @returns {FormGroup}
   */
  public get requestParticipants(): RequestParticipantsGroup {
    return this.form.get('requestParticipants') as RequestParticipantsGroup
  }
}
