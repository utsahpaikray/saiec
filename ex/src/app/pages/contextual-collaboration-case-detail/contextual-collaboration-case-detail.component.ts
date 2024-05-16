import { CommonModule } from '@angular/common'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewContainerRef,
  inject
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { DialogService } from '@core/dialog/dialog.service'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import {
  AssetDetailsModalComponent,
  AssetDetailsModalVM
} from '@shared/components/asset-details-modal/asset-details-modal.component'
import {
  AttachmentPreviewComponent,
  AttachmentPreviewVM
} from '@shared/components/attachment-preview/attachment-preview.component'
import {
  AttachmentComponent,
  AttachmentVariant
} from '@shared/components/attachment/attachment.component'
import {
  ConfirmationModalComponent,
  ConfirmationModalVM
} from '@shared/components/confirmation-modal/confirmation-modal.component'
import { CrumbtrailComponent } from '@shared/components/crumbtrail/crumbtrail.component'
import { FileUploadComponent } from '@shared/components/form-controls/file-upload/file-upload.component'
import { FormPageComponent } from '@shared/components/form-page/form-page.component'
import { MessageBoxComponent } from '@shared/components/messaging/message-box/message-box.component'
import { MessageComponent } from '@shared/components/messaging/message/message.component'
import {
  MfePreviewComponent,
  MfePreviewVM
} from '@shared/components/mfe-preview/mfe-preview.component'
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component'
import { LoadRemoteComponentDirective } from '@shared/directives/load-remote-component/loadRemoteComponent.directive'
import { StatusDirective } from '@shared/directives/status/status.directive'
import { AttachmentStoreModule } from '@stores/attachment/attachment.module'
import { CasesStoreModule } from '@stores/cases/cases.module'
import { filter, map, shareReplay, switchMap } from 'rxjs'
import {
  AttachmentType,
  CaseConfirmationType,
  ContextualCollaborationCaseDetailVM
} from './contextual-collaboration-case-detail.interface'
import { ContextualCollaborationCaseDetailService } from './contextual-collaboration-case-detail.service'

@Component({
  selector: 'app-contextual-collaboration-case-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormPageComponent,
    TranslocoRootModule,
    FileUploadComponent,
    CasesStoreModule,
    RouterModule,
    PageHeaderComponent,
    CrumbtrailComponent,
    StatusDirective,
    MessageBoxComponent,
    MessageComponent,
    AttachmentStoreModule,
    AttachmentPreviewComponent,
    LoadRemoteComponentDirective,
    AttachmentComponent,
    AssetDetailsModalComponent
  ],
  templateUrl: './contextual-collaboration-case-detail.component.html',
  styleUrls: ['./contextual-collaboration-case-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContextualCollaborationCaseDetailComponent {
  public AttachmentVariant = AttachmentVariant
  private route = inject(ActivatedRoute)
  public dialogService = inject(DialogService)
  public viewContainerRef = inject(ViewContainerRef)
  private contextualCollaborationCaseDetailService = inject(
    ContextualCollaborationCaseDetailService
  )

  private destroy$ = inject(DestroyRef)

  public caseId$ = this.route.params.pipe(
    map((params) => params.caseId),
    shareReplay(1),
    takeUntilDestroyed()
  )
  public vm$ = this.caseId$.pipe(
    switchMap((caseId) =>
      this.contextualCollaborationCaseDetailService.getVM$(caseId)
    ),
    takeUntilDestroyed(),
    shareReplay(1)
  )

  public addMessage =
    this.contextualCollaborationCaseDetailService.addMessage.bind(
      this.contextualCollaborationCaseDetailService
    )
  public addAttachment =
    this.contextualCollaborationCaseDetailService.addAttachment.bind(
      this.contextualCollaborationCaseDetailService
    )

  public openConfirmationModal(
    vm: ConfirmationModalVM,
    confirmationType: CaseConfirmationType,
    caseId: string
  ) {
    const dialogRef = this.dialogService.create<ConfirmationModalVM, boolean>(
      this.viewContainerRef,
      vm,
      ConfirmationModalComponent
    )

    dialogRef.result$
      .pipe(takeUntilDestroyed(this.destroy$), filter(Boolean))
      .subscribe({
        next: () => {
          switch (confirmationType) {
            case CaseConfirmationType.ToReject:
              return this.contextualCollaborationCaseDetailService.rejectCase(
                caseId
              )
            case CaseConfirmationType.ToClose:
              return this.contextualCollaborationCaseDetailService.closeCase(
                caseId
              )
            case CaseConfirmationType.ToInprogress:
              return this.contextualCollaborationCaseDetailService.inProgressCase(
                caseId
              )
            case CaseConfirmationType.CreateWorkOrder:
              return this.contextualCollaborationCaseDetailService.createWorkOrder(
                caseId
              )
          }
        },
        complete: () => dialogRef.close(false)
      })
  }

  public CaseConfirmationType = CaseConfirmationType

  public AttachmentType = AttachmentType

  protected openAttachmentPreviewDialog(
    vm: ContextualCollaborationCaseDetailVM['attachmentPreviewVM'],
    subTitleValue: string,
    attachmentId: string
  ) {
    this.contextualCollaborationCaseDetailService.fetchAttachment(attachmentId)
    return this.dialogService.create<AttachmentPreviewVM>(
      this.viewContainerRef,
      { ...vm, subTitleValue },
      AttachmentPreviewComponent
    )
  }

  protected openMfePreviewDialog(
    partialVM: ContextualCollaborationCaseDetailVM['mfePreviewVM'],
    mfe: MfePreviewVM['mfe'],
    titleValue: string
  ) {
    return this.dialogService.create<MfePreviewVM>(
      this.viewContainerRef,
      Object.assign(partialVM, { mfe, titleValue }),
      MfePreviewComponent
    )
  }

  public downloadAttachment(event: MouseEvent, attachmentId: string) {
    event.stopPropagation()
    this.contextualCollaborationCaseDetailService.downloadAttachment(
      attachmentId
    )
  }

  protected openAssetDetailsModal(
    vm: ContextualCollaborationCaseDetailVM['assetDetailsModalVM']
  ) {
    this.contextualCollaborationCaseDetailService.fetchAssetFromAssetId(
      vm.assetIdValue
    )
    return this.dialogService.create<AssetDetailsModalVM>(
      this.viewContainerRef,
      vm,
      AssetDetailsModalComponent
    )
  }
}
