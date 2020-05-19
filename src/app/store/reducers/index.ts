import {
  ActionReducerMap,
  MetaReducer,
  ActionReducer,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { environment } from '../../../environments/environment';

export interface State {
  router: fromRouter.RouterReducerState<any>;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
};
// prettier-ignore
export const selectRouter =
  createFeatureSelector<State, fromRouter.RouterReducerState<any>>('router');

export const {
  selectCurrentRoute, // select the current route
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = fromRouter.getSelectors(selectRouter);

export const selectUrlSegments = createSelector(selectUrl, (url: string) =>
  url ? url.split('/').splice(1) : url
);

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
