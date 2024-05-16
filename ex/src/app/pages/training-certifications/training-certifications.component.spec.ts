import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'
import { of } from 'rxjs'
import {
  CertificationItemFragment,
  CertificationsDocument,
  CertificationsGQL
} from './graphql/cms-certifications.graphql-gen'
import {
  GenericCertificationsDocument,
  GenericCertificationsFragment,
  GenericCertificationsGQL
} from './graphql/cms-generic-certifications.graphql-gen'

import { TrainingCertificationsComponent } from './training-certifications.component'

const mockGenericCertificationsPage: GenericCertificationsFragment[] = [
  {
    description:
      'Educate Service offers three Certification Programme Paths: Operator, Logistics and Maintenance. Each certification path consists of a sequence of courses that when successfully completed, gives trainees a license to work in that area. The Certification Programme Path can be tailored to the specifications of your project and site.',
    slug: 'certifications',
    title: 'Certifications',
    __typename: 'Generic'
  }
]

const mockCertifications: CertificationItemFragment[] = [
  {
    certificationImageCollection: {
      items: [
        {
          title: 'Operations',
          url: 'https://images.ctfassets.net/edffyomf8p2r/7yjfXqJv3M33Vufli1T4Cw/b890dfe58db3cff8424249d62faab973/Operations.png',
          __typename: 'Asset'
        }
      ],
      __typename: 'AssetCollection'
    },
    certificationInfo: {
      json: {
        content: [],
        data: {},
        nodeType: 'document'
      },
      __typename: 'CertificationPathCertificationInfo'
    },
    title: 'Operations',
    sys: { id: '1DmCN821RCw0cgxTBAMNuP', __typename: 'Sys' },
    __typename: 'CertificationPath'
  }
]

const mockEmptyCertifications: CertificationItemFragment[] = [
  {
    certificationImageCollection: {
      items: [],
      __typename: 'AssetCollection'
    },
    certificationInfo: {
      json: null,
      __typename: 'CertificationPathCertificationInfo'
    },
    title: 'Operations',
    sys: { id: '1DmCN821RCw0cgxTBAMNuP', __typename: 'Sys' },
    __typename: 'CertificationPath'
  }
]

function initializeTrainingCertificationsData(
  controller: ApolloTestingController,
  query: CertificationsGQL,
  query2: GenericCertificationsGQL
) {
  spyOn(query, 'fetch').and.callThrough()
  spyOn(query2, 'fetch').and.callThrough()

  const certificationsOp = controller.expectOne(CertificationsDocument)
  expect(certificationsOp.operation.operationName).toEqual('certifications')

  const genericCertificationsOp = controller.expectOne(
    GenericCertificationsDocument
  )
  expect(genericCertificationsOp.operation.operationName).toEqual(
    'genericCertifications'
  )

  certificationsOp.flush({
    data: {
      certificationPathCollection: { items: mockCertifications.slice(0) }
    }
  })

  genericCertificationsOp.flush({
    data: {
      genericCollection: { items: mockGenericCertificationsPage.slice(0) }
    }
  })
}

