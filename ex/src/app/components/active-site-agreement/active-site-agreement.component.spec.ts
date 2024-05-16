import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { TranslocoLocaleModule } from '@ngneat/transloco-locale'

import { ActiveSiteAgreementComponent } from './active-site-agreement.component'
import { CardComponent } from '@components/card/card.component'
import { CardContentListComponent } from '@components/card/card-content-list/card-content-list.component'
import { CardMetaComponent } from '@components/card/card-meta/card-meta.component'
import { SiteAgreementFragment } from '@pages/agreements-overview/graphql/site-agreements.graphql-gen'

const mockAgreement: SiteAgreementFragment = {
  agreementId: '0001-0002',
  endDate: '2023-01-01T12:32:10.000+01:00',
  startDate: '2016-01-01T12:32:10.000+01:00',
  contractLines: [],
  __typename: 'Agreement'
}

const mockNoDataAgreement: SiteAgreementFragment = {
  agreementId: '',
  endDate: '',
  startDate: '',
  contractLines: [],
  __typename: 'Agreement'
}

describe('ActiveSiteAgreementComponent', () => {
  let component: ActiveSiteAgreementComponent
  let fixture: ComponentFixture<ActiveSiteAgreementComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule(), TranslocoLocaleModule.forRoot()],
      declarations: [
        ActiveSiteAgreementComponent,
        CardComponent,
        CardContentListComponent,
        CardMetaComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveSiteAgreementComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('sets active agreement data correctly on the card', () => {
    component.agreement = mockAgreement
    fixture.detectChanges()

    const agreement = fixture.debugElement.query(
      By.css('[data-testid="active-site-agreement-id"]')
    )
    const startDate = fixture.debugElement.query(
      By.css('[data-testid="active-site-agreement-start-date"]')
    )
    const endDate = fixture.debugElement.query(
      By.css('[data-testid="active-site-agreement-end-date"]')
    )

    expect(agreement.nativeElement.textContent.trim()).toContain(
      mockAgreement.agreementId
    )
    expect(startDate.nativeElement.textContent.trim()).toContain(
      'January 1, 2016'
    )
    expect(endDate.nativeElement.textContent.trim()).toContain(
      'January 1, 2023'
    )
  })

  it('sets dashes if no active agreement data is available', () => {
    component.agreement = mockNoDataAgreement
    fixture.detectChanges()

    const agreement = fixture.debugElement.query(
      By.css('[data-testid="active-site-agreement-id"]')
    )
    const startDate = fixture.debugElement.query(
      By.css('[data-testid="active-site-agreement-start-date"]')
    )
    const endDate = fixture.debugElement.query(
      By.css('[data-testid="active-site-agreement-end-date"]')
    )

    expect(agreement.nativeElement.textContent.trim()).toContain('-')
    expect(startDate.nativeElement.textContent.trim()).toContain('-')
    expect(endDate.nativeElement.textContent.trim()).toContain('-')
  })
})
