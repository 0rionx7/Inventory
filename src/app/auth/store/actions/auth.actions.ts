import { createAction, props } from '@ngrx/store';

import { Credentials } from '../../models/user';

export const authSuccess = createAction(
  '[Auth] Load Auth Success',
  props<{ email: string; uid: string }>()
);

export const authFailure = createAction(
  '[Auth] Load Auth Failure',
  props<{ error: any }>()
);

export const logIn = createAction(
  '[Login Page] Log In',
  props<{ credentials: Credentials }>()
);
