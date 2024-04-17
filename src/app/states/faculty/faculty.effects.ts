import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { loadFaculty, loadFacultyFailure, loadFacultySuccess } from './faculty.actions';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';

@Injectable()
export class FacultyEffects {
  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFaculty),
      mergeMap(() =>
        this.firebaseService.getAllFaculty().pipe(
          map((faculty) => loadFacultySuccess({ faculty })),
          catchError((error) => of(loadFacultyFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private firebaseService: FirebaseService) {}
}
