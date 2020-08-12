import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdvPage } from './adv.page';

describe('AdvPage', () => {
  let component: AdvPage;
  let fixture: ComponentFixture<AdvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
