import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportPage } from './report.page';

describe('ReportPage', () => {
  let component: ReportPage;
  let fixture: ComponentFixture<ReportPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportPage],
      // Add other dependencies here if needed
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more test cases here
});
