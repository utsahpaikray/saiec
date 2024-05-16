import { CommonModule } from '@angular/common'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core'
import { DIALOG_DATA, DIALOG_REF } from '@core/dialog/dialog.service'
import { TranslocoModule } from '@ngneat/transloco'
import { LoadRemoteComponentDirective } from '@shared/directives/load-remote-component/loadRemoteComponent.directive'
import { SafeResourceUrlPipe } from '@shared/pipes/safe-pipe'

export enum MFEType {
  Anomalies = 'anomalies'
}

export interface MfePreviewVM {
  titleKey: string
  titleValue: string
  buttonKey: string
  mfe: {
    type: MFEType
    data: {
      startTime: number
      endTime: number
    }
  }
}

@Component({
  selector: 'app-mfe-preview',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    SafeResourceUrlPipe,
    LoadRemoteComponentDirective
  ],
  templateUrl: './mfe-preview.component.html',
  styleUrl: './mfe-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MfePreviewComponent {
  public dialogRef = inject(DIALOG_REF)
  public dialogData: MfePreviewVM = inject(DIALOG_DATA)
}
