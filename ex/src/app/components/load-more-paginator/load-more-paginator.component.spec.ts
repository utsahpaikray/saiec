import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { TranslocoService } from '@ngneat/transloco'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'

import { LoadMorePaginatorComponent } from './load-more-paginator.component'

describe('LoadMorePaginatorComponent', () => {
  let component: LoadMorePaginatorComponent
  let fixture: ComponentFixture<LoadMorePaginatorComponent>
  let translocoService: TranslocoService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LoadMorePaginatorComponent,
        HttpClientModule,
        getTranslocoModule()
      ]
    })
    fixture = TestBed.createComponent(LoadMorePaginatorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    translocoService = TestBed.inject(TranslocoService)
  })

  it('should show correct result', () => {
    component.number = 15
    component.total = 50
    fixture.detectChanges()

    const loadMorePaginator = fixture.debugElement.query(
      By.css('[data-testid="load-more-paginator"]')
    )

    expect(loadMorePaginator.nativeElement.textContent.trim()).toBe(
      translocoService.translate('General.ShowResult', {
        number: component.number,
        total: component.total
      })
    )
  })
})
