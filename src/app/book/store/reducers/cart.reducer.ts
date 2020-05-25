import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { CartActions, BookActions } from '../actions';
import { CartItem } from '../../models/cart';

export const CartFeatureKey = 'booksCart';

export interface State extends EntityState<CartItem> {
  total: number;
  showAdded: { id: string; amount: number };
}

export const adapter: EntityAdapter<CartItem> = createEntityAdapter<CartItem>();

export const initialState: State = adapter.getInitialState({
  showAdded: { id: null, amount: null },
  total: 0,
});

export const reducer = createReducer(
  initialState,
  on(CartActions.emptyCart, () => initialState),
  on(BookActions.addToCart, (state, { id, amount, product }) => {
    const update: CartItem = {
      id,
      amount: state.entities[id] ? state.entities[id].amount + amount : amount,
      product,
    };
    const newState = adapter.upsertOne(update, state);
    return {
      ...calculateTotalItems(newState),
      showAdded: { id, amount },
    };
  }),
  on(CartActions.closeAdded, (state) => ({
    ...state,
    showAdded: { id: null, amount: null },
  })),
  on(CartActions.update, (state, { update }) => {
    const newState = adapter.updateOne(update, state);
    return calculateTotalItems(newState);
  }),
  on(CartActions.remove, (state, { id }) => {
    const newState = adapter.removeOne(id, state);
    return calculateTotalItems(newState);
  })
);

function calculateTotalItems(state: State): State {
  let total = 0;
  for (let key in state.entities) {
    total += state.entities[key].amount;
  }
  return {
    ...state,
    total,
  };
}

export const getTotal = (state: State) => state.total;
export const getShowAdded = (state: State) => state.showAdded;
