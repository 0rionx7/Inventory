import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';

import { CartActions, BookActions } from '../actions';
import * as frombooks from '../reducers';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private store: Store) {}

  // loadItems$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(BookActions.loadBooks),
  //     withLatestFrom(this.store.pipe(select(frombooks.selectIds))),
  //     switchMap(([action, ids]) => {
  //       const items = [];
  //       ids.forEach((id) => items.push({ id, amount: 0 }));
  //       return of(CartActions.loadCart({ items }));
  //     })
  //   )
  // );
}
