import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent implements OnInit {

  name: string ='';
  transactionForm!: FormGroup;
  constructor(private modalCtrl: ModalController, private fb: FormBuilder) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.transactionForm = this.fb.group({
      date: new Date(),
      amount: 0,
      state: '',
      voucherNumber: '',
      description: '',
      type: '',
      remark:''
    });
    this.transactionForm.valueChanges.subscribe(res => {
      console.log(res);
    })
  }

}
