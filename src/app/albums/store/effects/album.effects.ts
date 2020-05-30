import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';

import { AlbumActions } from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { BooksService } from 'src/app/book/services/books.service';
import { Book } from 'src/app/book/models/book';

@Injectable()
export class AlbumEffects implements OnInitEffects {
  constructor(private actions$: Actions, private cartService: BooksService) {}

  ngrxOnInitEffects(): Action {
    return AlbumActions.loadAlbums();
  }

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumActions.loadAlbums),
      switchMap(() =>
        this.cartService.getDataFromFirestore('Albums').pipe(
          map((albums: Book[]) => AlbumActions.setAlbums({ albums })),
          catchError((error) =>
            of(AlbumActions.fetchError({ msg: error.message }))
          )
        )
      )
    )
  );
}
