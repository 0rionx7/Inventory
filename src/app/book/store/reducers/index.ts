import {
  ActionReducer,
  createFeatureSelector,
  combineReducers,
} from '@ngrx/store';
import { Action, createSelector } from '@ngrx/store';

import { CartItem, Book } from '@inventory-app/book/models';
import * as fromRoot from '@inventory-app/store/reducers';
import * as fromBook from '@inventory-app/book/store/reducers/book.reducer';
import * as fromCart from '@inventory-app/book/store/reducers/cart.reducer';
import * as fromSearch from '@inventory-app/book/store/reducers/search.reducer';

export const booksFeatureKey = 'booksStore';

export interface BookState {
  [fromBook.BooksFeatureKey]: fromBook.State;
  [fromCart.CartFeatureKey]: fromCart.State;
  [fromSearch.searchFeatureKey]: fromSearch.State;
}
export interface State extends fromRoot.State {
  [booksFeatureKey]: BookState;
}

export const reducers: ActionReducer<BookState> = (
  state: BookState | undefined,
  action: Action
) =>
  combineReducers({
    [fromBook.BooksFeatureKey]: fromBook.reducer,
    [fromCart.CartFeatureKey]: fromCart.reducer,
    [fromSearch.searchFeatureKey]: fromSearch.reducer,
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

export const selectBookById = createSelector(
  selectAllBooks,
  (books: Book[], props: { id: string }) =>
    books.filter((book) => book.id === props.id)
);

export const mockBook = createSelector(selectAllBooks, (books) => [
  books[6],
  books[4],
]);

// Cart Selectors

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

// Search Selectors

export const selectSearchState = createSelector(
  selectBooksState,
  (state: BookState) => state.search
);

export const selectSearchResult = createSelector(
  selectSearchState,
  fromSearch.getBooks
);

export const selectSearchQuery = createSelector(
  selectSearchState,
  fromSearch.getQuery
);
