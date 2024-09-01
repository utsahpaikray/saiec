import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';
import { BehaviorSubject, Observable, combineLatest, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  studentName$!: Observable<string>;
  info$!: Observable<any>;
  markInfo$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  studentMainInfo$!: Observable<any>;

  readonly modeList = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December', 'Halfly', 'Annual'
  ];

  private firebaseService = inject(FirebaseService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.studentName$ = this.route.paramMap.pipe(
      map(params => params.get('name') || '')
    );

    this.info$ = this.studentName$.pipe(
      switchMap(name => this.firebaseService.getAllExamInfo('2024-2025', name)),
      map(items => items[0])
    );

    this.studentMainInfo$ = combineLatest([
      this.studentName$,
      this.firebaseService.getAllstudent()
    ]).pipe(
      map(([name, students]) => students.find((item: any) => item['StudentName'] === name))
    );

    // Initialize markInfo$ with the first mode
    this.selectMode(this.modeList[0]);
  }

  selectMode(value: string) {
    this.info$.pipe(
      map(info => info?.markInfo?.find((item: { name: string }) => item.name === value)),
      map(markInfo => this.calculateScore(markInfo))
    ).subscribe(
      markInfo => this.markInfo$.next(markInfo)
    );
  }

  private calculateScore(info: any): any {
    const { writtenScore, oralScore, writtenTotal, oralTotal } = info.marks.reduce(
      (acc: any, { writtenAcc = 0, oralAcc = 0, writtenTotal = 0, oral = 0 }) => ({
        writtenScore: acc.writtenScore + Number(writtenAcc),
        oralScore: acc.oralScore + Number(oralAcc),
        writtenTotal: acc.writtenTotal + Number(writtenTotal),
        oralTotal: acc.oralTotal + Number(oral),
      }),
      { writtenScore: 0, oralScore: 0, writtenTotal: 0, oralTotal: 0 }
    );

    const score = writtenScore + oralScore;
    const total = writtenTotal + oralTotal;
    const percentage = total > 0 ? ((score / total) * 100).toFixed(2) : "0.00";

    return { ...info, score, total, percentage };
  }

  total(a: number, b: number): number {
    return Number(a) + Number(b);
  }

  getGrade(value: number | null): string {
    if (value === null || value === 0) return 'N/A';
    if (value >= 90) return 'O';
    if (value >= 80) return 'A';
    if (value >= 70) return 'B';
    if (value >= 60) return 'C';
    if (value >= 50) return 'D';
    return 'F';
  }

  toNumber(value: any): number {
    return Number(value) || 0;
  }
}