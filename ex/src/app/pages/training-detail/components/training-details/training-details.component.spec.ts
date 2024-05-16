import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { Asset, TrainingModule } from '@core/generated/cms-types'
import { TrainingDetailsComponent } from './training-details.component'
import { PictureComponent } from '@components/picture/picture.component'

const MockTraining = {
  sys: { id: '5R8Gs57O2A6dKCO16QSgO3' },
  title: 'Training title',
  description:
    'Trainees are taught CROSSORTER (SCS) terminology, functionality, and component functionality. The training course covers how the sorter runs, how decks are controlled and where to find the controls mechanism. Furthermore, it covers how the Flow System Controller (FSC) retrieves information, where parcels are located on the sorter and the destination of the parcels. The maintenance procedure is explained and covers for instance: checking wheels, carriers, chain tension, cabling, and decks. Visual checks of photocells and the controls cabinet, as well as various other maintenance activities are reviewed and practiced.',
  introduction:
    'Trainees are taught CROSSORTER (SCS) terminology, functionality, and component functionality.',
  entryRequirements:
    'Secondary Technical education level, NVQ2 or higherFundamental MaintenanceFundamental Controls',
  duration: '2 days',
  targetGroup:
    'Maintenance Engineers,  (JR) Service Engineers (Preventive Maintenance Engineers)',
  trainingModulesCollection: {
    items: [
      {
        title: '[Test] OOG baggage handling',
        description:
          'How to manually process out of gauge (OOG) bags through identification, screening and storage (when a flight is not available yet).',
        optionalModule: false
      },
      {
        title: '[Test] Training Module',
        description: 'Test description',
        optionalModule: true
      }
    ] as TrainingModule[]
  },
  pageImageCollection: {
    items: [
      {
        title: '2022, 12:38:27 PM',
        url: 'https://images.ctfassets.net/edffyomf8p2r/4Fy1rVVMe5eLFzHxNKUTDB/64ff363e8c3adcc1452fd0fc603dd761/webcam-1_24_2022__12_38_27_PM.png'
      } as Asset
    ]
  }
}

describe('TrainingDetailsComponent', () => {
  let component: TrainingDetailsComponent
  let fixture: ComponentFixture<TrainingDetailsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule()],
      declarations: [TrainingDetailsComponent, PictureComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should render image', async () => {
    component.training = { ...MockTraining }
    component.image = MockTraining.pageImageCollection.items[0]

    fixture.detectChanges()

    await fixture.whenStable()
    const trainingImage = fixture.debugElement.query(
      By.css('[data-testid="training-detail-image"]')
    )

    expect(trainingImage).toBeTruthy()
    expect(trainingImage.componentInstance.imageXs).toEqual(
      MockTraining.pageImageCollection.items[0].url
    )
    expect(trainingImage.componentInstance.imageTitle).toEqual(
      MockTraining.pageImageCollection.items[0].title
    )
  })

  describe('should render training details', () => {
    it('renders target group if present', async () => {
      component.training = { ...MockTraining }

      fixture.detectChanges()
      await fixture.whenStable()

      const trainingDetailTargetGroup = fixture.debugElement.query(
        By.css('[data-testid="training-detail-target-group"]')
      )

      expect(trainingDetailTargetGroup).toBeTruthy()
    })

    it('does not render target group if no data present', async () => {
      component.training = { ...MockTraining, targetGroup: null }

      fixture.detectChanges()
      await fixture.whenStable()

      const trainingDetailTargetGroup = fixture.debugElement.query(
        By.css('[data-testid="training-detail-target-group"]')
      )

      expect(trainingDetailTargetGroup).toBeFalsy()
    })

    it('renders prerequisites if present', async () => {
      component.training = { ...MockTraining }

      fixture.detectChanges()
      await fixture.whenStable()

      const trainingDetailPrerequisites = fixture.debugElement.query(
        By.css('[data-testid="training-detail-prerequisites"]')
      )

      expect(trainingDetailPrerequisites).toBeTruthy()
    })

    it('does not render prerequisites if no data present', async () => {
      component.training = { ...MockTraining, entryRequirements: null }

      fixture.detectChanges()
      await fixture.whenStable()

      const trainingDetailPrerequisites = fixture.debugElement.query(
        By.css('[data-testid="training-detail-prerequisites"]')
      )

      expect(trainingDetailPrerequisites).toBeFalsy()
    })

    it('renders duration if present', async () => {
      component.training = { ...MockTraining }

      fixture.detectChanges()
      await fixture.whenStable()

      const trainingDetailDuration = fixture.debugElement.query(
        By.css('[data-testid="training-detail-duration"]')
      )

      expect(trainingDetailDuration).toBeTruthy()
    })

    it('does not render duration if no data present', async () => {
      component.training = { ...MockTraining, duration: null }

      fixture.detectChanges()
      await fixture.whenStable()

      const trainingDetailDuration = fixture.debugElement.query(
        By.css('[data-testid="training-detail-duration"]')
      )

      expect(trainingDetailDuration).toBeFalsy()
    })
  })
})
