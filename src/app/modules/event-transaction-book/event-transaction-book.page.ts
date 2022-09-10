import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';

@Component({
  selector: 'app-event-transaction-book',
  templateUrl: './event-transaction-book.page.html',
  styleUrls: ['./event-transaction-book.page.scss'],
})
export class EventTransactionBookPage implements OnInit {
  transactions: { $id: string; }[];

  constructor(public modalCtrl: ModalController,public firebaseService:FirebaseService) { }

  ngOnInit() {
    this.getAllTransactions();
  }
  getAllTransactions() {
    this.firebaseService.getAllEventTransaction().subscribe(items=>{
      console.log(items)
      this.transactions=items;
    })
  }
  public async showModal(info?,mode?:'add') {
    const modal = await this.modalCtrl.create({
      component: TransactionFormComponent,
      cssClass: 'my-custom-class',
      componentProps: { info,mode},
      canDismiss: true,
      mode: 'ios'
    });
    return await modal.present();
  }
}
