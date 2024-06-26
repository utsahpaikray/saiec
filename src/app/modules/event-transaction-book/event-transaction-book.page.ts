import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../shared-service/auth-service.service';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';

@Component({
  selector: 'app-event-transaction-book',
  templateUrl: './event-transaction-book.page.html',
  styleUrls: ['./event-transaction-book.page.scss'],
})
export class EventTransactionBookPage implements OnInit {
  transactions: any[] =[];
  totalCollection=0;
  totalExpeniditure=0;
  isAuthorized = false;
  constructor(public modalCtrl: ModalController,public firebaseService:FirebaseService, private authService: AuthService) { }

  ngOnInit() {
    this.getAllTransactions();
    this.isAuthorized = this.authService.isAuthorizedUser
  }
  getAllTransactions() {
    this.firebaseService.getAllEventTransaction().subscribe(items=>{
      console.log(items)
      this.transactions=items;
      
      items.forEach((item: any)=>{
        let totalCollection=0;
        let totalExpeniditure=0;
        item['collection'].forEach((item: any) => {
          totalCollection= totalCollection+Number(item.price)
        });
        item['items'].forEach((item: { price: any; }) => {
          totalExpeniditure=totalExpeniditure+Number(item.price)
        });
        item['totalCollection']=totalCollection;
        item['totalExpeniditure']=totalExpeniditure
        console.log(item)
        item['balance']=totalCollection-totalExpeniditure;
      })
   
    })
  }
  public async showModal(info?: any,mode:string='add') {
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
