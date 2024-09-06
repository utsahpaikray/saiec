
import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';
import { ActionSheetController, AlertController, AnimationController, Gesture, GestureController, ModalController, Platform } from '@ionic/angular';
import { ReportFormComponent } from './components/report-form/report-form.component';
@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.page.html',
  styleUrls: ['./transaction-report.page.scss']
})
export class TransactionReportPage  {
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  filter: string = 'all';
  selectedDate: string = '';
  selectedMonth: string = '';
  selectedType: string = '';
  totalIn: number = 0;
  totalOut: number = 0;
  totalAmount: number = 0;

  constructor(private transactionService: TransactionService, private modalController: ModalController, private animationCtrl: AnimationController, private platform: Platform,
    private gestureCtrl: GestureController, private actionSheetController: ActionSheetController, private alertController: AlertController) { }

  ngOnInit(): void {
    this.transactionService.getAllTransactions().subscribe((transactions: any[]) => {
      this.transactions = transactions;
      this.applyFilter();
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
  applyFilter() {
    switch (this.filter) {
      case 'day':
        this.filteredTransactions = this.transactions.filter(t =>
          new Date(t.date).toDateString() === new Date(this.selectedDate).toDateString()
        );
        break;
      case 'month':
        const [year, month] = this.selectedMonth.split('-');
        this.filteredTransactions = this.transactions.filter(t => {
          const tDate = new Date(t.date);
          return tDate.getFullYear() === +year && tDate.getMonth() === +month - 1;
        });
        break;
      case 'type':
        this.filteredTransactions = this.transactions.filter(t =>
          t.type.toLowerCase() === this.selectedType.toLowerCase()
        );
        break;
      default:
        this.filteredTransactions = this.transactions;
    }
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalIn = this.filteredTransactions
      .filter(t => t.type.toLowerCase() === 'in')
      .reduce((sum, t) => sum + t.amount, 0);

    this.totalOut = this.filteredTransactions
      .filter(t => t.type.toLowerCase() === 'out')
      .reduce((sum, t) => sum + t.amount, 0);

    this.totalAmount = this.totalIn - this.totalOut;
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Filter by',
      buttons: [
        {
          text: 'All',
          handler: () => {
            this.filter = 'all';
            this.applyFilter();
          },
        },
        {
          text: 'Day',
          handler: async () => {
            this.filter = 'day';
            await this.presentDatePicker();
          },
        },
        {
          text: 'Month',
          handler: async () => {
            this.filter = 'month';
            await this.presentMonthPicker();
          },
        },
        {
          text: 'Type (In/Out)',
          handler: async () => {
            this.filter = 'type';
            await this.presentTypePicker();
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  async presentDatePicker() {
    const alert = await this.alertController.create({
      header: 'Select Date',
      inputs: [
        {
          name: 'selectedDate',
          type: 'date',
          value: this.selectedDate,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: (data) => {
            this.selectedDate = data.selectedDate;
            this.applyFilter();
          },
        },
      ],
    });
    await alert.present();
  }

  async presentMonthPicker() {
    const alert = await this.alertController.create({
      header: 'Select Month',
      inputs: [
        {
          name: 'selectedMonth',
          type: 'month',
          value: this.selectedMonth,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: (data) => {
            this.selectedMonth = data.selectedMonth;
            this.applyFilter();
          },
        },
      ],
    });
    await alert.present();
  }

  async presentTypePicker() {
    const alert = await this.alertController.create({
      header: 'Select Type',
      inputs: [
        {
          name: 'selectedType',
          type: 'radio',
          label: 'In',
          value: 'in',
          checked: this.selectedType === 'in',
        },
        {
          name: 'selectedType',
          type: 'radio',
          label: 'Out',
          value: 'out',
          checked: this.selectedType === 'out',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: (data) => {
            this.selectedType = data;
            this.applyFilter();
          },
        },
      ],
    });
    await alert.present();
  }


}