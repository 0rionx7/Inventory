import { Component, OnInit, Input } from '@angular/core';

import { CartItem } from 'src/app/book/models';

@Component({
  selector: 'app-added-to-cart',
  template: `
    <div class="backDrop">
      <div class="container">
        <h4>
          {{ itemAdded.amount }} item{{ itemAdded.amount > 1 ? 's' : '' }} added
          to your Cart
        </h4>
        <app-cart-item
          [item]="itemAdded.item"
          (click)="$event.stopPropagation()"
        ></app-cart-item>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        width: 60%;
        padding: 10px;
        background-color: rgb(202, 198, 189);
      }
    `,
  ],
})
export class AddedToCartComponent implements OnInit {
  @Input() itemAdded: { item: CartItem; amount: number };
  constructor() {}

  ngOnInit(): void {}
}
