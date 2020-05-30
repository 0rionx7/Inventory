import { createAction, props } from '@ngrx/store';

import { Book } from '../../../book/models/book';

export const setAlbums = createAction(
  '[Albums/Api] Set Albums',
  props<{ albums: Book[] }>()
);

export const fetchError = createAction(
  '[Albums/Api] Fetched Failed',
  props<{ msg: any }>()
);

export const loadAlbums = createAction('[Album Effects Init} Load Albums');
