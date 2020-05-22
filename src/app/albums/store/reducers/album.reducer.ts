import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Book } from '../../../book/models/book';
import { AlbumActions } from '../actions';

export interface State extends EntityState<Book> {}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(AlbumActions.setAlbums, (state, { albums }) =>
    adapter.setAll(albums, state)
  )
);
