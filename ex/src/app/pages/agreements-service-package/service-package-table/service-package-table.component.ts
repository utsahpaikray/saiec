import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, inject } from '@angular/core'
import { Viewports } from '@core/interfaces/breakpoint.enum'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { WindowResizeService } from '@core/window-resize/window-resize.service'
import { TranslocoService } from '@ngneat/transloco'
import { Observable, map } from 'rxjs'
import { CONTRACTS_LINE_INFO_KEY } from '../agreements-table-header.model'
import { ContractLineInfoFragment } from '../graphql/site-agreements-contract-lines.graphql-gen'

@Component({
  selector: 'app-service-package-table',
  templateUrl: './service-package-table.component.html',
  standalone: true,
  imports: [CommonModule, TranslocoRootModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServicePackageTableComponent {
  @Input() contractLines: ContractLineInfoFragment[]

  private windowResizeService = inject(WindowResizeService)
  private translocoService = inject(TranslocoService)

  public headers: string[] = [
    CONTRACTS_LINE_INFO_KEY.MarkcodeOrSystem,
    CONTRACTS_LINE_INFO_KEY.StartAndEndDate,
    CONTRACTS_LINE_INFO_KEY.Availability,
    CONTRACTS_LINE_INFO_KEY.Parts,
    CONTRACTS_LINE_INFO_KEY.Labour,
    CONTRACTS_LINE_INFO_KEY.Calendar,
    CONTRACTS_LINE_INFO_KEY.ByPhone,
    CONTRACTS_LINE_INFO_KEY.OnSite,
    CONTRACTS_LINE_INFO_KEY.Visits,
    CONTRACTS_LINE_INFO_KEY.ManpowerDaysPerVisit
  ]

  public breakpoint$: Observable<Viewports> =
    this.windowResizeService.breakpoint$
  public viewports = Viewports

  public isTable$ = this.breakpoint$.pipe(
    map((breakpoint) => breakpoint === this.viewports.Desktop)
  )

  /**
   * Set correct title for the contract line
   * @returns {string}
   */
  public setContractLineTitle(contractLine: ContractLineInfoFragment) {
    const systemComponent = contractLine.systemComponent || {}
    const {
      system,
      assetType,
      assetTypeDescription,
      markCode,
      markCodeDescription
    } = systemComponent

    const conditions = [
      {
        condition: system,
        value: this.translocoService.translate('Contracts.WholeSystem')
      },
      {
        condition: assetType && assetTypeDescription,
        value: `${assetType} (${assetTypeDescription})`
      },
      { condition: assetType, value: assetType },
      {
        condition: markCode && markCodeDescription,
        value: `${markCode} (${markCodeDescription})`
      },
      { condition: markCode, value: markCode },
      { condition: true, value: '-' }
    ]

    const { value } = conditions.find(({ condition }) => condition)!
    return value
  }

  /**
   * Rounds a given number to two decimal houses (x.xx)
   * @param {number} value
   * @returns {string}
   */
  public roundValueToTwoDecimals(value: number): string {
    return (Math.round(value * 100) / 100).toFixed(2)
  }
}
