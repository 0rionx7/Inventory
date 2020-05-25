import { Injectable, Inject } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { withLatestFrom, tap, map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

import { CartActions, BookActions } from '../actions';
import * as fromBooks from '../reducers';
import { BooksService } from '../../services/books.service';
import { CartItem } from '../../models/cart';
import { DATA_BASE } from '../../../material.module';

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
        ofType(BookActions.setBooks),
        withLatestFrom(this.store.pipe(select(fromBooks.selectBookIds))),
        tap(([action, ids]) => {
          if (action.toDatabase) {
            const items = [];
            ids.forEach((id: string | number) =>
              items.push({ id, amount: 100 })
            );
            this.cartService.saveInventory(items);
          }
        })
      ),
    { dispatch: false }
  );

  checkOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.checkOut),
      withLatestFrom(this.store.pipe(select(fromBooks.selectAllCartItems))),
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
    const docRef = this.db.doc(`Inventory/${id}`);
    batch.update(docRef, {
      amount: firebase.firestore.FieldValue.increment(-amount),
    });
  }
}
