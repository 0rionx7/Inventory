import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { BookActions } from 'src/app/book/store/actions';
import { Book } from 'src/app/book/models';

export const BooksFeatureKey = 'books';

export interface State extends EntityState<Book> {}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(BookActions.setBooks, (state, action) =>
    adapter.setAll(action.books, state)
  )
);
