import {
  ActionReducer,
  createFeatureSelector,
  combineReducers,
} from '@ngrx/store';
import { Action, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store/reducers';
import * as fromBook from './book.reducer';
import * as fromCart from './cart.reducer';
import { CartItem } from '../../models/cart';

export const booksFeatureKey = 'books';

export interface BookState {
  [booksFeatureKey]: fromBook.State;
  [fromCart.CartFeatureKey]: fromCart.State;
}
export interface State extends fromRoot.State {
  [booksFeatureKey]: BookState;
}

export const reducers: ActionReducer<BookState> = (
  state: BookState | undefined,
  action: Action
) =>
  combineReducers({
    [booksFeatureKey]: fromBook.reducer,
    [fromCart.CartFeatureKey]: fromCart.reducer,
  })(state, action);

export const selectBooksState = createFeatureSelector<State, BookState>(
  booksFeatureKey
);

export const selectBookEntitiesState = createSelector(
  selectBooksState,
  (state: BookState) => state.books
);

export const {
  selectIds: selectBookIds,
  selectEntities: selectBookEntities,
  selectAll: selectAllBooks,
  selectTotal: selectBookTotal,
} = fromBook.adapter.getSelectors(selectBookEntitiesState);

export const mockBook = createSelector(selectAllBooks, (books) => [
  books[6],
  books[4],
]);

// Cart selectors

export const selectCartEntitiesState = createSelector(
  selectBooksState,
  (state: BookState) => state.booksCart
);

export const {
  selectIds,
  selectEntities,
  selectAll: selectAllCartItems,
  selectTotal,
} = fromCart.adapter.getSelectors(selectCartEntitiesState);

export const selectCartTotal = createSelector(
  selectAllCartItems,
  (items: CartItem[]) => {
    let count = 0;
    items.forEach((item) => (count += item.amount));
    return count;
  }
);

export const selectTotalItems = createSelector(
  selectCartEntitiesState,
  fromCart.getTotal
);

export const selectShowAdded = createSelector(
  selectCartEntitiesState,
  fromCart.getShowAdded
);
export const selectShowAddedItem = createSelector(
  selectEntities,
  selectShowAdded,
  (entities, { id, amount }) => ({ item: entities[id], amount })
);
