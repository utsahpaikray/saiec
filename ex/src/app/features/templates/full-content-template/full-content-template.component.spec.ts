import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StoreModule } from '@ngrx/store'
import { FullContentTemplateComponent } from './full-content-template.component'

describe('FullContentTemplateComponent', () => {
  let component: FullContentTemplateComponent
  let fixture: ComponentFixture<FullContentTemplateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullContentTemplateComponent, StoreModule.forRoot()]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FullContentTemplateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
