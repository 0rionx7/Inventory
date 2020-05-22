import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from '../../models/cart';

@Component({
  selector: 'app-added-to-cart',
  template: `
    <div class="backDrop">
      <div class="container">
        <app-cart-item
          [item]="itemAdded"
          (click)="$event.stopPropagation()"
        ></app-cart-item>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        width: 80%;
        background-color: rgb(202, 198, 189);
      }
    `,
  ],
})
export class AddedToCartComponent implements OnInit {
  @Input() itemAdded: CartItem;

  constructor() {}

  ngOnInit(): void {}
}
