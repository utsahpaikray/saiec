import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExamFormPage } from './exam-form.page';

describe('ExamFormPage', () => {
  let component: ExamFormPage;
  let fixture: ComponentFixture<ExamFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExamFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
