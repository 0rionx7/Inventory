import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromBooks from 'src/app/book/store/reducers';
import { CartItem, Book } from 'src/app/book/models';
import { CartActions } from 'src/app/book/store/actions';

@Component({
  selector: 'app-cart',
  template: `
    <div class="container">
      <div class="cart-title">
        <p style="font-size: 18px; flex: 1">Items in Cart</p>
        <button class="btn green" (click)="checkOut()">Check Out</button>
      </div>
      <div class="item">
        <div style="text-align: initial">Item</div>
        <div>Amount</div>
        <div>Price</div>
        <div>Total</div>
      </div>
      <div *ngIf="!(total$ | async)" style="text-align: center;color: wheat;">
        Shopping Cart is Empty
      </div>
      <div *ngFor="let item of items$ | async">
        <app-cart-item
          [item]="item"
          (update)="updateItem($event)"
        ></app-cart-item>
        <hr />
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
      }
      .container {
        width: 80%;
        padding: 0.5rem;
      }
      .cart-title {
        display: flex;
        align-items: center;
        height: 50px;
        padding: 5px;
        border-radius: 4px;
        background-color: rgb(190, 182, 167);
      }
      .item {
        display: grid;
        text-align: center;
        grid-template-columns: 3fr repeat(3, 0.33fr);
        padding: 0.2rem;
      }
      hr {
        display: block;
        margin: auto !important;
        width: 90%;
        height: 1px;
        border: 0;
        border-top: 1px solid black;
        margin: 1em 0;
        padding: 0;
      }
    `,
  ],
})
export class CartComponent implements OnInit {
  items$: Observable<CartItem[]>;
  mockBook$: Observable<Book[]>;
  total$: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.items$ = this.store.pipe(select(fromBooks.selectAllCartItems));
    this.mockBook$ = this.store.pipe(select(fromBooks.mockBook));
    this.total$ = this.store.pipe(select(fromBooks.selectTotal));
  }

  updateItem({ id, amount }: { id: string; amount: number }): void {
    amount > 0
      ? this.store.dispatch(
          CartActions.update({ update: { id, changes: { amount } } })
        )
      : this.store.dispatch(CartActions.remove({ id }));
  }

  checkOut(): void {
    this.store.dispatch(CartActions.checkOut());
  }
}
