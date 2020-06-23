import { createReducer, on } from '@ngrx/store';

import { BookActions } from 'src/app/book/store/actions';
import { Book } from 'src/app/book/models';

export const searchFeatureKey = 'search';

export interface State {
  books: Book[];
  loading: boolean;
  error: string;
  query: string;
}

const initialState: State = {
  books: [],
  loading: false,
  error: '',
  query: '',
};

export const reducer = createReducer(
  initialState,
  on(BookActions.searchBook, (state, { query }) => {
    return query === ''
      ? {
          books: [],
          loading: false,
          error: '',
          query,
        }
      : {
          ...state,
          loading: true,
          error: '',
          query,
        };
  }),
  on(BookActions.searchSuccess, (state, { books }) => ({
    books,
    loading: false,
    error: '',
    query: state.query,
  })),
  on(BookActions.searchFailure, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getBooks = (state: State) => state.books;
export const getQuery = (state: State) => state.query;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
