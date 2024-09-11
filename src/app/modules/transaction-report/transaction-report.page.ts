import { Component, inject, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, AnimationController, ModalController } from '@ionic/angular';
import { ReportFormComponent } from './components/report-form/report-form.component';
import { TransactionService } from './transaction.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.page.html',
  styleUrls: ['./transaction-report.page.scss']
})
export class TransactionReportPage {
  private transactionService = inject(TransactionService)
  private modalController = inject(ModalController)
  private animationCtrl = inject(AnimationController)
  private actionSheetController = inject(ActionSheetController)
  private alertController = inject(AlertController)



  private filterSubject = new BehaviorSubject<string>('all');
  private selectedDateSubject = new BehaviorSubject<string>('');
  private selectedMonthSubject = new BehaviorSubject<string>('');
  private selectedTypeSubject = new BehaviorSubject<string>('');
  private selectedTagSubject = new BehaviorSubject<string>('');

  filter$ = this.filterSubject.asObservable();
  selectedDate$ = this.selectedDateSubject.asObservable();
  selectedMonth$ = this.selectedMonthSubject.asObservable();
  selectedType$ = this.selectedTypeSubject.asObservable();
  selectedTag$ = this.selectedTagSubject.asObservable();

  transactions$: Observable<any[]> = this.transactionService.getAllTransactions();

  transactionTags = [
    'Staff Payment (SP)',
    'School Fee (SF)',
    'Offering (OFR)',
    'Auto Fee (AF)',
    'Store Payment (StrP)',
    'Admission(AD)',
    'Readmission(RAD)',
    'Festival(FE)',
    'Other(OT)'
  ];

  totalIn$!: Observable<number>;
  totalOut$!: Observable<number>;
  totalAmount$!: Observable<number>;
 

  filteredTransactions$: Observable<any[]> = combineLatest([
    this.transactions$,
    this.filter$,
    this.selectedDate$,
    this.selectedMonth$,
    this.selectedType$,
    this.selectedTag$
  ]).pipe(
    tap(value => console.log('Filter values:', value)),
    map(([transactions, filter, selectedDate, selectedMonth, selectedType, selectedTag]) => {
      switch (filter) {
        case 'day':
          return transactions.filter(t =>
            new Date(t.date).toDateString() === new Date(selectedDate).toDateString()
          );
        case 'month':
          const [year, month] = selectedMonth.split('-');
          return transactions.filter(t => {
            const tDate = new Date(t.date);
            return tDate.getFullYear() === +year && tDate.getMonth() === +month - 1;
          });
        case 'type':
          return transactions.filter(t =>
            selectedType ? t.type.toLowerCase() === selectedType.toLowerCase() : true
          );
        case 'tag':
          return transactions.filter(t => t.tag === selectedTag);
        default:
          return transactions;
      }
    }),shareReplay(1)
  );
  summary$: Observable<{ totalIn: number; totalOut: number; totalAmount: number }> = this.filteredTransactions$.pipe(
    map(transactions => {
      const totalIn = transactions.reduce((acc, transaction) => {
        return transaction.type === 'IN' ? acc + transaction.amount : acc;
      }, 0);
      const totalOut = transactions.reduce((acc, transaction) => {
        return transaction.type === 'OUT' ? acc + transaction.amount : acc;
      }, 0);
      const totalAmount = totalIn - totalOut;
      return { totalIn, totalOut, totalAmount };
    }),
    shareReplay(1) 
  );
  

  async openReportForm() {
    const newTransaction = await this.presentTransactionModal();
    if (newTransaction) {
      await this.transactionService.createTransaction(newTransaction);
    }
  }

  async updateTransaction(id: string, transaction: any) {
    const updatedTransaction = await this.presentTransactionModal(true, transaction);
    if (updatedTransaction) {
      await this.transactionService.updateTransaction(id, updatedTransaction);
    }
  }

  deleteTransaction(id: string) {
    this.transactionService.deleteTransaction(id)
  }

  private async presentTransactionModal(isEdit: boolean = false, transaction?: any) {
    const modal = await this.modalController.create({
      component: ReportFormComponent,
      mode: 'ios',
      cssClass: 'left-modal',
      breakpoints: [0, 0.25, 0.5, 0.75],
      initialBreakpoint: 0.75,
      backdropBreakpoint: 0,
      handle: false,
      keyboardClose: true,
      showBackdrop: true,
      canDismiss: true,
      backdropDismiss: false,
      enterAnimation: this.enterAnimation,
      leaveAnimation: this.leaveAnimation,
      componentProps: {
        closeModal: () => modal.dismiss(),
        isEdit,
        transactionData: isEdit ? { ...transaction, id: transaction.$id } : undefined
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    return data && data.updatedTransaction ? data.updatedTransaction : null;
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

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Filter by',
      buttons: [
        {
          text: 'All',
          handler: () => {
            this.filterSubject.next('all');
          },
        },
        {
          text: 'Day',
          handler: async () => {
            this.filterSubject.next('day');
            await this.presentDatePicker();
          },
        },
        {
          text: 'Month',
          handler: async () => {
            this.filterSubject.next('month');
            await this.presentMonthPicker();
          },
        },
        {
          text: 'Tag',
          handler: async () => {
            this.filterSubject.next('tag');
            await this.presentTagPicker();
          },
        },
        {
          text: 'Type (In/Out)',
          handler: async () => {
            this.filterSubject.next('type');
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
          value: '',
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
            this.selectedDateSubject.next(data.selectedDate);
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
          value: '',
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
            this.selectedMonthSubject.next(data.selectedMonth);
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
        },
        {
          name: 'selectedType',
          type: 'radio',
          label: 'Out',
          value: 'out',
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
            this.selectedTypeSubject.next(data);
          },
        },
      ],
    });
    await alert.present();
  }

  async presentTagPicker() {
    const alert = await this.alertController.create({
      header: 'Select Tag',
      inputs: this.transactionTags.map(tag => ({
        name: 'selectedTag',
        type: 'radio',
        label: tag,
        value: tag,
      })),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: (data) => {
            this.selectedTagSubject.next(data);
          },
        },
      ],
    });
    await alert.present();
  }
}
