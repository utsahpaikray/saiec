import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  OnInit,
  ViewChild
} from '@angular/core'
import { CommonModule, TitleCasePipe } from '@angular/common'
import { LinkModule } from '@components/link/link.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { TranslocoService } from '@ngneat/transloco'
import {
  Asset,
  Comment,
  File,
  DocumentInput,
  Scalars,
  Ticket,
  WebLink
} from '@core/generated/types'
import { ActivatedRoute, Params } from '@angular/router'
import { combineLatest, map, Observable, of, switchMap, take, tap } from 'rxjs'

import { ApolloQueryResult } from '@apollo/client/core'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { SectionAsideRightModule } from '@features/layouts/section-aside-right/section-aside-right.module'
import { ExpansionPanelModule } from '@components/expansion-panel/expansion-panel.module'
import { AngularSvgIconModule } from 'angular-svg-icon'
import {
  SiteTicketAssetBySystemComponentIdGQL,
  SiteTicketAssetBySystemComponentIdQuery
} from './graphql/site-ticket-asset-by-component-id.graphql-gen'
import { ticketDetail, TicketInfo, ticketInfoPanel } from './ticket.model'
import { Toast } from '@components/toaster/toast/toast.model'
import { ToasterService } from '@components/toaster/toaster.service'
import { DocumentDownloadService } from '@core/document-download/document-download.service'
import { CardModule } from '@components/card/card.module'
import { MaximoAccessService } from '@core/maximo-access/maximo-access.service'
import { SortByPipeModule } from '@core/pipes/sort-by.module'
import {
  TicketCommentsGQL,
  TicketCommentsQuery
} from './graphql/ticket-comments.graphql-gen'
import { AddAttachmentModalComponent } from '@features/add-attachment-modal/add-attachment-modal.component'
import { AddCommentToTicketGQL } from './graphql/mutation/add-comment-to-ticket.graphql-gen'
import { AddDocumentToTicketGQL } from './graphql/mutation/add-document-to-ticket.graphql-gen'
import { ModalService } from '@components/modal/modal.service'

import { Alert } from '@components/alert/alert.model'
import { AlertModule } from '@components/alert/alert.module'
import { DocumentListComponent } from './document-list/document-list.component'
import {
  TicketFilesGQL,
  TicketFilesQuery
} from './graphql/ticket-files.graphql-gen'
import {
  TicketByIdDocument,
  TicketByIdGQL,
  TicketByIdQuery
} from './graphql/ticket-by-id.graphql-gen'
import {
  TicketWebLinksGQL,
  TicketWebLinksQuery
} from './graphql/ticket-web-links.graphql-gen'
import { TicketCommentFormComponent } from './ticket-comment-form/ticket-comment-form.component'
import { CustomerSatisfactionComponent } from './customer-satisfaction/customer-satisfaction.component'
import { ServiceDeskLangCodes } from '@core/interfaces/service-desk-lang-codes.enum'
import {
  SiteTicketLanguageCodeGQL,
  SiteTicketLanguageCodeQuery
} from './graphql/site-ticket-language-code.graphql-gen'
import { environment } from '@environments/environment'

