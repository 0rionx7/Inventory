import { createAction, props } from '@ngrx/store';

import { CartItem } from '../../models/cart';

export const loadCart = createAction(
  '[Book/API] Load Cart',
  props<{ items: CartItem[] }>()
);

export const checkOut = createAction('[Checkout Page] Checking Out');
export const emptyCart = createAction('[Checkout Page] Empty Cart');
export const closeAdded = createAction('[Added to Cart] BackDrop Clicked');
