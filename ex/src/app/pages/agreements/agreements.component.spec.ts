import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { StoreModule } from '@ngrx/store'
import { AgreementsComponent } from './agreements.component'

describe('AgreementsComponent', () => {
  let component: AgreementsComponent
  let fixture: ComponentFixture<AgreementsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgreementsComponent],
      imports: [getTranslocoModule(), StoreModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
