import { Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take, takeUntil } from 'rxjs';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-store-transaction-form',
  templateUrl: './store-transaction-form.page.html',
  styleUrls: ['./store-transaction-form.page.scss'],
})
export class StoreTransactionPage implements OnInit {
submit() {
throw new Error('Method not implemented.');
}
  myForm!: FormGroup;
  param: any;
  edit: boolean = false;
  name: any;
  allProducts: any =[];
  constructor(private modalCtrl: ModalController, private fb:FormBuilder,public firebaseService:FirebaseService,private route : ActivatedRoute) { }
  ngOnInit() {
    this.myForm = this.fb.group({
      customerName:[''],
      items: this.fb.array([]),
      billNumber: [''],
      note:['']
    });
    this.addItem()
    this.getStoreItems()
  }

  getStoreItems(){
     this.firebaseService.getAllProducts().subscribe((items:any)=>{
      console.log(items)
      this.allProducts = items
    })
  }
  public setUnitvalue(value: string, formIndex: number) {
    const index = this.allProducts.findIndex((item:any) => item.Name === value);
  
    if (index !== -1) {
      const unitPrice = this.allProducts[index].SellingPrice;
      const available = this.allProducts[index].Availability;
      const itemsArray = this.myForm.get('items') as FormArray;
      const itemFormGroup = itemsArray.at(formIndex) as FormGroup;
  
      if (itemFormGroup) {
        itemFormGroup.controls['unitPrice'].patchValue(unitPrice);
        itemFormGroup.controls['quantityAvailable'].patchValue(available);
      }
    } 
  }

  get items(): FormArray {
    return this.myForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.fb.group({
      itemName: [''],
      unitPrice: [0],
      quantityAvailable: [0],
      quantityNeeded: [0]
    });
  }

  calculatePrice(item: any) {
    console.log(item)
    // Implement your calculation logic here
    const totalPrice = item.unitPrice * item.quantityNeeded;
    return totalPrice;
  }

  calculateTotal() {
    // Implement calculation of total price for all items
    let totalPrice = 0;
    this.items.value.forEach((item:any )=> {
      totalPrice += this.calculatePrice(item);
    });
    return totalPrice;
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}
