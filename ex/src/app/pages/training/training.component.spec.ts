import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { TrainingComponent } from './training.component'
import { StoreModule } from '@ngrx/store'

describe('TrainingComponent', () => {
  let component: TrainingComponent
  let fixture: ComponentFixture<TrainingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingComponent],
      imports: [getTranslocoModule(), StoreModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
