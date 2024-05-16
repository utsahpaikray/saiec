import { inject, Injectable } from '@angular/core'
import { SelectAssetDialogComponent } from '@features/select-asset-dialog/select-asset-dialog.component'
import { Store } from '@ngrx/store'
import { Asset } from '@shared/components/form-controls/asset-selector/interfaces/asset.interface'
import { AddDescriptionDialogComponent } from '@shared/components/form-controls/file-upload/add-description-dialog/add-description-dialog.component'
import casesActions from '@stores/cases/cases.actions'
import { casesFeature } from '@stores/cases/cases.state'
import maximoContactsActions from '@stores/maximoContacts/maximo-contacts.actions'
import { maximoContactFeature } from '@stores/maximoContacts/maximo-contacts.state'
import {
  combineLatest,
  filter,
  map,
  NEVER,
  Observable,
  shareReplay,
  switchMap,
  take
} from 'rxjs'
import {
  CasesWorkOrder,
  EventSources,
  ManualCase,
  NewCaseFormVM
} from './components/new-case-form/new-case-form.interface'

const eventSourceToTranslocoKeyMap = (eventSource: EventSources): string =>
  ({
    [EventSources.Monitron]:
      'SiteAdminGeneralSettings.GeneralSettingOverview.configs.Cases.EventSources.Types.Monitron',
    [EventSources.ShuttleHealth]:
      'SiteAdminGeneralSettings.GeneralSettingOverview.configs.Cases.EventSources.Types.ShuttleHealth',
    [EventSources.DivertHealth]:
      'SiteAdminGeneralSettings.GeneralSettingOverview.configs.Cases.EventSources.Types.DivertHealth',
    [EventSources.OperationalAwareness]:
      'SiteAdminGeneralSettings.GeneralSettingOverview.configs.Cases.EventSources.Types.OperationalAwareness'
  })[eventSource] ?? ''

const mapStringToEventSource = (value: string) =>
  ({
    [EventSources.Monitron]: EventSources.Monitron,
    [EventSources.ShuttleHealth]: EventSources.ShuttleHealth,
    [EventSources.DivertHealth]: EventSources.DivertHealth,
    [EventSources.OperationalAwareness]: EventSources.OperationalAwareness
  })[value] ?? EventSources.Monitron // default is just for type safety and should never be used

const mapCasesWorkOrder = (): CasesWorkOrder[] =>
  Object.values(EventSources).map((eventSource) => ({
    name: eventSourceToTranslocoKeyMap(eventSource),
    value: eventSource
  }))

const mapAssetSystemComponentId = (asset: Asset | undefined) => {
  return asset?.systemComponentId
}

@Injectable({
  providedIn: 'root'
})
export class ContextualCollaborationNewCaseService {
  private store = inject(Store)

  public getNewCaseFormVM$(siteId$: Observable<string>) {
    return combineLatest([
      siteId$.pipe(filter((siteId) => !!siteId)),
      this.store.select(maximoContactFeature.selectSiteId),
      this.store
        .select(maximoContactFeature.selectLoading)
        .pipe(filter((loading) => !loading))
    ]).pipe(
      switchMap(([siteId, currentlyLoadedSiteId]) => {
        if (siteId === currentlyLoadedSiteId) {
          return this.store.select(maximoContactFeature.selectContacts)
        }
        this.store.dispatch(maximoContactsActions.getSiteContacts({ siteId }))
        return NEVER
      }),
      map(
        (contacts): NewCaseFormVM => ({
          fileInputVM: {
            modalComponent: AddDescriptionDialogComponent,
            modalComponentVM: {
              labels: {
                TITLE: 'AddFileDescriptionDialog.Title',
                SUBMIT: 'AddFileDescriptionDialog.Submit',
                CANCEL: 'AddFileDescriptionDialog.Cancel',
                FORM_TITLE: 'AddFileDescriptionDialog.Form.Title',
                FORM_EXPLANATION: 'AddFileDescriptionDialog.Form.Explanation',
                ITEM_EYEBROW: 'AddFileDescriptionDialog.Item.Eyebrow',
                ITEM_PLACEHOLDER: 'AddFileDescriptionDialog.Item.Placeholder'
              }
            },
            files: [],
            disabled: false,
            labels: {
              ADD_ATTACHMENT:
                'ContextualCollaboration.NewCase.Attachments.AddAttachment',
              EYEBROW: 'ContextualCollaboration.NewCase.Attachments.Eyebrow',
              EMPTY_STATE_TITLE:
                'ContextualCollaboration.NewCase.Attachments.Emptystate.Title',
              EMPTY_STATE_EXPLANATION:
                'ContextualCollaboration.NewCase.Attachments.Emptystate.Explanation'
            }
          },
          eventSourceSelectorVM: {
            items: mapCasesWorkOrder()
          },
          contactSelectorVM: {
            items: contacts || []
          },
          assetSelectorVM: {
            /** @TODO Refactor asset selector modal */
            modalComponent: SelectAssetDialogComponent,
            modalComponentVM: {
              siteId$
            }
          }
        })
      ),
      shareReplay(1)
    )
  }

  public submitNewCaseForm(manualCase: ManualCase, siteId: string) {
    this.store.dispatch(
      casesActions.createManualCase({
        manualCase: {
          title: manualCase.title,
          description: manualCase.description,
          siteId: siteId,
          assetSystemComponentId: mapAssetSystemComponentId(manualCase.asset),
          eventSource: mapStringToEventSource(manualCase.eventSource.value),
          contact: manualCase.contact,
          attachments: manualCase.attachments
            ?.filter(
              (
                attachment
              ): attachment is {
                name: string
                description: string
                fileHandler: File
              } =>
                !!attachment.fileHandler &&
                !!attachment.name &&
                !!attachment.description
            )
            .map((attachment) => ({
              name: attachment.name,
              description: attachment.description,
              file: attachment.fileHandler
            }))
        }
      })
    )
    return this.store.select(casesFeature.selectCasesState).pipe(
      filter((state) => !state.loading),
      take(1),
      map((state) => state.error ?? state.currentCase?.id)
    )
  }
}
