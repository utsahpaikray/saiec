import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { By } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { mockAssortedTraining1 } from '@core/cms-training-assortments/cms-training.service.mock'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { TranslocoService } from '@ngneat/transloco'
import { of } from 'rxjs'
import { TrainingsTableComponent } from './trainings-table.component'

describe('TrainingsTableComponent', () => {
  let component: TrainingsTableComponent
  let fixture: ComponentFixture<TrainingsTableComponent>
  let translocoService: TranslocoService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TrainingsTableComponent, getTranslocoModule()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              certificateId: 'testCertificateId',
              siteId: 'testSiteId'
            })
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    fixture = TestBed.createComponent(TrainingsTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    translocoService = TestBed.inject(TranslocoService)
  })

  it('should show no trainings text', () => {
    component.trainings = []
    fixture.detectChanges()

    const noTrainingsText = fixture.debugElement.query(
      By.css('[data-testid="no-training-text"]')
    )
    expect(noTrainingsText).toBeTruthy()

    const trainingsTable = fixture.debugElement.query(
      By.css('[data-testid="table-trainings"]')
    )
    const trainingsList = fixture.debugElement.query(
      By.css('[data-testid="trainings-card-list"]')
    )
    expect(trainingsTable).toBeFalsy()
    expect(trainingsList).toBeFalsy()
  })

  describe('on desktop', () => {
    beforeEach(() => {
      component.isTable$ = of(true)
      component.trainings = [{ ...mockAssortedTraining1 }]
      fixture.detectChanges()
    })

    it('should show correct headers', () => {
      const tableHeaders = fixture.debugElement.queryAll(
        By.css('[data-testid="training-table-header"]')
      )
      const headers = ['TrainingColumn', 'ForColumn', 'DurationColumn']

      for (const [i, tableHeader] of tableHeaders.entries()) {
        expect(tableHeader.nativeElement.innerText).toBe(
          translocoService.translate(`Training.${headers[i]}`)
        )
      }
    })

    it(`should show correct table contents`, () => {
      const trainingsTable = fixture.debugElement.query(
        By.css('[data-testid="table-trainings"]')
      )
      expect(trainingsTable).toBeTruthy()

      const firstTableRow = fixture.debugElement.queryAll(
        By.css('[data-testid="table-training-row"]')
      )[0]
      expect(
        firstTableRow.nativeElement.getAttribute('ng-reflect-router-link')
      ).toBe(mockAssortedTraining1.sys.id)
      const firstTableRowTitle = fixture.debugElement.queryAll(
        By.css('[data-testid="table-training-title"]')
      )[0]
      expect(firstTableRowTitle.nativeElement.textContent.trim()).toBe(
        mockAssortedTraining1.title
      )
      const firstTableRowTargetGroup = fixture.debugElement.queryAll(
        By.css('[data-testid="table-training-target-group"]')
      )[0]
      expect(firstTableRowTargetGroup.nativeElement.textContent.trim()).toBe(
        mockAssortedTraining1.targetGroup
      )
      const firstTableRowDuration = fixture.debugElement.queryAll(
        By.css('[data-testid="table-training-duration"]')
      )[0]
      expect(firstTableRowDuration.nativeElement.textContent.trim()).toBe(
        mockAssortedTraining1.duration
      )
    })
  })

  describe('on mobile', () => {
    beforeEach(() => {
      component.isTable$ = of(false)
      component.trainings = [{ ...mockAssortedTraining1 }]
      fixture.detectChanges()
    })

    it('should show card list', () => {
      const trainingsTable = fixture.debugElement.query(
        By.css('[data-testid="table-trainings"]')
      )
      expect(trainingsTable).toBeFalsy()

      const cardList = fixture.debugElement.query(
        By.css('[data-testid="trainings-card-list"]')
      )
      expect(cardList).toBeTruthy()
    })

    it('should show correct card contents', () => {
      const firstCard = fixture.debugElement.queryAll(
        By.css('[data-testid="trainings-card-list"]')
      )[0]
      expect(
        firstCard.nativeElement.getAttribute('ng-reflect-router-link')
      ).toBe(mockAssortedTraining1.sys.id)
      const firstCardTitle = fixture.debugElement.queryAll(
        By.css('[data-testid="training-card-title"]')
      )[0]
      expect(firstCardTitle.nativeElement.textContent.trim()).toBe(
        mockAssortedTraining1.title
      )
      const firstCardTargetGroup = fixture.debugElement.queryAll(
        By.css('[data-testid="training-card-target-group"]')
      )[0]
      expect(firstCardTargetGroup.nativeElement.textContent.trim()).toBe(
        mockAssortedTraining1.targetGroup
      )
      const firstCardDuration = fixture.debugElement.queryAll(
        By.css('[data-testid="training-card-duration"]')
      )[0]
      expect(firstCardDuration.nativeElement.textContent.trim()).toBe(
        mockAssortedTraining1.duration
      )
    })
  })
})
