import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeTablePage } from './time-table.page';

describe('TimeTablePage', () => {
  let component: TimeTablePage;
  let fixture: ComponentFixture<TimeTablePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TimeTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
