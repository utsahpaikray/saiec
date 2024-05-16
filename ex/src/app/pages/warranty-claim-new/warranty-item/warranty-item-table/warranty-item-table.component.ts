import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, inject } from '@angular/core'
import { Viewports } from '@core/interfaces/breakpoint.enum'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { WindowResizeService } from '@core/window-resize/window-resize.service'
import { WarrantyItem } from '@pages/warranty-claim-new/warranty-create-form.interface'
import { Observable, map } from 'rxjs'

@Component({
  selector: 'app-warranty-item-table',
  templateUrl: './warranty-item-table.component.html',
  standalone: true,
  imports: [CommonModule, TranslocoRootModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WarrantyItemTableComponent {
  @Input() itemDetails: Partial<WarrantyItem>

  private windowResizeService = inject(WindowResizeService)

  public headers: string[] = [
    'Asset.MarkCode',
    'Asset.MarkNumber',
    'Asset.AssetDescription',
    'General.ItemNumber',
    'General.ItemDescription',
    'General.Quantity',
    'WarrantyClaims.BreakdownDate',
    'Attachments.Title'
  ]

  public breakpoint$: Observable<Viewports> =
    this.windowResizeService.breakpoint$
  public viewports = Viewports

  public isTable$ = this.breakpoint$.pipe(
    map((breakpoint) => breakpoint === this.viewports.Desktop)
  )
}
