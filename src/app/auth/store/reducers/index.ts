import {
  ActionReducer,
  Action,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromAuth from './auth.reducer';
import * as fromRoot from '../../../store/reducers';

export const authFeatureKey = 'auth';

export interface State extends fromRoot.State {
  [authFeatureKey]: fromAuth.State;
}

export const reducers: ActionReducer<fromAuth.State> = (
  state: fromAuth.State | undefined,
  action: Action
) => fromAuth.reducer(state, action);

export const selectAuthState = createFeatureSelector<State, fromAuth.State>(
  authFeatureKey
);

export const selectUser = createSelector(selectAuthState, fromAuth.getUser);
