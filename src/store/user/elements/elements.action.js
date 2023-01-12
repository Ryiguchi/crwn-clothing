import { ELEMENT_ACTION_TYPES } from './elements.types';
import { createAction } from '../../../utils/reducer.utils';

export const setIsUserMenuOpen = (bool) =>
  createAction(ELEMENT_ACTION_TYPES.SET_IS_USER_MENU_OPEN, bool);

export const setIsOrderHistoryPopupOpen = (bool) =>
  createAction(ELEMENT_ACTION_TYPES.SET_IS_ORDER_HISTORY_POPUP_OPEN, bool);

export const setIsCartOpen = (bool) =>
  createAction(ELEMENT_ACTION_TYPES.SET_IS_CART_OPEN, bool);
