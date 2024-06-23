import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { environment } from '@environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { sessionStudentReducerStore, studentReducerStore } from './states/student/student.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from './states/student/student.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { facultyReducerStore } from './states/faculty/faculty.reducer';
import { FacultyEffects } from './states/faculty/faculty.effects';
import { ServiceWorkerModule } from '@angular/service-worker';
import { bookReducerStore } from './states/bookStore/bookstore.reducer';
import { BookstoreEffects } from './states/bookStore/bookstore.effects';
import {provideAnimationsAsync } from '@angular/platform-browser/animations/async'
@NgModule({
  declarations: [AppComponent],
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
    StoreModule.forRoot({sessionStudents: sessionStudentReducerStore, students:studentReducerStore, faculty:facultyReducerStore, bookStore: bookReducerStore}),
    EffectsModule.forRoot([StudentEffects, FacultyEffects, BookstoreEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: true,
      connectInZone: true
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

