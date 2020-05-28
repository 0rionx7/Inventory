import { Injectable, Inject } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { withLatestFrom, tap, map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

import { CartActions, BookActions } from '../actions';
import * as fromBooks from '../reducers';
import { CartItem } from '../../models/cart';
import { DATA_BASE } from '../../../material.module';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    @Inject(DATA_BASE) private db: firebase.firestore.Firestore,
    private afs: AngularFirestore
  ) {}

  loadItems$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookActions.setBooks),
        withLatestFrom(this.store.pipe(select(fromBooks.selectBookIds))),
        tap(([action, ids]) => {
          if (action.toDatabase) {
            const batch = this.afs.firestore.batch();
            ids.forEach((id: string | number) =>
              this.batchUpdate(batch, id, 100)
            );
            batch.commit();
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
        const batch = this.afs.firestore.batch();
        items.forEach((item: CartItem) =>
          this.batchUpdate(batch, item.id, item.amount)
        );
        batch.commit();
      }),
      map(() => CartActions.emptyCart())
    )
  );

  batchUpdate(batch, id: string | number, amount: number) {
    const docRef = this.db.doc(`Inventory/${id}`);
    batch.update(docRef, {
      amount: firebase.firestore.FieldValue.increment(-amount),
    });
  }
}
