import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import {
  Actions,
  ofType,
  createEffect,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { SidenavService } from '../../navigation/services/sidenav.service';
import { MenuItem } from 'src/app/navigation/models/models';
import { SidenavApiActions } from 'src/app/navigation/store/actions';
import { BookActions } from '../../book/store/actions';
import { BooksService } from 'src/app/book/services/books.service';
import { Book } from 'src/app/book/models/book';

@Injectable()
export class RootEffects {
  constructor(
    private actions$: Actions,
    private sidenavService: SidenavService,
    private bookService: BooksService
  ) {}

  loadMenuItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() =>
        this.sidenavService.getMenuItems().pipe(
          map((menuItems: MenuItem[]) =>
            SidenavApiActions.setMenuItems({ items: menuItems })
          ),
          catchError((error: HttpErrorResponse) =>
            of(SidenavApiActions.fetchError({ msg: error.error }))
          )
        )
      )
    )
  );

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() =>
        this.bookService.getBooksFromFirestore().pipe(
          map((books: Book[]) =>
            BookActions.loadBooks({ books, toDatabase: false })
          ),
          catchError((error: HttpErrorResponse) =>
            of(SidenavApiActions.fetchError({ msg: error.error }))
          )
        )
      )
    )
  );
}
