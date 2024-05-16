import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { StoreModule } from '@ngrx/store'
import { Portal } from '@stores/portals/interfaces/portal.interface'
import { of } from 'rxjs'
import { PortalsListComponent } from './portals-list.component'

describe('PortalsListComponent', () => {
  let component: PortalsListComponent
  let fixture: ComponentFixture<PortalsListComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortalsListComponent],
      imports: [StoreModule.forRoot({}), getTranslocoModule()],
      schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(PortalsListComponent)
    component = fixture.componentInstance
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should display loading template when loading$ is true', () => {
    component.portals$ = of([])
    component.loading$ = of(true)
    fixture.detectChanges()

    const loadingTemplate = fixture.nativeElement.querySelector(
      '[data-testid="progress-spinner"]'
    )

    expect(loadingTemplate).toBeTruthy()
  })

  it('should display noPortals template when portals$ is empty', () => {
    component.portals$ = of([])
    component.loading$ = of(false)
    fixture.detectChanges()

    const loadingTemplate = fixture.nativeElement.querySelector(
      '[data-testid="progress-spinner"]'
    )
    const noPortalsTemplate = fixture.nativeElement.querySelector(
      '[data-testid="no-data-texts-portals"]'
    )

    expect(loadingTemplate).toBeFalsy()
    expect(noPortalsTemplate).toBeTruthy()
  })

  it('should display portals when loading$ is false and portals$ has data', async () => {
    const portals: Portal[] = [
      { id: '1', name: 'Portal 1' },
      { id: '2', name: 'Portal 2' }
    ]

    component.portals$ = of(portals)
    component.loading$ = of(false)
    fixture.detectChanges()
    await fixture.whenStable()

    const portalCards = fixture.debugElement.queryAll(
      By.css('[data-testid^="portal-card-"]')
    )
    const loadingTemplate = fixture.debugElement.query(
      By.css('[data-testid="progress-spinner"]')
    )
    const noPortalsTemplate = fixture.debugElement.query(
      By.css('[data-testid="no-data-texts-portals"]')
    )

    const firstPortal = fixture.debugElement.query(
      By.css('[data-testid="portal-card-0"]')
    )
    const secondPortal = fixture.debugElement.query(
      By.css('[data-testid="portal-card-1"]')
    )

    expect(loadingTemplate).toBeFalsy()
    expect(noPortalsTemplate).toBeFalsy()

    expect(firstPortal.children[0].nativeElement.innerText).toContain(
      portals[0].name
    )
    expect(secondPortal.children[0].nativeElement.innerText).toContain(
      portals[1].name
    )
  })
})
