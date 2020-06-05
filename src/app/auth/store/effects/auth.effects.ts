import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  pluck,
  exhaustMap,
  tap,
  switchMap,
} from 'rxjs/operators';
import { of, pipe } from 'rxjs';

import { AuthActions } from '../actions';
import { AuthService } from '../../services/auth.service';
import { Credentials } from '../../models/user';

@Injectable()
export class AuthEffects {
  operator = pipe(
    pluck('user'),
    map(({ email, uid }) => {
      return AuthActions.authSuccess({ email, uid });
    }),
    catchError((error) => of(AuthActions.authFailure({ error })))
  );

  logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logIn),
      map((action) => action.credentials),
      switchMap((auth: Credentials | null) => {
        return auth
          ? this.authService.login(auth).pipe(this.operator)
          : this.authService.googleLogIn().pipe(this.operator);
      })
    )
  );

  loadUser$ = createEffect(
    () =>
      this.afs.user.pipe(
        tap((user) => {
          if (user) {
            var styleArray = [
              `background-image: url(${user.photoURL})`,
              'background-size: cover',
              'padding: 10px 20px',
              'line-height: 135px',
              'border : 5px solid black',
            ];
            console.log(`%c${user.displayName}`, styleArray.join(';'));
            user.getIdTokenResult().then((idTokenResult) => {
              // Make sure all the times are in milliseconds!
              console.log(idTokenResult);
            });
          }
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private afs: AngularFireAuth
  ) {}
}
