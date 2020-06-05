import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { createEffect } from '@ngrx/effects';
import { of, forkJoin } from 'rxjs';
import { switchMap, catchError, take, map } from 'rxjs/operators';

import { SidenavService } from '../../navigation/services/sidenav.service';
import { MenuItem } from '@inventory-app/navigation/models/menuItem';
import { SidenavApiActions } from 'src/app/navigation/store/actions';
import { BookActions } from '../../book/store/actions';
import { BooksService } from 'src/app/book/services/books.service';
import { Book } from 'src/app/book/models/book';

@Injectable()
export class RootEffects {
  loadMenuItems$ = createEffect(() =>
    this.auth.user.pipe(
      switchMap(() => {
        return forkJoin([
          this.sidenavService.getMenuItems().pipe(take(1)),
          this.bookService.getDataFromFirestore('books').pipe(take(1)),
        ]).pipe(
          switchMap(([menuItems, books]: [MenuItem[], Book[]]) => {
            return [
              SidenavApiActions.setMenuItems({ items: menuItems }),
              BookActions.setBooks({ books, toDatabase: false }),
            ];
          }),
          catchError((error) => {
            return of(SidenavApiActions.fetchError({ msg: error.message }));
          })
        );
      })
    )
  );

  // loadBooks$ = createEffect(() =>
  //   this.auth.user.pipe(
  //     switchMap(() =>
  //       this.bookService.getDataFromFirestore('books').pipe(
  //         map((books: Book[]) =>
  //           BookActions.setBooks({ books, toDatabase: false })
  //         ),
  //         catchError((error) =>
  //           of(BookActions.fetchError({ msg: error.message }))
  //         )
  //       )
  //     )
  //   )
  // );

  constructor(
    private sidenavService: SidenavService,
    private bookService: BooksService,
    private auth: AngularFireAuth
  ) {}
}
