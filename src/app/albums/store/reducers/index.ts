import { ActionReducer, createFeatureSelector } from '@ngrx/store';
import { Action } from '@ngrx/store';

import * as fromRoot from '../../../store/reducers';
import * as fromAlbum from './album.reducer';

export const albumsFeatureKey = 'albums';

export interface State extends fromRoot.State {
  [albumsFeatureKey]: fromAlbum.State;
}

export const reducers: ActionReducer<fromAlbum.State> = (
  state: fromAlbum.State | undefined,
  action: Action
) => fromAlbum.reducer(state, action);

export const selectAlbumState = createFeatureSelector<State, fromAlbum.State>(
  albumsFeatureKey
);

export const {
  selectIds: selectAlbumIds,
  selectEntities: selectAlbumEntities,
  selectAll: selectAllAlbums,
  selectTotal: selectAlbumTotal,
} = fromAlbum.adapter.getSelectors(selectAlbumState);
