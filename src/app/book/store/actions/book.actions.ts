import { createAction, props } from '@ngrx/store';

import { Book } from '../../models/book';

export const setBooks = createAction(
  '[Books/API] Set Books',
  props<{ books: Book[]; toDatabase: boolean }>()
);

export const fetchError = createAction(
  '[Books/API] Fetched Failed',
  props<{ msg: any }>()
);

export const addToCart = createAction(
  '[Book Details] Add to Cart',
  props<{ id: string; amount: number; product: Book }>()
);
