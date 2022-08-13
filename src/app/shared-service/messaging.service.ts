import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { tap } from 'rxjs/operators'
@Injectable()
export class MessagingService {
  token = null;
  currentMessage = new BehaviorSubject(null);
  constructor(private afMessaging: AngularFireMessaging) {}
 
  requestPermission() {
    return this.afMessaging.requestToken.pipe(
      tap(token => {
        console.log('Store token to server: ', token);
      })
    );
  }
 
  getMessages() {
    return this.afMessaging.messages;
  }
 
  deleteToken() {
    if (this.token) {
      this.afMessaging.deleteToken(this.token);
      this.token = null;
    }
  }
}