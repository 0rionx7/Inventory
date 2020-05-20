import { createReducer, on } from '@ngrx/store';
import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
} from '@ngrx/entity';

import { CartActions } from '../actions';
import { CartItem } from '../../models/cart';

export const CartFeatureKey = 'booksCart';

export interface State extends EntityState<CartItem> {
  total: number;
}

export const adapter: EntityAdapter<CartItem> = createEntityAdapter<CartItem>();

export const initialState: State = adapter.getInitialState({
  total: 0,
});

export const reducer = createReducer(
  initialState,
  on(CartActions.loadCart, (state, { items }) => adapter.setAll(items, state)),
  on(CartActions.emptyCart, () => initialState),
  // on(BookActions.upsertBook, (state, action) =>
  //   adapter.upsertOne(action.book, state)
  // ),
  // on(BookActions.addBooks, (state, action) =>
  //   adapter.addMany(action.books, state)
  // ),
  // on(BookActions.upsertBooks, (state, action) =>
  //   adapter.upsertMany(action.books, state)
  // ),
  on(CartActions.addToCart, (state, { id, amount }) => {
    const update: CartItem = {
      id,
      amount: state.entities[id] ? state.entities[id].amount + amount : amount,
    };
    return {
      ...adapter.upsertOne(update, state),
      total: state.total + amount,
    };
  })
  // on(BookActions.updateBooks, (state, action) =>
  //   adapter.updateMany(action.books, state)
  // ),
  // on(BookActions.deleteBook, (state, action) =>
  //   adapter.removeOne(action.id, state)
  // ),
  // on(BookActions.deleteBooks, (state, action) =>
  //   adapter.removeMany(action.ids, state)
  // ),
  // on(BookActions.clearBooks, (state) => adapter.removeAll(state))
);