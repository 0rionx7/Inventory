import { createAction, props } from '@ngrx/store';

export const authSuccess = createAction(
  '[Auth] Load Auths Success',
  props<{ data: any }>()
);

export const authFailure = createAction(
  '[Auth] Load Auths Failure',
  props<{ error: any }>()
);
