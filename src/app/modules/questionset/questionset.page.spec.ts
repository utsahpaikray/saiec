import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionsetPage } from './questionset.page';

describe('QuestionsetPage', () => {
  let component: QuestionsetPage;
  let fixture: ComponentFixture<QuestionsetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
