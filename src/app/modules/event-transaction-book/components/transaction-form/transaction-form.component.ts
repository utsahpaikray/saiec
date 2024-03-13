import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';
import * as _moment from 'moment';
@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {

  transactionForm: FormGroup;
  @Input() info
  @Input() mode
  constructor(private fb:FormBuilder,public modalCtrl: ModalController,public firebaseService:FirebaseService,private toastController: ToastController) { }

  ngOnInit() {
    this.createGalleryForm();
    if(this.mode=='edit'){
      this.info.items.forEach((item,index) => {
        if(this.info.items.length>index+1){
          this.addItem();
        }
      });
      this.info.collection.forEach((item,index) => { 
        if(this.info.collection.length>index+1){
          this.addCollectionItem();
        }
        
      });
      
      this.transactionForm.patchValue(this.info)
    }
  }
  createGalleryForm() {
    this.transactionForm = this.fb.group({
      eventName: '',
      date: '',
      description: '',
      items:this.fb.array([this.createItem()]),
      collection:this.fb.array([this.createCollectionItem()])
    });
   
  }
  createCollectionItem(): FormGroup {
    return this.fb.group({
      item:['',Validators.required],
      price:[0,Validators.required],
      desc:['',Validators.required]
    })
  }
  createItem(): FormGroup{
    return this.fb.group({
      item:['',Validators.required],
      price:[0,Validators.required],
      desc:['',Validators.required]
    })
  }
  get f() { return this.transactionForm.controls; }
  get t() { return this.f.items as FormArray; }
  get c() { return this.f.collection as FormArray; }

  addItem() {
    this.t.push(this.createItem());
  }

  addCollectionItem() {
    this.c.push(this.createCollectionItem());
  }
  submit(){
    // this.transactionForm.value.date=this.transactionForm.value.date.toString()
    if(this.mode=='edit'){
      this.firebaseService.updateTransactions(this.info.$id,this.transactionForm.value);
    }else{
      this.firebaseService.pushItems('event-transactions',this.transactionForm.value)
    }
   
    console.log(this.transactionForm.value)
    this.transactionForm.reset();
   this.presentToast('top','successfully updated')
  }
  delete(index){
    this.t.removeAt(index)
    this.presentToast('top','successfully removed')
  }
  deleteCollection(index){
    this.c.removeAt(index)
    this.presentToast('top','successfully removed')
  }
  async presentToast(position: 'top' | 'middle' | 'bottom',msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position
    });

    await toast.present();
  }
}
