import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { loadStudents, loadStudentsFailure, loadStudentsSuccess } from './student.actions';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';

@Injectable()
export class StudentEffects {
  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStudents),
      mergeMap(() =>
        this.firebaseService.getAllstudent().pipe(
          map((students) => loadStudentsSuccess({ students })),
          catchError((error) => of(loadStudentsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private firebaseService: FirebaseService) {}
}
