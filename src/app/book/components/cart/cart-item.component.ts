import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CartItem } from '../../models/cart';

@Component({
  selector: 'app-cart-item',
  template: `
    <div class="item">
      <div class="item-details info">
        <img [src]="item.product.volumeInfo?.imageLinks?.smallThumbnail" />
        <div class="description">
          <h5>{{ item.product.volumeInfo.title }}</h5>
          <p>{{ item.product.volumeInfo.description | bcEllipsis: 69 }}</p>
        </div>
      </div>
      <div class="item-details amount">
        <input type="number" [ngModel]="item.amount" #amount />
        <span
          (click)="
            update.emit(
              +amount.value === item.amount
                ? { id: item.id, amount: 0 }
                : { id: item.id, amount: +amount.value }
            )
          "
          [style.color]="+amount.value === item.amount ? 'red' : 'green'"
          >{{ +amount.value === item.amount ? 'remove' : 'update' }}</span
        >
      </div>
      <div class="item-details">100$</div>
      <div class="item-details">{{ item.amount * 100 }}</div>
    </div>
  `,
  styleUrls: ['./cart.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() item: CartItem;
  @Output() update = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
