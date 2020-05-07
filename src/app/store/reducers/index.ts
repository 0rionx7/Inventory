import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { Action } from '@ngrx/store';

export interface State {}

export const reducers: ActionReducerMap<State> = {};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  console.log('METAAAAAAAAAAAAAAAAA');
  return function (state, action) {
    console.log(state);
    reducer(state, action);
  };
}
