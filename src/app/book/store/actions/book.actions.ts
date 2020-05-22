import { createAction, props } from '@ngrx/store';

import { Book } from '../../models/book';

export const setBooks = createAction(
  '[Book/API] Load Books',
  props<{ books: Book[]; toDatabase: boolean }>()
);

export const addToCart = createAction(
  '[Book Details] Add to Cart',
  props<{ id: string; amount: number; product: Book }>()
);
