import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'
import { of } from 'rxjs'

import { Asset, TrainingModule } from '@core/generated/cms-types'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { PreviousUrlService } from '@core/previous-url/previous-url.service'
import { PreviousUrlServiceMock } from '@core/previous-url/previous-url.service.mock'
import {
  TrainingDetailDocument,
  TrainingDetailGQL
} from './graphql/cms-training-detail.graphql-gen'

import { TrainingDetailComponent } from './training-detail.component'
import { NetworkStatus } from '@apollo/client/core'
import {
  TrainingDetailCertificationPathDocument,
  TrainingDetailCertificationPathGQL
} from './graphql/cms-training-detail-certification-path.graphql-gen'

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

const MockCertificationPath = {
  sys: { id: '1DmCN821RCw0cgxTBAMNuP' },
  title: 'Operations',
  description:
    'How to operate your system - efficient utilization of operator workstations.',
  trainingsCollection: {
    items: [
      {
        title: '[Test] Training Airport+Amazon / Logistics / Not recommended',
        targetGroup:
          'Maintenance Engineers,  (JR) Service Engineers (Preventive Maintenance Engineers)',
        duration: '2 days',
        sys: { id: '3T7hjch4wHUSzWSk99Fnak' }
      },
      {
        title: '[Test] Training Amazon+Parcel / Operations / Recommended',
        targetGroup: 'Test group',
        duration: '10 days',
        sys: { id: '6l5eiiVT472o60nNhKHRIK' }
      }
    ]
  }
}

describe('TrainingDetailComponent', () => {
  let component: TrainingDetailComponent
  let fixture: ComponentFixture<TrainingDetailComponent>
  let router: Router
  let route: ActivatedRoute
  let controller: ApolloTestingController
  let trainingDetailQuery: TrainingDetailGQL
  let certificationPathQuery: TrainingDetailCertificationPathGQL
  let previousUrlService: PreviousUrlService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingDetailComponent],
      imports: [
        ApolloTestingModule.withClients(['cms']),
        RouterTestingModule,
        getTranslocoModule()
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              certificateId: 'testCertificateId',
              trainingId: 'testTrainingId'
            })
          }
        },
        {
          provide: PreviousUrlService,
          useClass: PreviousUrlServiceMock
        }
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    trainingDetailQuery = TestBed.inject(TrainingDetailGQL)
    certificationPathQuery = TestBed.inject(TrainingDetailCertificationPathGQL)
    controller = TestBed.inject(ApolloTestingController)
    router = TestBed.inject(Router)
    route = TestBed.inject(ActivatedRoute)
    previousUrlService = TestBed.inject(PreviousUrlService)
  })

  it('gets correct data on init', () => {
    spyOn(trainingDetailQuery, 'fetch').and.callThrough()
    spyOn(certificationPathQuery, 'fetch').and.callThrough()
    component.ngOnInit()

    const trainingDetailOp = controller.expectOne(TrainingDetailDocument)
    expect(trainingDetailOp.operation.operationName).toEqual('trainingDetail')
    const certificationPathOp = controller.expectOne(
      TrainingDetailCertificationPathDocument
    )
    expect(certificationPathOp.operation.operationName).toEqual(
      'trainingDetailCertificationPath'
    )

    trainingDetailOp.flush({
      data: {
        training: { ...MockTraining }
      }
    })
    certificationPathOp.flush({
      data: {
        certificationPath: { ...MockCertificationPath }
      }
    })
    controller.verify()

    expect(trainingDetailQuery.fetch).toHaveBeenCalledOnceWith({
      id: 'testTrainingId'
    })
    expect(certificationPathQuery.fetch).toHaveBeenCalledOnceWith({
      id: 'testCertificateId'
    })
  })

  it('should navigate to training request page with correct url after clicked on request button', async () => {
    spyOn(router, 'navigate')
    component.training = { ...MockTraining }

    fixture.detectChanges()
    await fixture.whenStable()

    const trainingDetailRequestButton = fixture.debugElement.query(
      By.css('[data-testid="training-detail-request-button"]')
    )
    trainingDetailRequestButton.triggerEventHandler('click', null)
    expect(router.navigate).toHaveBeenCalledWith(['./request'], {
      relativeTo: route
    })
  })

  describe('should show back button', () => {
    beforeEach(() => {
      spyOn(trainingDetailQuery, 'fetch').and.returnValue(
        of({
          loading: false,
          networkStatus: NetworkStatus.ready,
          data: {
            training: { ...MockTraining }
          }
        })
      )
      spyOn(certificationPathQuery, 'fetch').and.returnValue(
        of({
          loading: false,
          networkStatus: NetworkStatus.ready,
          data: {
            certificationPath: { ...MockCertificationPath }
          }
        })
      )
    })

    it('with certificate name in it', async () => {
      previousUrlService.url = 'training/certificateId'
      component.ngOnInit()

      fixture.detectChanges()
      await fixture.whenStable()

      const backButton = fixture.debugElement.query(
        By.css('[data-testid="back-button"]')
      )
      expect(backButton).toBeTruthy()
      expect(backButton.nativeElement.linkText).toContain(
        'Operations certification path'
      )
    })

    it('to training overview', async () => {
      previousUrlService.url = 'training'
      component.ngOnInit()

      fixture.detectChanges()
      await fixture.whenStable()

      const backButton = fixture.debugElement.query(
        By.css('[data-testid="back-button"]')
      )
      expect(backButton).toBeTruthy()
      expect(backButton.nativeElement.linkText).toContain('Training overview')
    })

    it('to certifications page', async () => {
      previousUrlService.url = 'certifications'
      component.ngOnInit()

      fixture.detectChanges()
      await fixture.whenStable()

      const backButton = fixture.debugElement.query(
        By.css('[data-testid="back-button"]')
      )
      expect(backButton).toBeTruthy()
      expect(backButton.nativeElement.linkText).toContain('Certifications')
    })
  })
})
