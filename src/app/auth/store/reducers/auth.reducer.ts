import { createReducer, on } from '@ngrx/store';

import { AuthActions } from '../actions';
import { User } from '../../models/user';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.authSuccess, (state, { email, uid }) => ({
    ...state,
    user: { email, uid },
  }))
);

export const getUser = (state: State) => state.user;
