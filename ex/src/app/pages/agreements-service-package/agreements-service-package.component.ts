import { CommonModule } from '@angular/common'
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit
} from '@angular/core'
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { ApolloQueryResult } from '@apollo/client/core'
import { ActiveSiteAgreementModule } from '@components/active-site-agreement/active-site-agreement.module'
import { LinkModule } from '@components/link/link.module'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { Scalars } from '@core/generated/types'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { map, Observable, switchMap, take, tap } from 'rxjs'
import {
  ServicePackageBySlugGQL,
  ServicePackageBySlugQuery,
  ServicePackageTitleAndCodesFragment
} from '../agreements-service-package/graphql/cms-service-package.graphql-gen'

import {
  ContractLineInfoFragment,
  SiteAgreementsContractLinesGQL,
  SiteAgreementsContractLinesQuery
} from './graphql/site-agreements-contract-lines.graphql-gen'
import { ServicePackageTableComponent } from './service-package-table/service-package-table.component'

type Asset = ContractLineInfoFragment & {
  systemComponent: {
    markCode: string
  }
}

type System = ContractLineInfoFragment & {
  systemComponent: {
    system: string
  }
}

@Component({
  standalone: true,
  selector: 'app-agreements-service-package',
  templateUrl: './agreements-service-package.component.html',
  imports: [
    CommonModule,
    RouterModule,
    ProgressSpinnerModule,
    ActiveSiteAgreementModule,
    TranslocoRootModule,
    LinkModule,
    ServicePackageTableComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgreementsServicePackageComponent implements OnInit {
  private siteId: Scalars['UUID']
  public servicePackage: ServicePackageTitleAndCodesFragment
  public contractLines: ContractLineInfoFragment[]
  public loading: boolean

  private activatedRoute = inject(ActivatedRoute)
  private servicePackageBySlugGQL = inject(ServicePackageBySlugGQL)
  private siteAgreementsContractLinesGQL = inject(
    SiteAgreementsContractLinesGQL
  )

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        take(1),
        tap((params: Params) => {
          this.loading = true
          this.siteId = params.siteId
        }),
        switchMap((params: Params) =>
          this.getServicePackage(params.servicePackageSlug)
        ),
        tap(
          (servicePackage: ServicePackageTitleAndCodesFragment) =>
            (this.servicePackage = servicePackage)
        ),
        switchMap((service: ServicePackageTitleAndCodesFragment) => {
          const codes =
            service?.codes?.filter((code): code is string => !!code) || []

          return this.siteAgreementsContractLines(codes)
        })
      )
      .subscribe({
        next: ({ data, loading }) => {
          this.loading = loading
          this.contractLines = data?.agreements?.length
            ? this.groupContractLinesBySystemComponent(
                data.agreements[0].contractLines
              )
            : []
        },
        error: () => {
          this.loading = false
          this.contractLines = []
        }
      })
  }

  /**
   * Run query for site contract
   * @param {string[]} packageCodes
   * @returns {Observable<ApolloQueryResult<SiteAgreementsContractLinesQuery>>}
   */
  private siteAgreementsContractLines(
    packageCodes: string[]
  ): Observable<ApolloQueryResult<SiteAgreementsContractLinesQuery>> {
    return this.siteAgreementsContractLinesGQL.watch(
      {
        siteId: this.siteId,
        currentDate: new Date(),
        packageCodes
      },
      { useInitialLoading: true }
    ).valueChanges
  }

  /**
   * Run query for service package
   * @param {string} slug
   * @returns {Observable<ServicePackageTitleAndCodesFragment>}
   */
  private getServicePackage(
    slug: string
  ): Observable<ServicePackageTitleAndCodesFragment> {
    return this.servicePackageBySlugGQL
      .fetch({
        slug
      })
      .pipe(
        map(
          (result: ApolloQueryResult<ServicePackageBySlugQuery>) =>
            (result.data.servicePackageCollection
              ?.items[0] as ServicePackageTitleAndCodesFragment) || {}
        )
      )
  }

  /**
   * Merge contract lines by packageCode & related system components
   * @param {ContractLineInfoFragment[]} contractLines
   * @returns {ContractLineInfoFragment[]}
   */
  private groupContractLinesBySystemComponent(
    contractLines: ContractLineInfoFragment[]
  ) {
    const getAssetKey = (entry: Asset) =>
      `${entry.packageCode}-${entry.systemComponent.markCode}`
    const getSystemKey = (entry: System) =>
      `${entry.packageCode}-${entry.systemComponent.system}`
    const isAsset = (entry: any): entry is Asset =>
      entry.systemComponent?.markCode
    const isSystem = (entry: any): entry is System =>
      entry.systemComponent?.system

    const groupByKey = (
      items: (Asset | System)[]
    ): Record<string, (Asset | System)[]> => {
      return items.reduce<Record<string, (Asset | System)[]>>((acc, entry) => {
        const key = isAsset(entry)
          ? getAssetKey(entry)
          : isSystem(entry)
          ? getSystemKey(entry)
          : null
        if (!key) return acc

        const list = acc[key]
        ;(list || []).push(entry)
        return acc
      }, {})
    }

    const merge = (items: (Asset | System)[]) => ({
      ...items[0],
      startDate: items.reduce(
        (acc, entry) =>
          acc < new Date(entry.startDate).getTime()
            ? acc
            : new Date(entry.startDate).getTime(),
        Infinity
      ),
      endDate: items.reduce(
        (acc, entry) =>
          acc > new Date(entry.endDate).getTime()
            ? acc
            : new Date(entry.endDate).getTime(),
        -Infinity
      ),
      vidays: items.reduce((acc, entry) => acc + (entry.vidays || 0), 0),
      subcdays: items.reduce((acc, entry) => acc + (entry.subcdays || 0), 0),
      yearvisits: items.reduce((acc, entry) => acc + (entry.yearvisits || 0), 0)
    })

    const assets = contractLines.filter(isAsset)
    const systems = contractLines.filter(isSystem)

    const groupedAssets = Object.values(groupByKey(assets))
    const groupedSystems = Object.values(groupByKey(systems))
    const otherEntries = contractLines.filter(
      (contractLine) => !isAsset(contractLine) || !isSystem(contractLine)
    )

    return [
      ...groupedAssets.map(merge),
      ...groupedSystems.map(merge),
      ...otherEntries
    ]
  }
}
