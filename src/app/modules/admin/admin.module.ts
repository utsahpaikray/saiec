import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { MatInputModule } from '@angular/material/input';
import { AdminPage } from './admin.page';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    ReactiveFormsModule ,
    MatInputModule
  ],
  declarations: [LoginComponent, AdminPage, LoginComponent, RegisterComponent, ForgotPasswordComponent, VerifyEmailComponent]
})
export class AdminPageModule {}
