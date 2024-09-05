
import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';
import { ActionSheetController, AnimationController, Gesture, GestureController, ModalController, Platform } from '@ionic/angular';
import { ReportFormComponent } from './components/report-form/report-form.component';
@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.page.html',
  styleUrls: ['./transaction-report.page.scss']
})
export class TransactionReportPage  {
  transactions!: any[];

  constructor(private transactionService: TransactionService, private modalController: ModalController, private animationCtrl: AnimationController, private platform: Platform,
    private gestureCtrl: GestureController, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit(): void {
    this.transactionService.getAllTransactions().subscribe((transactions: any[]) => {
      console.log(transactions)
      this.transactions = transactions;
    });
  }

  createTransaction(transaction: any) {
    let data = {
      ...transaction,
      date: new Date()
    }
    this.transactionService.createTransaction(data);
  }

  updateTransaction(id: string, transaction: any) {
    this.transactionService.updateTransaction(id, transaction);
  }

  deleteTransaction(id: string) {
    this.transactionService.deleteTransaction(id);
  }
  public enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  public leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
  async openReportForm() {
    // const enterAnimation = (baseEl: HTMLElement) => {
    //   const root = baseEl.shadowRoot;
    //   const backdropAnimation = this.animationCtrl.create()
    //     .addElement(root?.querySelector('ion-backdrop')!)
    //     .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    //   const wrapperAnimation = this.animationCtrl.create()
    //     .addElement(root?.querySelector('.modal-wrapper')!)
    //     .keyframes([
    //       { offset: 0, opacity: '0', transform: 'translateX(-100%)' },
    //       { offset: 1, opacity: '1', transform: 'translateX(0)' }
    //     ]);

    //   return this.animationCtrl.create()
    //     .addElement(baseEl)
    //     .easing('ease-out')
    //     .duration(300)
    //     .addAnimation([backdropAnimation, wrapperAnimation]);
    // };

    // const leaveAnimation = (baseEl: HTMLElement) => {
    //   return enterAnimation(baseEl).direction('reverse');
    // };
   

    const modal = await this.modalController.create({
      component: ReportFormComponent,
      mode: 'ios',
      cssClass:'left-modal',
      breakpoints: [0, 0.25, 0.5, 0.75],
      initialBreakpoint: 0.75,
      backdropBreakpoint: 0,
      handle: false,
      keyboardClose: true,
      showBackdrop: true,
      canDismiss: true,
      enterAnimation: this.enterAnimation,
      leaveAnimation:this.leaveAnimation
    });

    modal.onDidDismiss().then(({ data, role }) => {
      if (role === 'confirm') {
        console.log('New transaction:', data);
        // Handle the new transaction data
      }
    });

    await modal.present();
  }

}