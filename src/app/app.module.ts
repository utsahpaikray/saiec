import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@environments/environment.prod';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AgGridModule } from 'ag-grid-angular';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookstoreEffects } from './states/bookStore/bookstore.effects';
import { bookReducerStore } from './states/bookStore/bookstore.reducer';
import { FacultyEffects } from './states/faculty/faculty.effects';
import { facultyReducerStore } from './states/faculty/faculty.reducer';
import { StudentEffects } from './states/student/student.effects';
import { sessionStudentReducerStore, studentReducerStore } from './states/student/student.reducer';
import { FirebaseService } from '@shared-service/firebaseService/firebase-service.service';
// Ensure Firebase is initialized only once
// export function initializeUsers(authService: FirebaseService) {
//   return authService.loadAuthorizedEmails();
// }
export function initializeUsers(authService: FirebaseService): () => Promise<void> {
  return async () => authService.loadAuthorizedEmails();
}
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
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeUsers,
      deps: [FirebaseService],
      multi: true
    }
  ],
  
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

