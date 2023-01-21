import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectCartSlice = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [selectCartSlice],
  (cart) => cart.cartItems
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, cur) => acc + cur.quantity, 0)
);
