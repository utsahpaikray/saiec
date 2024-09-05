import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private dbPath = 'daily-transaction';
    private transactionsCollection: AngularFirestoreCollection<any>;

    constructor(private firestore: AngularFirestore) {
        this.transactionsCollection = this.firestore.collection(this.dbPath);
    }

    getAllTransactions(): any {
        return this.transactionsCollection.valueChanges({ idField: '$id' });
    }

    createTransaction(transaction: any): any {
        return this.transactionsCollection.add(transaction);
    }

    updateTransaction(id: string, transaction: any): Promise<any> {
        return this.transactionsCollection.doc(id).update(transaction);
    }

    deleteTransaction(id: string): Promise<any> {
        return this.transactionsCollection.doc(id).delete();
    }
}