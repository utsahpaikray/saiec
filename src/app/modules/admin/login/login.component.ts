import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@shared-service/auth-service.service';
import { ToasterService } from '@shared-service/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  constructor(private  authService:  AuthService,private toasterService:ToasterService) { }
  ngOnInit() {
    
    this.createLoginForm()
  }
  createLoginForm() {
    this.myForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
  }
login(){
  this.authService.login(this.myForm?.get('email')?.value,this.myForm?.get('password')?.value).then(user=>{
    this.toasterService.presentToast('Succesfull Login',2000)
  },(err=>{
    this.toasterService.presentToast(err,2000)
    localStorage.removeItem('user');
  }))
}
loginGoogle(){
  this.authService.loginWithGoogle().then(user=>{
    })
}
register(){
  this.authService.register(this.myForm?.get('email')?.value,this.myForm?.get('password')?.value).then(user=>{
    this.toasterService.presentToast('Succesfull Login',2000)
  },(err=>{
    this.toasterService.presentToast(err,2000)
    localStorage.removeItem('user');
  }))
  
}
}
