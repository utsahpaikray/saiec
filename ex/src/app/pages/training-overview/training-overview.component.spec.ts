import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ApolloTestingModule } from 'apollo-angular/testing'
import { HttpClientModule } from '@angular/common/http'
import { By } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { mockCertificationsGenericPage } from '@core/cms-generic/graphql/cms-generic.service.mock'
import { Segment } from '@core/generated/types'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { SitesService } from '@core/sites/sites.service'
import { SitesServiceMock } from '@core/sites/sites.service.mock'
import {
  mockCertificationPath,
  mockRecommendedAssortedTraining,
  mockRecommendedAssortedTrainings
} from '@core/cms-training-assortments/cms-training.service.mock'
import { of } from 'rxjs'
import { TrainingOverviewComponent } from './training-overview.component'

describe('TrainingOverviewComponent', () => {
  let component: TrainingOverviewComponent
  let fixture: ComponentFixture<TrainingOverviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingOverviewComponent],
      imports: [
        ApolloTestingModule.withClients(['cms']),
        getTranslocoModule(),
        HttpClientModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              siteId: 'testSiteId'
            })
          }
        },
        {
          provide: SitesService,
          useClass: SitesServiceMock
        }
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingOverviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  describe('certificate path cards', () => {
    it('should show certification path cards', async () => {
      component.siteProjectsSegment$ = of('Airports' as Segment)
      component.certificationPaths$ = of([{ ...mockCertificationPath }])
      fixture.detectChanges()
      await fixture.whenStable()

      const noTrainingTexts = fixture.debugElement.query(
        By.css('[data-testid="no-trainings-text"]')
      )
      expect(noTrainingTexts).toBeFalsy()

      const certificationPathCard = fixture.debugElement.queryAll(
        By.css('[data-testid="certification-path-card"]')
      )[0]
      expect(certificationPathCard).toBeTruthy()

      const firstCertificationPathCardTitle = fixture.debugElement.queryAll(
        By.css('[data-testid^="certification-path-card-title"]')
      )[0]
      expect(
        firstCertificationPathCardTitle.nativeElement.textContent.trim()
      ).toBe(mockCertificationPath.title)
      const firstCertificationPathCardDescription =
        fixture.debugElement.queryAll(
          By.css('[data-testid^="certification-path-card-description"]')
        )[0]
      expect(
        firstCertificationPathCardDescription.nativeElement.textContent.trim()
      ).toBe(mockCertificationPath.description)
      const firstCertificationPathCardButton = fixture.debugElement.queryAll(
        By.css('[data-testid^="certification-path-card-button"]')
      )[0]
      expect(firstCertificationPathCardButton.nativeElement.routerLink).toBe(
        `./${mockCertificationPath.sys.id}`
      )
    })

    it('should not show certification path when site project segment does not exist', () => {
      const noTrainingTexts = fixture.debugElement.query(
        By.css('[data-testid="no-trainings-text"]')
      )
      expect(noTrainingTexts).toBeTruthy()

      const certificationPathCard = fixture.debugElement.query(
        By.css('[data-testid="certification-path-card"]')
      )
      expect(certificationPathCard).toBeFalsy()
    })
  })

  describe('recommended cards', () => {
    beforeEach(() => {
      component.siteProjectsSegment$ = of('Airports' as Segment)
      component.recommendedList$ = of({
        genericCertifications: { ...mockCertificationsGenericPage },
        recommendedAssortedTrainings: [...mockRecommendedAssortedTrainings]
      })
      fixture.detectChanges()
    })
    it('should render recommended training cards correctly', async () => {
      await fixture.whenStable()

      const recommendedCard = fixture.debugElement.query(
        By.css('[data-testid="recommended-card"]')
      )
      expect(recommendedCard).toBeTruthy()

      const recommendedCardTitle = fixture.debugElement.queryAll(
        By.css('[data-testid^="recommended-card-title"]')
      )[0]
      expect(recommendedCardTitle.nativeElement.textContent.trim()).toBe(
        mockRecommendedAssortedTraining.title
      )

      const recommendedCardTags = fixture.debugElement.queryAll(
        By.css('[data-testid^="recommended-card-tags"]')
      )[0]
      const expectedTargetGroup =
        'Maintenance Engineers,    (JR) Service Engineers (Preventive Maintenance Engineers)'
      expect(recommendedCardTags.nativeElement.textContent.trim()).toContain(
        `For:  ${expectedTargetGroup}`
      )

      const recommendedCardImage = fixture.debugElement.queryAll(
        By.css('[data-testid^="recommended-card-image"]')
      )[0]
      expect(recommendedCardImage.nativeElement.src).toContain(
        mockRecommendedAssortedTrainings[0].cardImageCollection?.items[0]?.url
      )

      const recommendedCardDescription = fixture.debugElement.queryAll(
        By.css('[data-testid^="recommended-card-description"]')
      )[0]
      expect(recommendedCardDescription.nativeElement.textContent.trim()).toBe(
        mockRecommendedAssortedTraining.description
      )

      const recommendedCardMeta = fixture.debugElement.queryAll(
        By.css('[data-testid^="recommended-card-meta"]')
      )[0]
      expect(recommendedCardMeta.nativeElement.textContent.trim()).toBe(
        mockRecommendedAssortedTraining.duration
      )

      const recommendedCardButton = fixture.debugElement.queryAll(
        By.css('[data-testid^="recommended-card-button"]')
      )[0]
      expect(recommendedCardButton.nativeElement.routerLink).toBe(
        mockRecommendedAssortedTrainings[0].linkedFrom
          ?.certificationPathCollection?.items[0]?.sys.id +
          '/' +
          mockRecommendedAssortedTrainings[0].sys.id
      )
    })

    it('should render certifications promo card correctly', () => {
      const certificationsCard = fixture.debugElement.query(
        By.css('[data-testid="certifications-promo-card"]')
      )
      expect(certificationsCard).toBeTruthy()
    })

    it('should use certification page slug as url path in certifications promo card', () => {
      const certificationsPromoCard = fixture.debugElement.query(
        By.css('[data-testid="promo-card-button"]')
      )

      expect(certificationsPromoCard.nativeElement.routerLink).toEqual(
        `./${mockCertificationsGenericPage.slug}`
      )
    })
  })
})
