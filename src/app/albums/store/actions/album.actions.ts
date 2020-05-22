import { createAction, props } from '@ngrx/store';

import { Book } from '../../../book/models/book';

export const setAlbums = createAction(
  '[Albums Effect Init] Set Albums',
  props<{ albums: Book[] }>()
);

export const loadAlbums = createAction('[Album/Api] Load Albums');
