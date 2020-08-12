import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacultyPage } from './faculty.page';

describe('FacultyPage', () => {
  let component: FacultyPage;
  let fixture: ComponentFixture<FacultyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacultyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
