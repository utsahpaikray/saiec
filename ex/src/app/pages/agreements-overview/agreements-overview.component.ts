import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { ApolloQueryResult } from '@apollo/client/core'
import { map, Observable, switchMap, take, tap } from 'rxjs'
import { BuildingBlock } from './building-block.interface'
import { ServicePackage } from './service-package.interface'

import {
  ServicePackageFragment,
  ServicePackageGQL,
  ServicePackageQuery
} from '../agreements-overview/graphql/cms-service-package.graphql-gen'

import { Services } from './services.interface'
import {
  SiteAgreementFragment,
  SiteAgreementsGQL,
  SiteAgreementsQuery
} from '../agreements-overview/graphql/site-agreements.graphql-gen'

@Component({
  selector: 'app-agreements-overview',
  templateUrl: './agreements-overview.component.html',
  styleUrls: ['./agreements-overview.component.scss']
})
export class AgreementsOverviewComponent implements OnInit {
  public agreements: SiteAgreementFragment[]
  public services: Services[]
  public loading: boolean

  constructor(
    private activatedRoute: ActivatedRoute,
    private siteAgreementsGQL: SiteAgreementsGQL,
    private servicePackageGQL: ServicePackageGQL
  ) {}

  /**
   * On init get the all services for this site
   */
  public ngOnInit(): void {
    this.loading = true
    this.activatedRoute.params
      .pipe(
        take(1),
        switchMap((params: Params) => this.getSiteAgreements(params.siteId)),
        tap(
          (agreements: SiteAgreementFragment[]) =>
            (this.agreements = agreements)
        ),
        switchMap(() => {
          const packageCodes =
            this.agreements[0].contractLines.map(
              (contractLine) => contractLine.packageCode || ''
            ) || []

          return this.getServiceDataByPackageCodes(packageCodes)
        })
      )
      .subscribe({
        next: ({ data, loading }) => {
          const groupedByServicePackage = this.groupObjectByKey(
            (data?.servicePackageCollection
              ?.items as ServicePackageFragment[]) || [],
            'buildingBlock.serviceSolution.serviceType.title'
          )
          this.services = Object.entries(groupedByServicePackage).map(
            ([serviceType, buildingBlocks]: [string, any]) => {
              // Group all items in service package by building block
              const groupedBuildBlocks = this.groupObjectByKey(
                buildingBlocks,
                'buildingBlock.title'
              )
              return {
                serviceType,
                buildingBlocks: this.transformBuildingBlocks(groupedBuildBlocks)
              }
            }
          )
          this.loading = loading
        },
        error: () => {
          this.services = []
          this.loading = false
        }
      })
  }

  /**
   * Run query for service data from cms based on site contract's package codes
   * @returns {Observable<ApolloQueryResult<ServicePackageQuery>>}
   */
  private getServiceDataByPackageCodes(
    packageCodes: string[]
  ): Observable<ApolloQueryResult<ServicePackageQuery>> {
    return this.servicePackageGQL.watch(
      {
        packageCodes
      },
      { useInitialLoading: true }
    ).valueChanges
  }

  /**
   * Run query for site agreements
   * @returns {Observable<SiteAgreementFragment>}
   */
  private getSiteAgreements(
    siteId: string
  ): Observable<SiteAgreementFragment[]> {
    return this.siteAgreementsGQL
      .fetch({
        siteId,
        currentDate: new Date()
      })
      .pipe(
        map(
          (result: ApolloQueryResult<SiteAgreementsQuery>) =>
            result.data.agreements
        )
      )
  }

  /**
   * Group array of objects by a grouping key
   * @param {any[]} arr - Array of objects
   * @param {string} groupingKey - Dot notation property. Can be a nested property name: 'example.nested.nested1'
   * @returns {ServicePackageFragment[]}
   */
  private groupObjectByKey(arr: any[], groupingKey: string): any[] {
    return arr.reduce((r, a) => {
      const groupingValue = groupingKey.split('.').reduce((a, b) => a[b], a)
      r[groupingValue] = r[groupingValue] || []
      r[groupingValue].push(a)
      return r
    }, {})
  }

  /**
   * Transform service package fragement to building block package item
   * @param {ServicePackageFragment} buildingBlock
   * @returns {BuildingBlock[]}
   */
  private transformBuildingBlocks(
    buildingBlocks: ServicePackageFragment[]
  ): BuildingBlock[] {
    return Object.entries(buildingBlocks).map(
      ([buildingBlockTitle, buildingBlockItems]: [string, any]) => {
        return {
          buildingBlockTitle,
          servicePackages: buildingBlockItems.map(
            this.transformBuildingBlockItems.bind(this)
          )
        }
      }
    )
  }

  /**
   * Transform service package fragement to building block package item
   * @param {ServicePackageFragment} buildingBlock
   * @returns {BuildingBlockPackage}
   */
  private transformBuildingBlockItems(
    buildingBlock: ServicePackageFragment
  ): ServicePackage {
    return {
      codes: buildingBlock.codes || [],
      packageTitle: buildingBlock.title || '',
      slug: buildingBlock.slug
    }
  }
}
