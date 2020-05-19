import { createAction, props } from '@ngrx/store';

import { CartItem } from '../../models/cart';

export const loadCart = createAction(
  '[Book/API] Load Cart',
  props<{ items: CartItem[] }>()
);

export const addToCart = createAction(
  '[Book Details] Add to Cart',
  props<{ id: string; amount: number }>()
);

export const checkOut = createAction('[Checkout Page] Checking Out');
export const emptyCart = createAction('[Checkout Page] Emtry Cart');
