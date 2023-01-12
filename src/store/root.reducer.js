import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/categories.reducer';
import { cartReducer } from './cart/cart.reducer';
import { elementReducer } from './user/elements/elements.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  element: elementReducer,
});
