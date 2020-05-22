import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { CartActions, BookActions } from '../actions';
import { CartItem } from '../../models/cart';

export const CartFeatureKey = 'booksCart';

export interface State extends EntityState<CartItem> {
  total: number;
  showAdded: boolean;
}

export const adapter: EntityAdapter<CartItem> = createEntityAdapter<CartItem>();

export const initialState: State = adapter.getInitialState({
  total: 0,
  showAdded: false,
});

export const reducer = createReducer(
  initialState,
  on(CartActions.loadCart, (state, { items }) => adapter.setAll(items, state)),
  on(CartActions.emptyCart, () => initialState),
  on(BookActions.addToCart, (state, { id, amount, product }) => {
    const update: CartItem = {
      id,
      amount: state.entities[id] ? state.entities[id].amount + amount : amount,
      product,
    };
    return {
      ...adapter.upsertOne(update, state),
      total: state.total + amount,
      showAdded: true,
    };
  }),
  on(CartActions.closeAdded, (state) => ({ ...state, showAdded: false }))
);

export const getTotal = (state: State) => state.total;
export const getShowAdded = (state: State) => state.showAdded;
