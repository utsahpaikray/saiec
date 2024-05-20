import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';
import { StudentDetailPage } from '../shared/student-detail/student-detail.page';
import { map, sortBy, uniq } from 'lodash';
interface StaffPayment {
  $id: string;
  December: number;
  May: number;
  November: number;
  October: number;
  June: number;
  April: number;
  March: number;
  session: string;
  July: number;
  name: string;
  image: string;
  January: number;
  February: number;
  August: number;
  payment: number;
  September: number;
  [key:string]: number|string|any
}



@Component({
  selector: 'app-staff-payment',
  templateUrl: './staff-payment.page.html',
  styleUrls: ['./staff-payment.page.scss'],
})
export class StaffPaymentPage implements OnInit {
  public session: string[] = [];
  public feeMonthwise!: any[];
  public staffPayments: StaffPayment[] = [];
  constructor(
    public firebaseService: FirebaseService,
    public modalCtrl: ModalController,
  ) {}

  ngOnInit() {
    this.fetchStaffPayment();
  }
  fetchStaffPayment() {
    this.firebaseService.getAll('staff-payment').subscribe((items: any[]) => {
      this.staffPayments = items;
      this.session = sortBy(uniq(map(items, 'session')));
      this.sessionBy(this.session[this.session.length-1]);
    }, error => {
      console.error('Failed to fetch staff payment:', error);
    });
  }
  sessionBy(session: string) {
    let sessionPayment = this.staffPayments.filter(obj => obj.session === session);
    this.generateAutoFeeStructure(sessionPayment);
  }
  generateAutoFeeStructure(data: StaffPayment[]) {
    let flatData = data;
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.feeMonthwise = [];
    months.forEach((month) => {
      let staffInfoArray: StaffPayment[] = [];
      flatData.forEach((element) => {
        let staffInfo: any = {
          name: element.name,
          session: element.session,
          image: element.image,
          payment: element.payment,
          value: element[month]||0,
        };
        staffInfoArray.push(staffInfo);
      });
      staffInfoArray = sortBy(staffInfoArray, ['class', 'name']);
      this.feeMonthwise.push({ month: month, studentInf: staffInfoArray });
    });
  }
  public async showModal(info: any) {
    let monthlyCollection: any = [];
    this.feeMonthwise.forEach((item) => {
      monthlyCollection.push({
        info: item.studentInf.find((o: any) => o.name === info),
        month: item.month,
      });
    });
    const modal = await this.modalCtrl.create({
      component: StudentDetailPage,
      cssClass: 'my-custom-class',
      componentProps: { info: monthlyCollection },
      canDismiss: true,
      presentingElement: await this.modalCtrl.getTop(),
    });
    return await modal.present();
  }
  createStaffpayment(data: any) {
    this.firebaseService.pushItems('staff-payment', data);
  }
}
