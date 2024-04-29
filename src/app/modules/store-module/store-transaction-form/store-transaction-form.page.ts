import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { FirebaseService } from '@shared-service/firebaseService/firebase-service.service';
import { ToasterService } from '@shared-service/toaster.service';
import { loadBookstore } from 'src/app/states/bookStore/bookstore.actions';
import { selectBookStore } from 'src/app/states/bookStore/bookstore.selector';
import { AppState } from 'src/app/states/state.interface';
@Component({
  selector: 'app-store-transaction-form',
  templateUrl: './store-transaction-form.page.html',
  styleUrls: ['./store-transaction-form.page.scss'],
})
export class StoreTransactionPage implements OnInit {
  storeForm!: FormGroup;
  param: any;
  edit: boolean = false;
  name: any;
  allProducts: any =[];
  totalPrice = 0;
  constructor(private toasterService:ToasterService,private fb:FormBuilder,public firebaseService:FirebaseService, private store:Store<AppState>) { }
  ngOnInit() {
    this.store.dispatch(loadBookstore())
    this.storeForm = this.fb.group({
      customerName:['', Validators.required],
      items: this.fb.array([]),
      billNumber: ['', Validators.required],
      note:['', Validators.required]
    });
    this.addItem()
    this.getStoreItems()
    this.storeForm.valueChanges.subscribe(()=>this.calculateTotal())
  }

  getStoreItems(){
     this.store.pipe(select(selectBookStore)).subscribe((items:any)=>{
      this.allProducts = items
    })
  }
  public setUnitvalue(value: {id: string, name: string}, formIndex: number) {
   const index = this.allProducts.findIndex((item:any) => item.$id === value.id);
  
    if (index !== -1) {
      const unitPrice = this.allProducts[index].SellingPrice;
      const available = this.allProducts[index].Availability;
      const itemsArray = this.storeForm.get('items') as FormArray;
      const itemFormGroup = itemsArray.at(formIndex) as FormGroup;
  
      if (itemFormGroup) {
        itemFormGroup.controls['unitPrice'].patchValue(unitPrice);
        itemFormGroup.controls['quantityAvailable'].patchValue(available);
      }
    } 
  }

  get items(): FormArray {
    return this.storeForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.createItem());
  }
  removeItem(i: number){
    let itemsControl= this.storeForm.controls['items']  as FormArray
    itemsControl.removeAt(i)
  }
  createItem(): FormGroup {
    return this.fb.group({
      productName: ['', Validators.required],
      unitPrice: [0],
      quantityAvailable: [0],
      quantityNeeded: [0, Validators.required],
      totalPrice:[0]
    });
  }

  calculatePrice(item: any) {
    const totalPrice = item.unitPrice * item.quantityNeeded;
    return totalPrice;
  }

  calculateTotal() {
    this.totalPrice = 0
    this.items.value.forEach((item:any )=> {
      this.totalPrice += this.calculatePrice(item);
    });
  }
  public submit() {
    console.log(this.storeForm.value)
    if(!this.storeForm.valid){
      return
    }
    this.storeForm.value.items.forEach((item:any) => {
      item.totalPrice = this.calculatePrice(item)
     item.itemName = item.productName.name   
    })
   this.firebaseService.pushItems('store-transactions', {...this.storeForm.value, totalPrice: this.totalPrice, date: new Date() }).then(()=>{
    this.toasterService.presentToast('Successfully Updated',2000)
    this.mapFormValueWithStore(this.storeForm.value.items)
    this.storeForm.reset()
   }).catch(()=>{
    this.toasterService.presentToast('Error',2000)
   })

    }
    mapFormValueWithStore(items: any[]) {
      return items.map(item => {
        console.log(item)
        const storeItem = this.allProducts.find((s: any) => s.$id === item.productName.name);
    
        if (storeItem) {
          const updatedStoreItem = {
            ...storeItem,
            Availability: storeItem.Availability - item.quantityNeeded
          };
          console.log(updatedStoreItem)
         this.firebaseService.updateProduct(updatedStoreItem.$id, updatedStoreItem)
        }
      });
    }

}
