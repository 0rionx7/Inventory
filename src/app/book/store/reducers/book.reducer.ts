import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Book } from '../../models/book';
import * as BookActions from '../actions/book.actions';

export interface State extends EntityState<Book> {}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(BookActions.setBooks, (state, action) =>
    adapter.setAll(action.books, state)
  )
);