@Component({
  selector: 'app-ticket',
  standalone: true,
  templateUrl: './ticket.component.html',
  imports: [
    CommonModule,
    LinkModule,
    TranslocoRootModule,
    ProgressSpinnerModule,
    SectionAsideRightModule,
    ExpansionPanelModule,
    AngularSvgIconModule,
    CardModule,
    SortByPipeModule,
    AddAttachmentModalComponent,
    AlertModule,
    DocumentListComponent,
    TicketCommentFormComponent,
    CustomerSatisfactionComponent
  ],
  providers: [DocumentDownloadService, TitleCasePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketComponent implements OnInit {
  @ViewChild('uploadAttachment') uploadRef: ElementRef
  private titleCasePipe = inject(TitleCasePipe)

  public siteId: Scalars['UUID']
  public loading: boolean
  public ticket: Ticket | null
  public ticketId: Scalars['String']
  public ticketDetails: ticketDetail[] = []
  public ticketInfoPanels: ticketInfoPanel[] = []
  public ticketAsset: Asset | null
  public ticketResolutionAlert?: Alert
  public serviceDeskLangCode: ServiceDeskLangCodes = ServiceDeskLangCodes.EN

  public ticketComments: Comment[]
  public hasMoreComments: boolean
  public commentsEndCursor: string | null
  public loadingMoreComments: boolean
  public savingComment: boolean

  public ticketFiles: File[]
  public hasMoreFiles: boolean
  public filesEndCursor: string | null
  public loadingMoreFiles: boolean

  public ticketWebLinks: WebLink[]
  public hasMoreWebLinks: boolean
  public webLinksEndCursor: string | null
  public loadingMoreWebLinks: boolean
  public resetForm: boolean

  public document?: DocumentInput
  public uploadingFile: boolean

  public readonly ticketInfo = TicketInfo

  constructor(
    private activatedRoute: ActivatedRoute,
    private translocoService: TranslocoService,
    private ticketByIdGQL: TicketByIdGQL,
    private siteTicketLanguageCodeGQL: SiteTicketLanguageCodeGQL,
    private ticketCommentsGQL: TicketCommentsGQL,
    private ticketFilesGQL: TicketFilesGQL,
    private ticketWebLinksGQL: TicketWebLinksGQL,
    private siteTicketAssetBySystemComponentIdGQL: SiteTicketAssetBySystemComponentIdGQL,
    private addCommentToTicketGQL: AddCommentToTicketGQL,
    private addDocumentToTicketGQL: AddDocumentToTicketGQL,
    private toastService: ToasterService,
    private maximoAccessService: MaximoAccessService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loading = true
    this.activatedRoute.params
      .pipe(
        take(1),
        tap((params: Params) => {
          this.ticketId = params.ticketId
          this.siteId = params.siteId
        }),
        switchMap(() => {
          return combineLatest([
            this.getTicket(this.ticketId),
            this.getSiteTicketLanguageCode(this.siteId)
          ])
        }),
        tap(([ticket, languageCode]) => {
          if (!ticket) return

          this.ticket = ticket
          this.serviceDeskLangCode =
            ServiceDeskLangCodes[
              languageCode as keyof typeof ServiceDeskLangCodes
            ]

          // comments
          this.ticketComments = (ticket.comments?.nodes as Comment[]) || []
          this.hasMoreComments = ticket.comments?.pageInfo.hasNextPage || false
          this.commentsEndCursor = ticket.comments?.pageInfo.endCursor || ''
          // files
          this.ticketFiles = (ticket.files?.nodes as File[]) || []
          this.hasMoreFiles = ticket.files?.pageInfo.hasNextPage || false
          this.filesEndCursor = ticket.files?.pageInfo.endCursor || ''
          // weblinks
          this.ticketWebLinks = (ticket.webLinks?.nodes as WebLink[]) || []
          this.hasMoreWebLinks = ticket.webLinks?.pageInfo.hasNextPage || false
          this.webLinksEndCursor = ticket.webLinks?.pageInfo.endCursor || ''

          this.setTicketResolutionAlert()
          this.setTicketInfoPanels()
          !this.ticket?.systemComponentId && this.setTicketDetails()
        }),
        switchMap(() =>
          this.ticket?.systemComponentId
            ? this.getAssetSearchResult(this.ticket?.systemComponentId)
            : of({
                data: null,
                loading: false
              })
        )
      )
      .subscribe({
        next: ({ data, loading }) => {
          this.loading = loading

          if (
            this.ticket?.systemComponentId &&
            data?.assetBySystemComponentId
          ) {
            this.ticketAsset = data.assetBySystemComponentId as Asset
            this.setTicketDetails()
          }
        },
        error: () => {
          this.ticket = null
          this.ticketAsset = null
          this.loading = false
          this.showErrorToast()
        }
      })
  }

  /**
   * Get ticket query result by ticket id
   * @param {string} ticketId
   * @returns {Observable<Ticket>}
   */
  private getTicket(ticketId: string): Observable<Ticket> {
    return this.ticketByIdGQL.fetch({ id: ticketId }).pipe(
      map((result: ApolloQueryResult<TicketByIdQuery>) => {
        return result.data?.ticket as Ticket
      })
    )
  }

  /**
   * Run query to get site ticket language code for the siteId specified
   * @returns { Observable<string>}
   */
  private getSiteTicketLanguageCode(siteId: string): Observable<string> {
    return this.siteTicketLanguageCodeGQL
      .fetch({
        siteId
      })
      .pipe(
        map((result: ApolloQueryResult<SiteTicketLanguageCodeQuery>) => {
          return result.data?.ticketingSiteInfo.languageCode as string
        })
      )
  }

  /**
   * Query to get ticket comments
   * @param {number} first
   * @returns {Observable<ApolloQueryResult<TicketCommentsQuery>>}
   */
  private getComments(
    first?: number
  ): Observable<ApolloQueryResult<TicketCommentsQuery>> {
    return this.ticketCommentsGQL.watch(
      {
        id: this.ticketId,
        commentsFirst: first,
        commentsCursor: this.commentsEndCursor
      },
      { fetchPolicy: 'no-cache', useInitialLoading: true }
    ).valueChanges
  }

  /**
   * Load more comments for the ticket log
   */
  public loadMoreComments(): void {
    this.getComments().subscribe({
      next: ({ data, loading }) => {
        this.loadingMoreComments = loading

        if (data?.ticket?.comments?.nodes) {
          this.ticketComments = [
            ...this.ticketComments,
            ...data?.ticket.comments?.nodes
          ]
        }

        this.hasMoreComments =
          data?.ticket?.comments?.pageInfo?.hasNextPage || false
        this.commentsEndCursor =
          data?.ticket?.comments?.pageInfo?.endCursor || ''
      },
      error: () => {
        this.loadingMoreComments = false
        this.showErrorToast()
      }
    })
  }

  /**
   * Mutation to add comment to the ticket communication log
   * @param {string} title
   * @param {string} message
   */
  public addCommentToTicket(formData: {
    title: string
    message: string
  }): void {
    this.savingComment = true
    this.addCommentToTicketGQL
      .mutate(
        {
          id: this.ticketId,
          description: formData.title,
          longDescription: formData.message
        },
        {
          refetchQueries: [
            {
              query: TicketByIdDocument,
              variables: { id: this.ticketId, first: 4 }
            }
          ]
        }
      )
      .subscribe({
        next: ({ data }) => {
          if (data?.addCommentToTicket) {
            this.commentsEndCursor = null

            this.getComments(this.ticketComments.length + 1).subscribe({
              next: ({ data, loading }) => {
                this.savingComment = loading

                if (data?.ticket?.comments?.nodes) {
                  this.ticketComments = data.ticket.comments.nodes

                  // Clean the form
                  this.resetForm = true
                }

                this.hasMoreComments =
                  data?.ticket?.comments?.pageInfo?.hasNextPage || false
                this.commentsEndCursor =
                  data?.ticket?.comments?.pageInfo?.endCursor || ''
              },
              error: () => {
                this.showErrorToast()
              }
            })
          }
        },
        error: () => {
          this.savingComment = false
          this.showErrorToast()
        }
      })
  }

  /**
   * Run query for asset search
   * @param {string} systemComponentId
   * @returns { Observable<ApolloQueryResult<SiteTicketAssetSearchQuery>>}
   */
  private getAssetSearchResult(
    systemComponentId: string
  ): Observable<ApolloQueryResult<SiteTicketAssetBySystemComponentIdQuery>> {
    return this.siteTicketAssetBySystemComponentIdGQL.watch(
      {
        siteId: this.siteId,
        systemComponentId
      },
      { useInitialLoading: true }
    ).valueChanges
  }

  /**
   * Set ticket subtitle
   * @returns {boolean}
   */
  public hasWritePermissionsAndIsNotClosed(): boolean {
    return (
      this.ticket?.sourceState !== 'Closed' &&
      this.maximoAccessService.canWriteTickets
    )
  }

  /**
   * Replace <br> in the descripton for \n
   * @returns {string}
   */
  public formattedDescription(): string {
    return this.ticket?.description?.replace(/<br\s*\/?>/gm, '\n') || ''
  }

  /**
   * Get ticket information expansion panels
   * @returns {ticketInfoPanel[]}
   */
  private getTicketInfoPanels(): ticketInfoPanel[] {
    return [
      {
        type: TicketInfo.Description,
        label: 'General.Description',
        isOpen: true
      },
      {
        type: TicketInfo.Details,
        label: 'Tickets.Details',
        isOpen: false
      },
      {
        type: TicketInfo.Files,
        label: 'Attachments.Title',
        total: `(${this.ticket?.files?.totalCount || 0})`,
        isOpen: false
      },
      {
        type: TicketInfo.Weblinks,
        label: 'Tickets.Links.Title',
        total: `(${this.ticket?.webLinks?.totalCount || 0})`,
        isOpen: false
      }
    ]
  }

  /**
   * Set ticket information expansion panels
   */
  public setTicketInfoPanels(): void {
    this.additemToArray(
      this.getTicketInfoPanels(),
      'type',
      this.ticketInfoPanels
    )
  }

  /**
   * Get formatted ticket details
   * @returns {{ translation: string; information: string }[]}
   */
  private getTicketDetails(): { label: string; information: string }[] {
    const formaatedIssueType = this.titleCasePipe.transform(
      this.ticket?.issueType
    )

    return [
      {
        label: 'General.Type',
        information: `${this.translocoService.translate(
          `Tickets.IssueType.${formaatedIssueType}.Label`
        )}`
      },
      {
        label: 'Tickets.ReportedOn.Label',
        information: this.ticket?.reportDate
      },
      {
        label: 'General.Status',
        information: this.ticket?.sourceState
      },
      {
        label: 'Asset.AffectedAsset',
        information:
          this.ticketAsset &&
          `${this.ticketAsset.markCode} ${this.ticketAsset.markNumber} - ${this.ticketAsset.description}`
      },
      {
        label: 'Tickets.ReferenceNumber.Title',
        information: this.ticket?.customerReference
      }
    ]
  }

  /**
   * Set data inside ticket details expansion panel
   */
  public setTicketDetails(): void {
    this.additemToArray(
      this.getTicketDetails(),
      'information',
      this.ticketDetails
    )
  }

  /**
   * Add item to array to item label
   * @param {any[]} arrayToLoop
   * @param {string} key
   * @param {any[]} arrayToPush
   */
  private additemToArray(
    arrayToLoop: any[],
    key: string,
    arrayToPush: any[]
  ): void {
    arrayToLoop.forEach((item) => {
      item[key] && arrayToPush.push(item)
    })
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
   * Toggle expansion panel visibility based on panel's index
   * @param {boolean} Event
   * @param {ExpansionPanelIndex} number
   */
  public onToggle(event: boolean, expansionPanelIndex: number) {
    this.ticketInfoPanels[expansionPanelIndex].isOpen = event
  }

  /**
   * Run mutation to upload document in the ticket
   * @param {DocumentInput} document
   */
  public addDocumentToTicket(document: DocumentInput) {
    this.uploadingFile = true
    this.addDocumentToTicketGQL
      .mutate(
        {
          ticketId: this.ticketId,
          document
        },
        {
          refetchQueries: [
            {
              query: TicketByIdDocument,
              variables: { id: this.ticketId }
            }
          ]
        }
      )
      .subscribe({
        next: ({ data, loading }) => {
          if (data?.addDocumentToTicket) {
            this.filesEndCursor = null

            this.getFiles(this.ticketFiles.length + 1).subscribe({
              next: ({ data }) => {
                if (!data) return

                this.ticketFiles = data.ticket?.files?.nodes as File[]

                this.ticketInfoPanels.forEach((item) => {
                  if (item.type == TicketInfo.Files)
                    item.total = `(${data.ticket?.files?.totalCount || 0})`
                })

                this.hasMoreFiles =
                  data.ticket?.files?.pageInfo?.hasNextPage || false
                this.filesEndCursor =
                  data.ticket?.files?.pageInfo?.endCursor || ''
                this.uploadingFile = loading
                this.closeModal()
              },
              error: () => {
                this.uploadingFile = false
                this.closeModal()
              }
            })
          }
        },
        error: () => {
          this.uploadingFile = false
          this.closeModal()
          this.showErrorToast()
        }
      })
  }

  /**
   * Run ticket files query with dynamic 'first' property
   * @param {number | undefined} first
   * @returns { Observable<ApolloQueryResult<TicketFilesQuery>> }
   */
  public getFiles(
    first?: number
  ): Observable<ApolloQueryResult<TicketFilesQuery>> {
    return this.ticketFilesGQL.watch(
      {
        id: this.ticketId,
        filesFirst: first,
        filesCursor: this.filesEndCursor
      },
      { fetchPolicy: 'no-cache', useInitialLoading: true }
    ).valueChanges
  }

  /**
   * Run ticket weblinks query with dynamic 'first' property
   * @param {number} first
   * @returns { Observable<ApolloQueryResult<TicketWebLinksQuery>> }
   */
  public getWebLinks(
    first?: number
  ): Observable<ApolloQueryResult<TicketWebLinksQuery>> {
    return this.ticketWebLinksGQL.watch(
      {
        id: this.ticketId,
        webLinksFirst: first,
        webLinksCursor: this.webLinksEndCursor
      },
      { fetchPolicy: 'no-cache', useInitialLoading: true }
    ).valueChanges
  }

  /**
   * Load more files related to the actual ticket
   */
  public loadMoreFiles(): void {
    this.getFiles().subscribe({
      next: ({ data, loading }) => {
        this.loadingMoreFiles = loading

        if (data?.ticket?.files?.nodes) {
          this.ticketFiles = [
            ...this.ticketFiles,
            ...(data?.ticket.files?.nodes as File[])
          ]
        }

        this.hasMoreFiles = data?.ticket?.files?.pageInfo?.hasNextPage || false
        this.filesEndCursor = data?.ticket?.files?.pageInfo?.endCursor || ''
      },
      error: () => {
        this.loadingMoreFiles = false
        this.showErrorToast()
      }
    })
  }

  /**
   * Load more weblinks related to the actual ticket
   */
  public loadMoreWebLinks(): void {
    this.getWebLinks().subscribe({
      next: ({ data, loading }) => {
        this.loadingMoreWebLinks = loading

        if (data?.ticket?.webLinks?.nodes) {
          this.ticketWebLinks = [
            ...this.ticketWebLinks,
            ...(data?.ticket.webLinks?.nodes as WebLink[])
          ]
        }

        this.hasMoreWebLinks =
          data?.ticket?.webLinks?.pageInfo?.hasNextPage || false
        this.webLinksEndCursor =
          data?.ticket?.webLinks?.pageInfo?.endCursor || ''
      },
      error: () => {
        this.loadingMoreWebLinks = false
        this.showErrorToast()
      }
    })
  }

  /**
   * Set ticket resolution alert based on the ticket state
   */
  public setTicketResolutionAlert(): void {
    if (
      !this.ticket?.symptom &&
      !this.ticket?.analysis &&
      !this.ticket?.solution
    )
      return

    let resolution = ''

    if (this.ticket.symptom) {
      resolution += `<div>${this.ticket.symptom}</div>`
    }

    if (this.ticket.analysis) {
      resolution += resolution
        ? `<br><div>${this.ticket.analysis}</div>`
        : `<div>${this.ticket.analysis}</div>`
    }

    if (this.ticket.solution) {
      resolution += resolution
        ? `<br><div>${this.ticket.solution}</div>`
        : `<div>${this.ticket.solution}</div>`
    }

    this.ticketResolutionAlert = this.resolvedState
      ? new Alert('success', resolution)
      : new Alert('information', resolution)
  }

  /**
   * Close add attachment modal when document was uploaded
   */
  public closeModal(): void {
    this.modalService.close('add-attachment')
  }

  /**
   * Set and open maximo satisfaction survey url based on customer satisfication and maximo service desk language code
   */
  public goToSatisfactionSurvey(satisfaction: string): void {
    if (!this.ticket || this.serviceDeskLangCode === ServiceDeskLangCodes.FR)
      return

    const sidLanguage =
      this.serviceDeskLangCode === ServiceDeskLangCodes.EN
        ? 'EN'
        : `CSAT_${this.serviceDeskLangCode.slice(-2)}`
    const sidSatisfied =
      this.serviceDeskLangCode === ServiceDeskLangCodes.EN ? 'SATISF' : 'SA'
    const sidNeutral =
      this.serviceDeskLangCode === ServiceDeskLangCodes.EN ? 'NEUTRAL' : 'NE'
    const sidDissatisfied =
      this.serviceDeskLangCode === ServiceDeskLangCodes.EN ? 'DISSAT' : 'DI'

    let sidSatisfaction
    switch (satisfaction) {
      case 'happy':
        sidSatisfaction = sidSatisfied
        break
      case 'neutral':
        sidSatisfaction = sidNeutral
        break
      case 'sad':
        sidSatisfaction = sidDissatisfied
        break
      default:
        sidSatisfaction = ''
    }

    const maximoSatisfactionSurveyURL = `${environment.maximoSatisfactionSurveyUrl}&sid=${sidLanguage}_${sidSatisfaction}&recordclass=SR&recordkey=${this.ticket.id}&`
    window.open(maximoSatisfactionSurveyURL, '_blank')
  }

  /**
   * Check if ticket is in resolved state
   */
  public get resolvedState(): boolean {
    return this.ticket?.sourceState === 'Resolved'
  }

  /**
   * Show customer satisfaction when service desk language codes is not in French
   */
  public get showCustomerSatisfaction(): boolean {
    return this.serviceDeskLangCode !== ServiceDeskLangCodes.FR
  }
}
