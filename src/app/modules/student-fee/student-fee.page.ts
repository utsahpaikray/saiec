import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { sortBy } from 'lodash';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';
import { StudentDetailPage } from '../shared/student-detail/student-detail.page';

@Component({
  selector: 'app-student-fee',
  templateUrl: './student-fee.page.html',
  styleUrls: ['./student-fee.page.scss'],
})
export class StudentFeePage implements OnInit {

  public allStudentInfo: any[] = [];
  params: Params | undefined;
  allStudentClassWise: any[] = [];
  inSchoolStudentData: any[] = [];
  totalStudent: number = 0;
  autoFeeMonthwise: any[] = [];
  session: string = "24-25";
  filteredData: any[] = [];
  schoolFee: any[] = [];

  constructor(
    public modalCtrl: ModalController,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.firebaseService.getAllstudentFee('student-fee').subscribe(fee => {
      this.schoolFee = fee;
      this.selectSession(this.session);
    });
  }

  private extractInschoolData(): any[] {
    this.totalStudent = 0;
    return this.allStudentClassWise.map(classGroup => {
      return classGroup.filter((student: any) => {
        const isInSchool = student.info['Sub-Status'] === 'In School';
        if (isInSchool) this.totalStudent += 1;
        return isInSchool;
      });
    });
  }

  private generateAutoFeeStructure(data: any[]): void {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.autoFeeMonthwise = months.map(month => {
      const studentInfoArray = data.map((element: any) => ({
        name: element.StudentName,
        mobile: element.MobileNumber,
        class: element.class,
        image: element.Image,
        fatherName: element.FatherName,
        value: element[month]
      }));
      return {
        month,
        studentInf: sortBy(studentInfoArray, ['class', 'name'])
      };
    });
  }

  public async showModal(studentName: string): Promise<void> {
    const monthlyCollection = this.autoFeeMonthwise.map(item => ({
      info: item.studentInf.find((student: any) => student.name === studentName),
      month: item.month
    }));
    const modal = await this.modalCtrl.create({
      component: StudentDetailPage,
      cssClass: 'my-custom-class',
      componentProps: { info: monthlyCollection },
      canDismiss: true,
      presentingElement: await this.modalCtrl.getTop()
    });
    await modal.present();
  }

  public selectSession(session: string): void {
    this.session = session;
    const filteredFeeData = this.schoolFee.filter(item => item.Session === session);
    this.generateAutoFeeStructure(filteredFeeData);
  }
}
