import { Injectable, Inject } from '@angular/core';

import { Store, select, Action } from '@ngrx/store';
import { Actions, ofType, createEffect, OnInitEffects } from '@ngrx/effects';
import * as firebase from 'firebase/app';

import { AlbumActions } from '../actions';
import { DATA_BASE } from '../../../material.module';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { BooksService } from 'src/app/book/services/books.service';

@Injectable()
export class AlbumEffects implements OnInitEffects {
  ngrxOnInitEffects(): Action {
    return AlbumActions.addBookToCart();
  }

  constructor(
    private actions$: Actions,
    private store: Store,
    private cartService: BooksService,
    @Inject(DATA_BASE) private db: firebase.firestore.Firestore
  ) {}

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumActions.addBookToCart),
      switchMap(() =>
        this.cartService
          .getDataFromFirestore('Albums')
          .pipe(map((re) => AlbumActions.loadAlbums({ albums: re })))
      )
    )
  );
}
