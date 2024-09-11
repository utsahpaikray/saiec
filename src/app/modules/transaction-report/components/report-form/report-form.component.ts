import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TransactionService } from '@modules/transaction-report/transaction.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent implements OnInit {
  transactionForm!: FormGroup;
  @Input()
  closeModal!: () => void;
  @Input() isEdit: boolean = false;
  @Input() transactionData: any;
  transactionTags: string[] = [
    'Staff Payment (SP)',
    'School Fee (SF)',
    'Offering (OFR)',
    'Auto Fee (AF)',
    'Store Payment (StrP)',
    'Admission(AD)',
    'Readmiddion(RAD)',
    'Festival(FE)',
    'Other(OT)'
  ];
  isDetailView = false;
  constructor(private fb: FormBuilder,private modalController: ModalController) { }

  ngOnInit(): void {
    this.createForm();
    if (this.isEdit && this.transactionData) {
      this.transactionForm.patchValue(this.transactionData);
    }
   
  }

  createForm(): void {
    this.transactionForm = this.fb.group({
      name: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      amount: [0, Validators.required],
      voucherNumber: ['', Validators.required],
      description: ['', Validators.required],
      type: [new FormControl('IN'), Validators.required],
      remark: ['', Validators.required],
      tag: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const transactionData = this.transactionForm.value;
      this.modalController.dismiss({
        isEdit: this.isEdit,
        updatedTransaction: transactionData
      });
    }
  }
  toggleView() {
    this.isDetailView = !this.isDetailView;
  }
}