import { Component, OnInit, Input } from '@angular/core';

import { CartItem } from '../../models/cart';

@Component({
  selector: 'app-cart-item',
  template: `
    <div class="item">
      <img [src]="item.product.volumeInfo.imageLinks.smallThumbnail" />
      <div style="margin-left: 5px;">
        <h4 style="text-align: center;">{{ item.product.volumeInfo.title }}</h4>
        {{ item.product.volumeInfo.description | bcEllipsis }}
      </div>
      <div>Amount</div>
    </div>
  `,
  styles: [
    `
      .item {
        display: flex;
        border: 1px solid black;
        padding: 0.2rem;
      }
      img {
        flex: 0 0 auto;
        width: 60px;
        height: 80px;
      }
    `,
  ],
})
export class CartItemComponent implements OnInit {
  @Input() item: CartItem;

  constructor() {}

  ngOnInit(): void {}
}
