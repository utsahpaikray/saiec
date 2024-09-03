import { Component, inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from '@shared-service/firebaseService/firebase-service.service';
interface AuthorizedEmail {
  canWrite: boolean;
}
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  authorizedEmails: any[] = [];
  newEmail: string = '';
  newCanWrite: boolean = true;
  private firestore = inject(AngularFirestore)
  private firebaseService = inject(FirebaseService)
  ngOnInit() {
    this.loadAuthorizedEmails();
  }

    loadAuthorizedEmails() {
      this.firebaseService.getAllAuthorizedUsers().subscribe((res) => {
        this.authorizedEmails = res.map((item:any) => {
          const canWrite = item['canWrite'];
          const id = item.id;
          return { id, canWrite };
        });
      })
    }

  addEmail() {
    if (this.newEmail.trim()) {
      this.firestore.collection('authorizedEmails').doc(this.newEmail).set({
        canWrite: this.newCanWrite
      }).then(() => {
        this.newEmail = '';
        this.newCanWrite = true;
      });
    }
  }

  updateEmail(email:any) {
    this.firestore.collection('authorizedEmails').doc(email.id).update({
      canWrite: email.canWrite
    });
  }

  deleteEmail(id: string) {
    this.firestore.collection('authorizedEmails').doc(id).delete();
  }
}
