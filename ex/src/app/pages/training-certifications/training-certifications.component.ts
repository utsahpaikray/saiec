import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ApolloQueryResult } from '@apollo/client/core'
import { forkJoin, map, Observable } from 'rxjs'
import {
  CertificationItemFragment,
  CertificationsGQL,
  CertificationsQuery
} from './graphql/cms-certifications.graphql-gen'
import {
  GenericCertificationsFragment,
  GenericCertificationsGQL,
  GenericCertificationsQuery
} from './graphql/cms-generic-certifications.graphql-gen'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

@Component({
  selector: 'app-training-certifications',
  templateUrl: './training-certifications.component.html'
})
export class TrainingCertificationsComponent implements OnInit {
  public genericCertifications:
    | GenericCertificationsFragment[]
    | undefined
    | null

  public certifications: CertificationItemFragment[] | undefined | null

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private certificationsGQL: CertificationsGQL,
    private genericCertificationsGQL: GenericCertificationsGQL
  ) {}

  public ngOnInit(): void {
    forkJoin([
      this.getGenericCertifications(),
      this.getCertifications()
    ]).subscribe(this.setPageData.bind(this))
  }

  /**
   * Get correct image url from certification
   * @param {CertificationItemFragment} certification
   * @returns {string | undefined}
   */
  public getImageUrl(
    certification: CertificationItemFragment
  ): string | undefined {
    return (
      certification?.certificationImageCollection?.items[0]?.url || undefined
    )
  }

  /**
   * Set page data
   */
  public setPageData([genericCertifications, certifications]: [
    GenericCertificationsFragment[],
    CertificationItemFragment[]
  ]): void {
    this.genericCertifications = genericCertifications
    this.certifications = certifications
    this.certifications.forEach((certification) => {
      documentToHtmlString(certification?.certificationInfo?.json)
    })
  }

  /**
   * Navigate to relative page based on clicked link
   */
  public goToRelativePage(link: string): void {
    this.router.navigate([`./${link}`], { relativeTo: this.activatedRoute })
  }

  /**
   * Navigate to request page
   */
  public goToRequestPage(): void {
    this.router.navigate([`./request`], { relativeTo: this.activatedRoute })
  }

  /**
   * Get generic page - certifications
   * @returns {Observable<GenericCertificationsFragment[]>}
   */
  private getGenericCertifications(): Observable<
    GenericCertificationsFragment[]
  > {
    return this.genericCertificationsGQL
      .fetch()
      .pipe(
        map(
          (result: ApolloQueryResult<GenericCertificationsQuery>) =>
            (result.data?.genericCollection
              ?.items as GenericCertificationsFragment[]) || []
        )
      )
  }

  /**
   * Get certifications
   * @returns {Observable<CertificationItemFragment[]>}
   */
  private getCertifications(): Observable<CertificationItemFragment[]> {
    return this.certificationsGQL
      .fetch()
      .pipe(
        map(
          (result: ApolloQueryResult<CertificationsQuery>) =>
            (result.data?.certificationPathCollection
              ?.items as CertificationItemFragment[]) || []
        )
      )
  }
}
