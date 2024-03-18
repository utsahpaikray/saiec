import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';
@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss'],
})
export class ExamFormComponent implements OnInit {

  examForm!: FormGroup;
  @Input() info: any
  @Input() mode: any
  constructor(private fb:FormBuilder,public modalCtrl: ModalController,public firebaseService:FirebaseService,private toastController: ToastController) { }

  ngOnInit() {
    this.createGalleryForm();
    if(this.mode=='edit'){
      // this.info.items.forEach((item,index) => {
      //   if(this.info.items.length>index+1){
      //     this.addItem();
      //   }
      // });
      this.info.collection.forEach(() => { 
        // if(this.info.collection.length>index+1){
        //   this.addCollectionItem();
        // }
        
      });
     
      
    }
    this.examForm.patchValue(this.info)
    this.examForm?.get('oralTotal')?.patchValue(this.info.oral)
    this.examForm?.get('oralAcc')?.patchValue(this.info.oralAcc)
    this.examForm?.get('writtenTotal')?.patchValue(this.info.writtenTotal)
    this.examForm?.get('writtenAcc')?.patchValue(this.info.writtenAcc)
  }
  createGalleryForm() {
    this.examForm = this.fb.group({
      oralTotal: 0,
      oralAcc: 0,
      writtenTotal: 0,
      writtenAcc:0
    });
   
  }
  createCollectionItem(): FormGroup {
    return this.fb.group({
      item:['',Validators.required],
      price:[0,Validators.required],
      desc:['',Validators.required]
    })
  }
  createItem():FormGroup{
    return this.fb.group({
      item:['',Validators.required],
      price:[0,Validators.required],
      desc:['',Validators.required]
    })
  }
  get f() { return this.examForm.controls; }
  get t() { return this.f['items'] as FormArray; }
  get c() { return this.f['collection'] as FormArray; }

  addItem() {
    this.t.push(this.createItem());
  }

  addCollectionItem() {
    this.c.push(this.createCollectionItem());
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  submit(){
    this.presentToast('top','successfully updated')
    return this.modalCtrl.dismiss(this.examForm.value, 'confirm');
  //   // this.examForm.value.date=this.examForm.value.date.toString()
  //   if(this.mode=='edit'){
  //     this.firebaseService.updateTransactions(this.info.$id,this.examForm.value);
  //   }else{
  //     this.firebaseService.pushItems('event-transactions',this.examForm.value)
  //   }
   
  //   console.log(this.examForm.value)
  //   this.examForm.reset();
  //  this.presentToast('top','successfully updated')
  }
  delete(index: number){
    this.t.removeAt(index)
    this.presentToast('top','successfully removed')
  }
  deleteCollection(index: number){
    this.c.removeAt(index)
    this.presentToast('top','successfully removed')
  }
  async presentToast(position: 'top' | 'middle' | 'bottom',msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position
    });

    await toast.present();
  }
}
