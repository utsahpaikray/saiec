import { CommonModule } from '@angular/common'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core'
import { DIALOG_DATA, DIALOG_REF } from '@core/dialog/dialog.service'
import { TranslocoModule } from '@ngneat/transloco'
import { Store } from '@ngrx/store'
import { SafeResourceUrlPipe } from '@shared/pipes/safe-pipe'
import { attachmentFeature } from '@stores/attachment/attachment.state'
import { filter, map } from 'rxjs'

export interface AttachmentPreviewVM {
  titleKey: string
  subTitleKey: string
  subTitleValue: string
  buttonKey: string
}

@Component({
  selector: 'app-preview-dialog',
  templateUrl: './attachment-preview.component.html',
  styleUrls: ['./attachment-preview.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslocoModule, SafeResourceUrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AttachmentPreviewComponent {
  public dialogRef = inject(DIALOG_REF)
  public dialogData: AttachmentPreviewVM = inject(DIALOG_DATA)

  private store = inject(Store)

  public attachmentPreview$ = this.store
    .select(attachmentFeature.selectAttachmentState)
    .pipe(
      filter(({ attachment, loading }) => !loading && !!attachment),
      map(({ attachment }) => attachment)
    )
}
