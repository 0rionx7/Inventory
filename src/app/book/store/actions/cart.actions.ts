import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { CartItem } from '../../models/cart';

export const remove = createAction(
  '[Cart] Remove from Cart',
  props<{ id: string }>()
);
export const update = createAction(
  '[Cart] Update Amount',
  props<{ update: Update<CartItem> }>()
);
export const checkOut = createAction('[Checkout Page] Checking Out');
export const emptyCart = createAction('[Checkout Page] Empty Cart');
export const closeAdded = createAction('[Added to Cart] BackDrop Clicked');
export const showCart = createAction('[Nav Bar] Show Cart');
