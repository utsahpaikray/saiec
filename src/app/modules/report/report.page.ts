import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  remark = 'Good';
  public studentInfo = {
    studentName: 'Aradhana Samantasinghar',
    std: 'STD-1',
    score: 0,
    total: 0,
    percentage: 0,
    image:
      'https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/Aradhana.jpeg?alt=media&token=d3b383b0-ce45-40a8-bc8f-b394a4c659df',
    fatherName: 'Adikandha Samantasinghar',
    academicSubjects: [
      {
        subject: 'English',
        writtenScore: 60,
        writtenTotal: 80,
        oralScore: 15,
        oralTotal: 20,
      },
      {
        subject: 'MIL',
        writtenScore: 70,
        writtenTotal: 80,
        oralScore: 17,
        oralTotal: 20,
      },
      {
        subject: 'Science',
        writtenScore: '50',
        writtenTotal: 80,
        oralScore: 15,
        oralTotal: 20,
      },
      {
        subject: 'History',
        writtenScore: '80',
        writtenTotal: 80,
        oralScore: 18,
        oralTotal: 20,
      },
      {
        subject: 'Social Science',
        writtenScore: '80',
        writtenTotal: 80,
        oralScore: 18,
        oralTotal: 20,
      },
    ],
  };
  rowData: any;
  studentName: string | null = '';
  info: any;
  markInfo: any;
  studentMainInfo: any;
  modeList = ['Halfly', 'Annual'];
  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.studentName = this.route.snapshot.paramMap.get('name');
    this.getStudent();
  }
  selectMode(value: any) {
    this.markInfo = this.info.markInfo.filter((item: { name: any }) => {
      return item.name === value;
    })[0];
    this.calculateScore(this.markInfo);
  }
  getStudent() {
    this.firebaseService.getAllExamInfo().subscribe((items) => {
      this.rowData = items;
      this.info = this.rowData.filter((item: { name: string | null }) => {
        return item.name === this.studentName;
      })[0];
    });
    this.firebaseService.getAllstudent().subscribe((items) => {
      this.studentMainInfo = items.filter(
        (item: any) => item['StudentName'] === this.studentName,
      )[0];
    });
  }
  public calculateScore(info: {
    marks: any[];
    score: number;
    total: number;
    percentage: string;
  }) {
    let writtenScore = 0;
    let oralScore = 0;
    let writtenTotal = 0;
    let oralTotal = 0;
    info.marks.forEach((element) => {
      writtenScore =
        writtenScore + Number(element.writtenAcc ? element.writtenAcc : 0);
      oralScore = oralScore + Number(element.oralAcc ? element.oralAcc : 0);
      writtenTotal =
        writtenTotal + Number(element.writtenTotal ? element.writtenTotal : 0);
      oralTotal = oralTotal + Number(element.oral ? element.oral : 0);
    });
    info.score = writtenScore + oralScore;
    info.total = writtenTotal + oralTotal;
    info.percentage = (
      ((writtenScore + oralScore) / (writtenTotal + oralTotal)) *
      100
    ).toFixed(2);
  }
  public total(a: any, b: any) {
    return Number(a) + Number(b);
  }
  getGrade(value: any) {
    switch (true) {
      // If score is 90 or greater
      case value >= 90:
        return 'O';

      case value >= 80:
        return 'A';

      // If score is 70 or greater
      case value >= 70:
        return 'B';

      // If score is 60 or greater
      case value >= 60:
        return 'C';
      case value >= 50:
        return 'D';
      // Anything 49 or below is failing
      default:
        return 'F';
    }
  }
}
