import { Component, Input, inject } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router'
import {
  Observable,
  combineLatest,
  filter,
  map,
  startWith,
  switchMap,
  withLatestFrom
} from 'rxjs'

import { DropdownItem } from '@components/dropdown/dropdown-item.model'
import { CmsTrainingService } from '@core/cms-training-assortments/cms-training.service'
import {
  AssortedTrainingItemByCertificationPathFragment,
  CertificationPathWithAssortedTrainingFragment
} from '@core/cms-training-assortments/graphql/cms-assorted-trainings-by-certification-path.graphql-gen'
import { Segment } from '@core/generated/types'
import { SitesService } from '@core/sites/sites.service'
import { getKeyByStringValue } from '@core/utility/utility'
import { RequestTopicsGroup } from '../../training-request-form.interface'

@Component({
  selector: 'app-training-request-topic-selector',
  templateUrl: './training-request-topic-selector.component.html'
})
export class TrainingRequestTopicSelectorComponent {
  @Input() formGroup: RequestTopicsGroup

  private activatedRoute = inject(ActivatedRoute)
  private sitesService = inject(SitesService)
  private cmsTrainingService = inject(CmsTrainingService)

  private readonly params$: Observable<Params> =
    this.activatedRoute.params.pipe(
      map((params: Params) => params),
      filter(Boolean)
    )

  private readonly siteProjectsSegment$: Observable<Segment> =
    this.params$.pipe(
      switchMap(
        (params: Params): Observable<Segment> =>
          this.sitesService
            .getSiteProjectsSegmentBasedOnRole(params.siteId)
            .pipe(
              map((segment) => getKeyByStringValue(segment, Segment)),
              filter((segment): segment is Segment => !!segment)
            )
      )
    )

  private readonly assortedTrainingIds$: Observable<string[]> =
    this.siteProjectsSegment$.pipe(
      switchMap(
        (segment: Segment): Observable<string[]> =>
          this.cmsTrainingService.getAssortedTrainingIds(segment)
      )
    )

  public certificationPathsDropdownItems$: Observable<DropdownItem[]> =
    this.cmsTrainingService.getCertificationPaths().pipe(
      map((certificationPathCollection) => {
        return certificationPathCollection.items.map(
          (certificationPathItem) =>
            new DropdownItem(
              certificationPathItem?.sys?.id || '',
              certificationPathItem?.title || ''
            )
        )
      })
    )

  private readonly topicInitialValue$: Observable<string> = this.params$.pipe(
    map((params) => {
      this.topics.setValue(params.certificateId)
      return this.topics.value
    })
  )

  public selectedCertificationPath$: Observable<CertificationPathWithAssortedTrainingFragment> =
    this.topicInitialValue$.pipe(
      switchMap(() =>
        combineLatest([
          this.topics.valueChanges.pipe(startWith(this.topics.value)),
          this.assortedTrainingIds$
        ])
      ),
      switchMap(
        ([
          certificateId,
          assortedTrainingIds
        ]): Observable<CertificationPathWithAssortedTrainingFragment> =>
          this.cmsTrainingService
            .getCertificationPathAndAssortedTrainings(
              certificateId,
              assortedTrainingIds
            )
            .pipe(
              map((data) => data.certificationPath),
              filter(Boolean)
            )
      ),
      withLatestFrom(this.params$),
      map(([selectedCertificationPath, params]) => {
        if (
          selectedCertificationPath.trainingsCollection &&
          selectedCertificationPath.trainingsCollection.items
        ) {
          this.setTrainingsFormControls(
            params.trainingId,
            selectedCertificationPath.trainingsCollection
              .items as AssortedTrainingItemByCertificationPathFragment[]
          )
        }
        return selectedCertificationPath
      })
    )

  /**
   * Set trainings to form
   */
  private setTrainingsFormControls(
    trainingId: string,
    trainings: AssortedTrainingItemByCertificationPathFragment[]
  ) {
    if (!trainings || !this.trainingForm) return

    this.resetTrainingForm()

    trainings.forEach((training) => {
      if (!training.sys?.id) return

      const checked = trainingId && trainingId === training.sys?.id
      this.trainingForm.addControl(training.sys.id, new FormControl(!!checked))
    })
  }

  /**
   * Remove all controls and set to untouched state
   */
  private resetTrainingForm(): void {
    Object.keys(this.trainingForm.controls).forEach((key) => {
      this.trainingForm.removeControl(key)
    })
    this.trainingForm.markAsUntouched()
  }

  /**
   * Get topics form control
   * @returns {FormControl}
   */
  public get topics(): FormControl<string> {
    return this.formGroup?.controls.topics as FormControl<string>
  }

  /**
   * Get trainings form group
   * @returns {FormGroup}
   */
  public get trainingForm(): FormGroup {
    return this.formGroup?.controls.trainings as FormGroup
  }
}
