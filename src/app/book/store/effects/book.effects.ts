import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, withLatestFrom, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs';

import { BookActions } from '@inventory-app/book/store/actions';
import * as fromBook from '@inventory-app/book/store/reducers';

@Injectable()
export class BookEffects {
  constructor(private actions$: Actions, private store: Store) {}

  searchBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.searchBook),
      withLatestFrom(this.store.pipe(select(fromBook.selectAllBooks))),
      debounceTime(1000),
      switchMap(([{ query }, books]) => {
        const result = books.filter(
          (book) => book.volumeInfo.title.search(query) != -1
        );
        return of(BookActions.searchSuccess({ books: result }));
      })
    )
  );
}
