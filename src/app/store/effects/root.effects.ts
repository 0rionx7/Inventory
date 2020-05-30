import { Injectable } from '@angular/core';

import { Actions, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { SidenavService } from '../../navigation/services/sidenav.service';
import { MenuItem } from 'src/app/navigation/models/models';
import { SidenavApiActions } from 'src/app/navigation/store/actions';
import { BookActions } from '../../book/store/actions';
import { BooksService } from 'src/app/book/services/books.service';
import { Book } from 'src/app/book/models/book';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class RootEffects {
  loadMenuItems$ = createEffect(() =>
    this.auth.user.pipe(
      switchMap(() => {
        return this.sidenavService.getMenuItems().pipe(
          map((menuItems: MenuItem[]) =>
            SidenavApiActions.setMenuItems({ items: menuItems })
          ),
          catchError((error) => {
            return of(SidenavApiActions.fetchError({ msg: error.message }));
          })
        );
      })
    )
  );

  loadBooks$ = createEffect(() =>
    this.auth.user.pipe(
      switchMap(() =>
        this.bookService.getDataFromFirestore('books').pipe(
          map((books: Book[]) =>
            BookActions.setBooks({ books, toDatabase: false })
          ),
          catchError((error) =>
            of(BookActions.fetchError({ msg: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private sidenavService: SidenavService,
    private bookService: BooksService,
    private auth: AngularFireAuth
  ) {}
}
