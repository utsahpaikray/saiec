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
    const user = userString ? JSON.parse(userString) : null;
    if (user) {
      if (user && user.email == 'utsahpaikray@gmail.com' || user.email == 'swainsubhsmita76@gmail.com' || user.email == 'rachanamaharana565@gmail.com') {
        return true;
      } 
      return false
    } else {
      return false
    }


  }
  async loginWithGoogle() {
    await this.afAuth.signInWithPopup(new GoogleAuthProvider())
    this.router.navigate(['/home']);
  }
}
