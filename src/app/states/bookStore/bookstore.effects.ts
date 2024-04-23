import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';
import { loadBookstore, loadBookstoreFailure, loadBookstoreSuccess } from './bookstore.actions';

@Injectable()
export class BookstoreEffects {
  loadbookStoreState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBookstore),
      mergeMap(() =>
        this.firebaseService.getAllProducts().pipe(
          map((bookStore) => loadBookstoreSuccess({ bookStore })),
          catchError((error) => of(loadBookstoreFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private firebaseService: FirebaseService) {}
}
