import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from "@angular/router";
import { User } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: User;
  constructor(public afAuth: AngularFireAuth, public router: Router) {

  }
  // Sign in with Google
  async login(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password)
    this.router.navigate(['/home']);
    // this.router.navigate(['admin/list']);
  }
  async register(email: string, password: string) {
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password)
    console.log(result)
    this.sendEmailVerification();
  }
  async sendEmailVerification() {
    await this.afAuth.signInWithCredential
    // this.router.navigate(['admin/verify-email']);
  }
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }
  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['admin/login']);
  }
  get isLoggedIn(): boolean {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null
    return user !== null;
  }
  get isAuthorizedUser(): boolean {
    const userString = localStorage.getItem('user');
    const authorizedEmailsString = localStorage.getItem('authorizedEmails');
    const user = userString ? JSON.parse(userString) : null;
    const authorizedEmails = authorizedEmailsString ? JSON.parse(authorizedEmailsString) : [];
    let value=  user?.email ? authorizedEmails.some((emailObj: { id: string }) => emailObj.id === user.email) : false;
    return value
  }


  async loginWithGoogle() {
    await this.afAuth.signInWithPopup(new GoogleAuthProvider())
    this.router.navigate(['/home']);
  }
}
