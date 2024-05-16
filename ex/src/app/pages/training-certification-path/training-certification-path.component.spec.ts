import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { ApolloTestingModule } from 'apollo-angular/testing'
import { of } from 'rxjs'

import { TableComponent } from '@components/table/table.component'
import { mockCertificationPath } from '@core/cms-training-assortments/cms-training.service.mock'
import { TrainingCertificationPathItemFragment } from '@core/cms-training-assortments/graphql/cms-certification-path-by-id.graphql-gen'
import { SitesService } from '@core/sites/sites.service'
import { SitesServiceMock } from '@core/sites/sites.service.mock'
import { TrainingCertificationPathComponent } from './training-certification-path.component'

const mockCertificate: TrainingCertificationPathItemFragment = {
  ...mockCertificationPath,
  __typename: 'CertificationPath'
}

describe('TrainingCertificationPathComponent', () => {
  let component: TrainingCertificationPathComponent
  let fixture: ComponentFixture<TrainingCertificationPathComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingCertificationPathComponent],
      imports: [
        ApolloTestingModule.withClients(['cms']),
        getTranslocoModule(),
        TableComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              certificateId: 'testCertificateId',
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
    fixture = TestBed.createComponent(TrainingCertificationPathComponent)
    component = fixture.componentInstance
    component.certificationPath$ = of(mockCertificate)
    fixture.detectChanges()
  })

  it('should show certificate name as page title', () => {
    const certificateTitle = fixture.debugElement.query(
      By.css('[data-testid="certificate-title"]')
    )
    const certificateDescription = fixture.debugElement.query(
      By.css('[data-testid="certificate-description"]')
    )
    expect(certificateTitle.nativeElement.textContent.trim()).toBe(
      mockCertificationPath.title
    )
    expect(certificateDescription.nativeElement.textContent.trim()).toBe(
      mockCertificationPath.description
    )
  })

  it('should show back button', () => {
    const backButton = fixture.debugElement.query(
      By.css('[data-testid="back-button"]')
    )
    expect(backButton).toBeTruthy()
  })
})
