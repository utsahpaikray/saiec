import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { environment } from '../environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadDetailsComponent } from './modules/shared/upload-details/upload-details.component';
import { UploadFormComponent } from './modules/shared/upload-form/upload-form.component';
import { UploadListComponent } from './modules/shared/upload-list/upload-list.component';
import { StoreModule } from '@ngrx/store';
import { studentReducerStore } from './states/student/student.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from './states/student/student.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { facultyReducerStore } from './states/faculty/faculty.reducer';
import { FacultyEffects } from './states/faculty/faculty.effects';
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
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideMessaging(() => getMessaging()), provideRemoteConfig(() => getRemoteConfig()),
    StoreModule.forRoot({students:studentReducerStore, faculty:facultyReducerStore}),
    EffectsModule.forRoot([StudentEffects, FacultyEffects]),
    // StoreModule.forRoot({faculty:facultyReducerStore}),
    // EffectsModule.forRoot([FacultyEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: true,
      connectInZone: true
    })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

