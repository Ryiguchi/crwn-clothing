import { AnyAction } from 'redux';
import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  clearItemFromCart,
} from './cart.action';
import { CartItem } from './cart.types';

export type CartState = {
  cartItems: CartItem[];
};

const INITIAL_STATE: CartState = {
  cartItems: [],
};

export const cartReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (
    addItemToCart.match(action) ||
    removeItemFromCart.match(action) ||
    clearCart.match(action) ||
    clearItemFromCart.match(action)
  ) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;
};
