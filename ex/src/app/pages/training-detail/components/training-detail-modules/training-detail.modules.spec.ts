import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { TrainingModule } from '@core/generated/cms-types'
import { TrainingDetailModulesComponent } from './training-detail-modules.component'

const MockModules = [
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

describe('TrainingDetailModulesComponent', () => {
  let component: TrainingDetailModulesComponent
  let fixture: ComponentFixture<TrainingDetailModulesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule()],
      declarations: [TrainingDetailModulesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(async () => {
    fixture = TestBed.createComponent(TrainingDetailModulesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    component.modules = MockModules.slice(0)

    fixture.detectChanges()

    await fixture.whenStable()
  })

  it('should render module block', () => {
    const trainingModule1 = fixture.debugElement.query(
      By.css('[data-testid="training-detail-module-0"]')
    )
    const trainingModule2 = fixture.debugElement.query(
      By.css('[data-testid="training-detail-module-1"]')
    )
    expect(trainingModule1).toBeTruthy()
    expect(trainingModule2).toBeTruthy()
  })

  it('should render module title with optional label', () => {
    const trainingModule1Title = fixture.debugElement.query(
      By.css('[data-testid="training-detail-module-0-title"]')
    )
    const trainingModule2Title = fixture.debugElement.query(
      By.css('[data-testid="training-detail-module-1-title"]')
    )

    expect(trainingModule1Title).toBeTruthy()
    expect(trainingModule2Title).toBeTruthy()

    expect(trainingModule1Title.nativeElement.innerText).toContain(
      MockModules[0].title
    )
    expect(trainingModule2Title.nativeElement.innerText).toContain(
      MockModules[1].title
    )

    expect(trainingModule1Title.nativeElement.innerText).not.toContain(
      'Optional'
    )
    expect(trainingModule2Title.nativeElement.innerText).toContain('Optional')
  })

  it('should render module description', () => {
    const trainingModule1Description = fixture.debugElement.query(
      By.css('[data-testid="training-detail-module-0-description"]')
    )
    const trainingModule2Description = fixture.debugElement.query(
      By.css('[data-testid="training-detail-module-1-description"]')
    )

    expect(trainingModule1Description).toBeTruthy()
    expect(trainingModule2Description).toBeTruthy()

    expect(trainingModule1Description.nativeElement.innerText).toContain(
      MockModules[0].description
    )
    expect(trainingModule2Description.nativeElement.innerText).toContain(
      MockModules[1].description
    )
  })
})
