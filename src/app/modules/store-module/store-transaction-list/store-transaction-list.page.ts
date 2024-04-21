import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from '@shared-service/firebaseService/firebase-service.service';
@Component({
  selector: 'app-store-transaction-form',
  templateUrl: './store-transaction-list.page.html',
  styleUrls: ['./store-transaction-list.page.scss'],
})
export class StoreTransactionListPage implements OnInit {
  myForm!: FormGroup;
  param: any;
  edit: boolean = false;
  name: any;
  bills: any =[];
  constructor(public firebaseService:FirebaseService) { }
  ngOnInit() {
    console.log('called')
    this.getStoreItems()
  }

  getStoreItems(){
     this.firebaseService.getItems('store-transactions').subscribe((items:any)=>{
      console.log(items)
      this.bills = items
    })
    
  }
  toggleDetails(bill: any) {
    bill.showDetails = !bill.showDetails;
  }




}
