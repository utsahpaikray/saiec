import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder, Validators } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { DropdownItem } from '@components/dropdown/dropdown-item.model'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { SitesService } from '@core/sites/sites.service'
import { SitesServiceMock } from '@core/sites/sites.service.mock'
import { atLeastOneCheckboxCheckedValidator } from '@core/validators/at-least-one-checkbox-checked-validator'
import { ApolloTestingModule } from 'apollo-angular/testing'
import { of } from 'rxjs'
import { RequestTopicsGroup } from '../../training-request-form.interface'
import { TrainingRequestTopicSelectorComponent } from './training-request-topic-selector.component'
import {
  mockAssortedTraining1,
  mockCertificationPath
} from '@core/cms-training-assortments/cms-training.service.mock'
import { CertificationPathWithAssortedTrainingFragment } from '@core/cms-training-assortments/graphql/cms-assorted-trainings-by-certification-path.graphql-gen'

const mockSiteId = 'testSiteId'
const mockCertificateId = 'testCertificateId'
const mockTrainingId = 'testTrainingId'

const mockCertificationPathDropdowns: DropdownItem[] = [
  { label: 'Maintenance & IT', value: '65ctcnZ3VrYan1eIalTRtq' },
  { label: 'Logistics', value: '4x83JVl6Zne5P4wsEx0LV6' },
  { label: 'Operations', value: '1DmCN821RCw0cgxTBAMNuP' }
]

describe('TrainingRequestTopicSelectorComponent', () => {
  let component: TrainingRequestTopicSelectorComponent
  let fixture: ComponentFixture<TrainingRequestTopicSelectorComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingRequestTopicSelectorComponent],
      imports: [ApolloTestingModule.withClients(['cms']), getTranslocoModule()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              siteId: mockSiteId,
              certificateId: mockCertificateId,
              trainingId: mockTrainingId
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
    fixture = TestBed.createComponent(TrainingRequestTopicSelectorComponent)
    component = fixture.componentInstance

    const formBuilder = new FormBuilder()
    component.formGroup = formBuilder.nonNullable.group({
      topics: ['', { updateOn: 'change', validators: [Validators.required] }],
      trainings: formBuilder.nonNullable.group(
        {},
        {
          updateOn: 'change',
          validators: atLeastOneCheckboxCheckedValidator
        }
      )
    }) as RequestTopicsGroup
  })

  it('shows default certification path from certificate id in url in certification paths dropdown', async () => {
    component.certificationPathsDropdownItems$ = of([
      ...mockCertificationPathDropdowns
    ])
    fixture.detectChanges()
    await fixture.whenStable()

    const topicsDropdown = fixture.debugElement.query(
      By.css('[data-testid="training-request-topics"]')
    )
    expect(topicsDropdown).toBeTruthy()
    expect(component.topics.value).toBe(mockCertificateId)
  })

  it('sets training data to certification paths', async () => {
    component.certificationPathsDropdownItems$ = of([
      ...mockCertificationPathDropdowns
    ])
    component.selectedCertificationPath$ = of({
      ...mockCertificationPath,
      trainingsCollection: {
        items: [{ ...mockAssortedTraining1, __typename: 'Training' }],
        __typename: 'CertificationPathTrainingsCollection'
      },
      __typename: 'CertificationPath'
    } as CertificationPathWithAssortedTrainingFragment)

    fixture.detectChanges()
    await fixture.whenStable()

    const trainingCheckbox = fixture.debugElement.query(
      By.css('[data-testid="training-checkbox-0"]')
    )
    expect(trainingCheckbox).toBeTruthy
    expect(trainingCheckbox.nativeElement.innerText).toBe(
      mockAssortedTraining1.title
    )
  })
})
