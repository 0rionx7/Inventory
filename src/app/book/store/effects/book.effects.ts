import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, withLatestFrom, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs';

import { BookActions } from 'src/app/book/store/actions';
import * as fromBook from 'src/app/book/store/reducers';

@Injectable()
export class BookEffects {
  constructor(private actions$: Actions, private store: Store) {}

  searchBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.searchBook),
      withLatestFrom(this.store.pipe(select(fromBook.selectAllBooks))),
      debounceTime(100),
      switchMap(([{ query }, books]) => {
        let result = books.filter(
          (book) => book.volumeInfo.title.search(query) != -1
        );
        if (query === '' || query === ' ') result = [];
        return of(BookActions.searchSuccess({ books: result }));
      })
    )
  );
}
