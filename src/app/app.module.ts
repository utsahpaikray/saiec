import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import {  getDatabase, provideDatabase} from '@angular/fire/database'
import {  getAuth, provideAuth } from '@angular/fire/auth';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { MessagingService } from './shared-service/messaging.service';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { UploadFormComponent } from './modules/shared/upload-form/upload-form.component';
import { UploadDetailsComponent } from './modules/shared/upload-details/upload-details.component';
import { UploadListComponent } from './modules/shared/upload-list/upload-list.component';

@NgModule({
  declarations: [AppComponent, UploadFormComponent, UploadListComponent,UploadDetailsComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AngularFireDatabaseModule, //database
    AngularFireMessagingModule,
    AgGridModule, 
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrowserAnimationsModule, 
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideMessaging(() => getMessaging()), provideRemoteConfig(() => getRemoteConfig())

  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  // providers: [
  //   MessagingService,
  //   { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  //   provideAnimationsAsync()
  // ],
  // imports: [
  //   BrowserModule,
  //   ReactiveFormsModule,
  //   IonicModule.forRoot(),
  //   AppRoutingModule,
  //   HttpClientModule,
  //   AngularFirestoreModule, // firestore
  //   AngularFireAuthModule, // auth
  //   AngularFireDatabaseModule, //database
  //   AngularFirestoreModule,
  //   AgGridAngular, 
  //   CalendarModule.forRoot({
  //     provide: DateAdapter,
  //     useFactory: adapterFactory,
  //   }),
  //   BrowserAnimationsModule, 
  //   provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideMessaging(() => getMessaging()), provideRemoteConfig(() => getRemoteConfig())
  // ],
  // declarations: [AppComponent],
  // bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

