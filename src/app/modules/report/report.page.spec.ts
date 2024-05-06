import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ReportPage } from './report.page';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';

describe('ReportPage', () => {
  let component: ReportPage;
  let fixture: ComponentFixture<ReportPage>;
  let firebaseServiceMock: any;
  let activatedRouteMock: any;

  beforeEach(() => {
    firebaseServiceMock = {
      getAllExamInfo: jest.fn().mockReturnValue(of([])),
      getAllstudent: jest.fn().mockReturnValue(of([]))
    };

    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('Aradhana Samantasinghar')
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [ReportPage],
      providers: [
        { provide: FirebaseService, useValue: firebaseServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    });

    fixture = TestBed.createComponent(ReportPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getStudent on ngOnInit', () => {
    const getStudentSpy = jest.spyOn(component, 'getStudent');
    component.ngOnInit();
    expect(getStudentSpy).toHaveBeenCalled();
  });

  it('should calculate score correctly', () => {
    const mockInfo = {
      marks: [
        { writtenAcc: 60, oralAcc: 15, writtenTotal: 80, oral: 20 },
        { writtenAcc: 70, oralAcc: 17, writtenTotal: 80, oral: 20 },
        { writtenAcc: 50, oralAcc: 15, writtenTotal: 80, oral: 20 },
        { writtenAcc: 80, oralAcc: 18, writtenTotal: 80, oral: 20 },
        { writtenAcc: 80, oralAcc: 18, writtenTotal: 80, oral: 20 }
      ],
      score: 0,
      total: 0,
      percentage: '0.00'
    };

    component.calculateScore(mockInfo);

    expect(mockInfo.score).toEqual(423);
    expect(mockInfo.total).toEqual(500);
    expect(mockInfo.percentage).toEqual('84.60');
  });

  it('should get grade correctly', () => {
    expect(component.getGrade(95)).toEqual('O');
    expect(component.getGrade(85)).toEqual('A');
    expect(component.getGrade(75)).toEqual('B');
    expect(component.getGrade(65)).toEqual('C');
    expect(component.getGrade(55)).toEqual('D');
    expect(component.getGrade(45)).toEqual('F');
  });
  it('should calculate total score correctly', () => {
    const mockScores = [10, 20, 30, 40];
    const expectedTotal = mockScores.reduce((a, b) => a + b, 0);

    expect(component.total(10, 20)).toEqual(30);
    expect(component.total(30, 40)).toEqual(70);
    expect(mockScores.reduce(component.total, 0)).toEqual(expectedTotal);
  });
  it('should select mode and calculate score correctly', () => {
    const mockMarkInfo = { name: 'Halfly', marks: [{ writtenAcc: 60, writtenTotal: 80, oralAcc: 15, oralTotal: 20 }] };
    component.info = { markInfo: [mockMarkInfo] };

    component.selectMode('Halfly');

    expect(component.markInfo).toEqual(mockMarkInfo);
    expect(component.markInfo.score).toBe(75); // 60 + 15
    expect(component.markInfo.total).toBe(80); // 80 + 20
    expect(component.markInfo.percentage).toBe('93.75');
  });
});