import {
  ActionReducerMap,
  MetaReducer,
  ActionReducer,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { environment } from '../../../environments/environment';
import * as fromBook from './book.reducer';

export interface State {
  router: fromRouter.RouterReducerState<any>;
  [fromBook.booksFeatureKey]: fromBook.State;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  [fromBook.booksFeatureKey]: fromBook.reducer,
};

export const bookState = createFeatureSelector<State, fromBook.State>(
  fromBook.booksFeatureKey
);

export const {
  selectIds,
  selectEntities,
  selectAll: selectAllBooks,
  selectTotal,
} = fromBook.adapter.getSelectors(bookState);

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