describe('TrainingCertificationsComponent', () => {
  let component: TrainingCertificationsComponent
  let fixture: ComponentFixture<TrainingCertificationsComponent>
  let router: Router
  let route: ActivatedRoute
  let controller: ApolloTestingController
  let certifiationsQuery: CertificationsGQL
  let genericCertificationPageQuery: GenericCertificationsGQL

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingCertificationsComponent],
      imports: [
        ApolloTestingModule.withClients(['cms']),
        RouterTestingModule,
        getTranslocoModule()
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              siteId: 'testSiteId'
            })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingCertificationsComponent)
    component = fixture.componentInstance

    router = TestBed.inject(Router)
    route = TestBed.inject(ActivatedRoute)
    controller = TestBed.inject(ApolloTestingController)
    certifiationsQuery = TestBed.inject(CertificationsGQL)
    genericCertificationPageQuery = TestBed.inject(GenericCertificationsGQL)

    fixture.detectChanges()

    initializeTrainingCertificationsData(
      controller,
      certifiationsQuery,
      genericCertificationPageQuery
    )
  })

  afterEach(() => {
    controller.verify()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('gets correct data on init', () => {
    component.ngOnInit()
    expect(certifiationsQuery.fetch).toHaveBeenCalled()
    expect(genericCertificationPageQuery.fetch).toHaveBeenCalled()
  })

  it('should set correct page data', () => {
    component.setPageData([mockGenericCertificationsPage, mockCertifications])

    const genericCertificationsPage = component.genericCertifications || []
    expect(genericCertificationsPage.length).toEqual(
      mockGenericCertificationsPage.length
    )
    expect(genericCertificationsPage[0]).toEqual(
      mockGenericCertificationsPage[0]
    )

    const certifications = component.certifications || []
    expect(certifications.length).toEqual(mockCertifications.length)
    expect(certifications[0]).toEqual(mockCertifications[0])
  })

  it('should render page title and description if data exists', async () => {
    component.genericCertifications = mockGenericCertificationsPage
    fixture.detectChanges()
    await fixture.whenStable()

    const pageTitle = fixture.debugElement.query(
      By.css('[data-testid="certifications-title"]')
    )
    const pageDescription = fixture.debugElement.query(
      By.css('[data-testid="certifications-description"]')
    )

    expect(pageTitle).toBeTruthy()
    expect(pageTitle.nativeElement.innerText).toEqual(
      mockGenericCertificationsPage[0].title
    )
    expect(pageDescription).toBeTruthy()
    expect(pageDescription.nativeElement.innerText).toEqual(
      mockGenericCertificationsPage[0].description
    )
  })

  it('should not render page title and description if data does not exist', async () => {
    component.genericCertifications = null

    fixture.detectChanges()
    await fixture.whenStable()

    const pageTitle = fixture.debugElement.query(
      By.css('[data-testid="certifications-title"]')
    )
    const pageDescription = fixture.debugElement.query(
      By.css('[data-testid="certifications-description"]')
    )

    expect(pageTitle).toBeFalsy()
    expect(pageDescription).toBeFalsy()
  })

  it('should navigate to training request page with correct url after clicked on request button', async () => {
    spyOn(router, 'navigate')
    component.genericCertifications = mockGenericCertificationsPage

    fixture.detectChanges()
    await fixture.whenStable()

    const certificationsRequestButton = fixture.debugElement.query(
      By.css('[data-testid="certifications-request-button"]')
    )
    certificationsRequestButton.triggerEventHandler('click', null)
    expect(router.navigate).toHaveBeenCalledWith(['./request'], {
      relativeTo: route
    })
  })

  it('should navigate to relative page with correct link url in go to relative page function', () => {
    const linkUrlPath = '6l5eiiVT472o60nNhKHRIK'
    spyOn(router, 'navigate')
    component.goToRelativePage(linkUrlPath)

    expect(router.navigate).toHaveBeenCalledWith([`./${linkUrlPath}`], {
      relativeTo: route
    })
  })

  it('should show back button', () => {
    const backButton = fixture.debugElement.query(
      By.css('[data-testid="back-button"]')
    )

    expect(backButton).toBeTruthy()
  })

  it('should show certification card if certifications exist', async () => {
    component.setPageData([mockGenericCertificationsPage, mockCertifications])
    fixture.detectChanges()
    await fixture.whenStable()

    const certificationCard = fixture.debugElement.query(
      By.css('[data-testid="certification-card"]')
    )

    expect(certificationCard).toBeTruthy()
  })

  it('should not show certification card if certifications does not exist', async () => {
    component.setPageData([mockGenericCertificationsPage, []])
    fixture.detectChanges()
    await fixture.whenStable()

    const certificationCard = fixture.debugElement.query(
      By.css('[data-testid="certification-card"]')
    )

    expect(certificationCard).toBeFalsy()
  })

  it('should show certification image if any', async () => {
    component.setPageData([mockGenericCertificationsPage, mockCertifications])
    fixture.detectChanges()
    await fixture.whenStable()

    const certificationImage = fixture.debugElement.query(
      By.css('[data-testid="certification-image"]')
    )

    expect(certificationImage).toBeTruthy()
  })

  it('should not show certification image if data does not exist', async () => {
    component.setPageData([
      mockGenericCertificationsPage,
      mockEmptyCertifications
    ])

    fixture.detectChanges()
    await fixture.whenStable()

    const certificationImage = fixture.debugElement.query(
      By.css('[data-testid="certification-image"]')
    )

    expect(certificationImage).toBeFalsy()
  })

  it('should show certification rich text if any', async () => {
    component.setPageData([mockGenericCertificationsPage, mockCertifications])
    fixture.detectChanges()
    await fixture.whenStable()

    const certificationRichText = fixture.debugElement.query(
      By.css('[data-testid="certification-rich-text"]')
    )

    expect(certificationRichText).toBeTruthy()
  })

  it('should not show certification rich text if data does not exist', async () => {
    component.setPageData([
      mockGenericCertificationsPage,
      mockEmptyCertifications
    ])

    fixture.detectChanges()
    await fixture.whenStable()

    const certificationRichText = fixture.debugElement.query(
      By.css('[data-testid="certification-rich-text"]')
    )

    expect(certificationRichText).toBeFalsy()
  })
})
