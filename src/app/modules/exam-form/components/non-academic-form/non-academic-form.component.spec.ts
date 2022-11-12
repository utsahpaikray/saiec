import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAcademicFormComponent } from './non-academic-form.component';

describe('NonAcademicFormComponent', () => {
  let component: NonAcademicFormComponent;
  let fixture: ComponentFixture<NonAcademicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAcademicFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAcademicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
