import { Injectable, Inject } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { withLatestFrom, tap, map, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

import { CartActions, BookActions } from '../actions';
import * as frombooks from '../reducers';
import { BooksService } from '../../services/books.service';
import { CartItem } from '../../models/cart';
import { DATA_BASE } from '../../../material.module';
import { of } from 'rxjs';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private cartService: BooksService,
    @Inject(DATA_BASE) private db: firebase.firestore.Firestore
  ) {}

  loadItems$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookActions.loadBooks),
        withLatestFrom(this.store.pipe(select(frombooks.selectBookIds))),
        tap(([action, ids]) => {
          const items = [];
          ids.forEach((id: string | number) => items.push({ id, amount: 100 }));
          if (action.toDatabase) this.cartService.saveInventory(items);
        })
      ),
    { dispatch: false }
  );

  checkOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.checkOut),
      withLatestFrom(this.store.pipe(select(frombooks.selectAllItems))),
      tap(([action, items]) => {
        const batch = this.db.batch();
        items.forEach((item: CartItem) =>
          this.batchUpdate(batch, item.id, item.amount)
        );
        batch.commit();
      }),
      map(() => CartActions.emptyCart())
    )
  );

  batchUpdate(batch, id: string, amount: number) {
    var docRef = this.db.doc(`Inventory/${id}`);
    batch.update(docRef, {
      amount: firebase.firestore.FieldValue.increment(-amount),
    });
  }
}