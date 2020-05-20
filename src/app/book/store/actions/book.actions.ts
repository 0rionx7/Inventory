import { createAction, props } from '@ngrx/store';

import { Book } from '../../models/book';

export const loadBooks = createAction(
  '[Book/API] Load Books',
  props<{ books: Book[]; toDatabase: boolean }>()
);

export const addBookToCart = createAction(
  '[Book Detail] Add to Cart',
  props<{ book: Book }>()
);

// export const addBook = createAction(
//   '[Book/API] Add Book',
//   props<{ book: Book }>()
// );

// export const upsertBook = createAction(
//   '[Book/API] Upsert Book',
//   props<{ book: Book }>()
// );

// export const addBooks = createAction(
//   '[Book/API] Add Books',
//   props<{ books: Book[] }>()
// );

// export const upsertBooks = createAction(
//   '[Book/API] Upsert Books',
//   props<{ books: Book[] }>()
// );

// export const updateBook = createAction(
//   '[Book/API] Update Book',
//   props<{ book: Update<Book> }>()
// );

// export const updateBooks = createAction(
//   '[Book/API] Update Books',
//   props<{ books: Update<Book>[] }>()
// );

// export const deleteBook = createAction(
//   '[Book/API] Delete Book',
//   props<{ id: string }>()
// );

// export const deleteBooks = createAction(
//   '[Book/API] Delete Books',
//   props<{ ids: string[] }>()
// );

// export const clearBooks = createAction('[Book/API] Clear Books');