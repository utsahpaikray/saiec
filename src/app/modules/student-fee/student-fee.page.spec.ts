import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentFeePage } from './student-fee.page';

describe('StudentFeePage', () => {
  let component: StudentFeePage;
  let fixture: ComponentFixture<StudentFeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentFeePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentFeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
