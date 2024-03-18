import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReportFormComponent } from './components/report-form/report-form.component';

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.page.html',
  styleUrls: ['./transaction-report.page.scss'],
})
export class TransactionReportPage  {

  constructor(private modalCtrl: ModalController) { }

  
  

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ReportFormComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
     // this.message = `Hello, ${data}!`;
    }
  }
}
