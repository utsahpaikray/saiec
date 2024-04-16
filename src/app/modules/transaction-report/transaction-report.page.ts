import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StoreTransactionPage } from '../store-transaction-form/store-transaction-form.page';

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.page.html',
  styleUrls: ['./transaction-report.page.scss']
})
export class TransactionReportPage  {

  constructor(private modalCtrl: ModalController) { }

  
  

  async openModal() {
    const modal = await this.modalCtrl.create({
      // component: ReportFormComponent,
      component: StoreTransactionPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
     // this.message = `Hello, ${data}!`;
    }
  }
}
