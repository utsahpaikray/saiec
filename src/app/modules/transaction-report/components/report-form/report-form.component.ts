import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '@modules/transaction-report/transaction.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent implements OnInit {
  transactionForm!: FormGroup;

  constructor(private fb: FormBuilder, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.transactionForm = this.fb.group({
      name: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      amount: [0, Validators.required],
      voucherNumber: ['', Validators.required],
      description: ['', Validators.required],
      type: [new FormControl('IN'), Validators.required],
      remark: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      this.transactionService.createTransaction(this.transactionForm.value);
      this.transactionForm.reset();
    }
  }
}