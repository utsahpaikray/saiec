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
import { CopyToClipBoardModule } from '@shared/directives/copy-to-clipboard/copy-to-clipboard.module'
import { maximoAssetsFeature } from '@stores/maximo-assets/maximo-assets.state'
import { filter, map } from 'rxjs'

export interface AssetDetailsModalVM {
  titleKey: string
  subTitleValue: string
  assetIdKey: string
  assetIdValue: string
  markCodeKey: string
  markNumberKey: string
  descriptionKey: string
}

@Component({
  selector: 'app-asset-details-modal',
  standalone: true,
  imports: [CommonModule, TranslocoModule, CopyToClipBoardModule],
  templateUrl: './asset-details-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssetDetailsModalComponent {
  public dialogRef = inject(DIALOG_REF)
  public dialogData: AssetDetailsModalVM = inject(DIALOG_DATA)

  private store = inject(Store)

  public asset$ = this.store.select(
    maximoAssetsFeature.selectCurrentMaximoAssetNotLoading
  )

  // Close the dialog if the asset is not found
  public fetchAssetFailed$ = this.asset$.pipe(
    filter((asset) => asset === null),
    map(() => this.dialogRef.close(false))
  )
}
