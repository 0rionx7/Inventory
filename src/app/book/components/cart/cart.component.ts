import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromBooks from '../../store/reducers';
import { CartItem } from '../../models/cart';
import { Book } from '../../models/book';

@Component({
  selector: 'app-cart',
  template: `
    <div class="container">
      <app-cart-item
        *ngFor="let item of items$ | async"
        [item]="item"
      ></app-cart-item>
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
        background-color: rgb(216, 206, 189);
        border-radius: 15px;
        padding: 0.5rem;
      }
    `,
  ],
})
export class CartComponent implements OnInit {
  items$: Observable<CartItem[]>;
  mockBook$: Observable<Book[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.items$ = this.store.pipe(select(fromBooks.selectAllCartItems));
    this.mockBook$ = this.store.pipe(select(fromBooks.mockBook));
  }
}
