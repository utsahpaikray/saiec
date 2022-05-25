import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutofeePage } from './autofee.page';

describe('AutofeePage', () => {
  let component: AutofeePage;
  let fixture: ComponentFixture<AutofeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutofeePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutofeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
