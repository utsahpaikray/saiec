import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { ApolloQueryResult } from '@apollo/client/core'
import { TranslocoService } from '@ngneat/transloco'
import { first, map, Observable } from 'rxjs'
import {
  TrainingRequestBackLinkGQL,
  TrainingRequestBackLinkQuery
} from '../../graphql/cms-training-request-back-link.graphql-gen'

@Component({
  selector: 'app-training-request-back-link',
  templateUrl: './training-request-back-link.component.html'
})
export class TrainingRequestBackLinkComponent implements OnInit {
  public backLink: {
    title: string
    url: string
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private translocoService: TranslocoService,
    private trainingRequestBackLinkGQL: TrainingRequestBackLinkGQL
  ) {}

  /**
   * On init get training id
   */
  public ngOnInit(): void {
    this.getTrainingId()
  }

  /**
   * Get training id
   */
  private getTrainingId(): void {
    this.activatedRoute.paramMap
      .pipe(first())
      .subscribe(this.setBackLink.bind(this))
  }

  /**
   * Set correct back link based on parent page
   */
  private setBackLink(params: ParamMap): void {
    const trainingId = params.get('trainingId')
    if (!trainingId) {
      /*
       * If no training id is set, user reached this page through the certifications page.
       * Show certifications back link
       */
      this.backLink = {
        title: this.translocoService.translate('Training.Certifications'),
        url: '../'
      }

      return
    }

    this.fetchTrainingById(trainingId).subscribe({
      next: (trainingTitle: string | null) => {
        // Set training title as back link title
        this.backLink = {
          title: trainingTitle
            ? trainingTitle
            : this.translocoService.translate('Training.TrainingBackBtn'),
          url: '../'
        }
      },
      error: () => {
        // Failed to fetch training title.Use previous page fallback
        this.backLink = {
          title: this.translocoService.translate(
            'TrainingRequest.PreviousPage'
          ),
          url: '../'
        }
      }
    })
  }

  /**
   * Fetch training details by id.
   * Use training title as back button title to navigate back to the training detail page
   */
  private fetchTrainingById(trainingId: string): Observable<string | null> {
    return this.trainingRequestBackLinkGQL
      .fetch({ id: trainingId })
      .pipe(
        map(
          (result: ApolloQueryResult<TrainingRequestBackLinkQuery>) =>
            result.data.training?.title || null
        )
      )
  }
}
