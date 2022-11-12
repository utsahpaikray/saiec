import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;
  constructor(public afAuth: AngularFireAuth, public router: Router) {

  }
  // Sign in with Google
  async login(email: string, password: string) {
    var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    this.router.navigate(['/home']);
    // this.router.navigate(['admin/list']);
  }
  async register(email: string, password: string) {
    var result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    this.sendEmailVerification();
  }
  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification()
    // this.router.navigate(['admin/verify-email']);
  }
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }
  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['admin/login']);
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
  get isAuthorizedUser(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.email == 'utsahpaikray@gmail.com' || user.email == 'swainsubhsmita76@gmail.com') {
      return true;
    } else {
      return false;
    }

  }
  async loginWithGoogle() {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    this.router.navigate(['/home']);
  }
}
