import { AnyAction } from 'redux';
import { setCartItems } from './cart.action';
import { CartItem } from './cart.types';

export type CartState = {
  cartItems: CartItem[];
};

const INITIAL_STATE: CartState = {
  cartItems: [],
};

export const cartReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;
};
