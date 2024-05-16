import { inject, Injectable } from '@angular/core'
import { Viewports } from '@core/interfaces/breakpoint.enum'
import { WindowResizeService } from '@core/window-resize/window-resize.service'
import { Store } from '@ngrx/store'
import { TagStatus } from '@shared/directives/status/status.directive'
import casesActions from '@stores/cases/cases.actions'
import { casesFeature } from '@stores/cases/cases.state'
import { EventSources, Status } from '@stores/cases/interfaces/state.interface'
import { siteDetailFeature } from '@stores/site-details/site-detail.state'
import { combineLatest, filter, map } from 'rxjs'
import { CaseOverviewVM } from './contextual-collaboration-case-overview.component'

const mapStatusLabel = (status: Status) =>
  ({
    [Status.Open]: 'ContextualCollaboration.CaseOverview.Status.Open',
    [Status.Closed]: 'ContextualCollaboration.CaseOverview.Status.Closed',
    [Status.InProgress]:
      'ContextualCollaboration.CaseOverview.Status.InProgress',
    [Status.Rejected]: 'ContextualCollaboration.CaseOverview.Status.Rejected'
  })[status] || ''

const mapEventSource = (eventSource: string) =>
  ({
    [EventSources.Monitron]:
      'ContextualCollaboration.CaseOverview.EventSource.Monitron',
    [EventSources.ShuttleHealth]:
      'ContextualCollaboration.CaseOverview.EventSource.ShuttleHealth',
    [EventSources.DivertHealth]:
      'ContextualCollaboration.CaseOverview.EventSource.DivertHealth',
    [EventSources.OperationalAwareness]:
      'ContextualCollaboration.CaseOverview.EventSource.OperationalAwareness'
  })[eventSource] || ''

export const mapStatusToTagStatus = (status: Status) =>
  ({
    [Status.Open]: TagStatus.action,
    [Status.InProgress]: TagStatus.warning,
    [Status.Closed]: TagStatus.success,
    [Status.Rejected]: TagStatus.error
  })[status]

@Injectable({
  providedIn: 'root'
})
export class ContextualCollaborationCasesService {
  private windowResizeService = inject(WindowResizeService)

  private store = inject(Store)

  public isDesktop$ = this.windowResizeService.breakpoint$.pipe(
    map((breakpoint) => breakpoint === Viewports.Desktop)
  )

  private cases$ = this.store.select(casesFeature.selectCases)

  public casesLoading$ = this.store.select(casesFeature.selectLoading)

  public casesHasNextPage$ = this.store.select(casesFeature.selectHasNextPage)

  public casesEndCursor$ = this.store
    .select(casesFeature.selectPageInfo)
    .pipe(map((pageInfo) => pageInfo.endCursor))

  public siteId$ = this.store
    .select(siteDetailFeature.selectSiteId)
    .pipe(filter(Boolean))

  public getCaseOverviewVM$() {
    return combineLatest([
      this.cases$,
      this.isDesktop$,
      this.casesLoading$,
      this.casesHasNextPage$,
      this.siteId$,
      this.casesEndCursor$
    ]).pipe(
      map(
        ([
          cases,
          isDesktop,
          loading,
          hasNextPage,
          siteId,
          endCursor
        ]): CaseOverviewVM => ({
          caseTableVM: {
            headers: {
              eventSource:
                'ContextualCollaboration.CaseOverview.CaseTable.Headers.EventSource',
              summary:
                'ContextualCollaboration.CaseOverview.CaseTable.Headers.Summary',
              caseNumber:
                'ContextualCollaboration.CaseOverview.CaseTable.Headers.CaseNumber',
              lastUpdated:
                'ContextualCollaboration.CaseOverview.CaseTable.Headers.LastUpdated',
              status:
                'ContextualCollaboration.CaseOverview.CaseTable.Headers.Status',
              workOrderID:
                'ContextualCollaboration.CaseOverview.CaseTable.Headers.WorkorderID'
            },
            body:
              cases.map((c) => ({
                caseNumber: c.id,
                eventSource: mapEventSource(c.eventSource),
                summary: c.title,
                lastUpdated: c.lastUpdatedAt,
                lastUpdatedKey:
                  'ContextualCollaboration.CaseOverview.LastUpdated',
                status: mapStatusLabel(c.status), // it first maps the status to the VM label context and then to the translation key
                workOrderID: c.workOrderNumber || '',
                routerLink: [c.id],
                tag: mapStatusToTagStatus(c.status)
              })) || [],
            isDesktop: isDesktop,
            lastUpdatedTranslationKey:
              'ContextualCollaboration.CaseOverview.LastUpdated'
          },
          loading: loading || false,
          hasNextPage: hasNextPage || false,
          siteId: siteId,
          endCursor: endCursor
        })
      )
    )
  }

  public loadMoreCases(siteId: string, endCursor?: string) {
    this.store.dispatch(casesActions.loadMoreCases({ siteId, endCursor }))
  }
}
