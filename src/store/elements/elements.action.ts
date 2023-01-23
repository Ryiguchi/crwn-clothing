import { ELEMENT_ACTION_TYPES } from './elements.types';
import {
  createAction,
  ActionWithPayload,
  withMatcher,
} from '../../utils/reducer.utils';

type SetIsUserMenuOpen = ActionWithPayload<
  ELEMENT_ACTION_TYPES.SET_IS_USER_MENU_OPEN,
  boolean
>;

type SetIsOrderHistoryPopupOpen = ActionWithPayload<
  ELEMENT_ACTION_TYPES.SET_IS_ORDER_HISTORY_POPUP_OPEN,
  boolean
>;

type SetIsCartOpen = ActionWithPayload<
  ELEMENT_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export const setIsUserMenuOpen = withMatcher(
  (bool: boolean): SetIsUserMenuOpen =>
    createAction(ELEMENT_ACTION_TYPES.SET_IS_USER_MENU_OPEN, bool)
);

export const setIsOrderHistoryPopupOpen = withMatcher(
  (bool: boolean): SetIsOrderHistoryPopupOpen =>
    createAction(ELEMENT_ACTION_TYPES.SET_IS_ORDER_HISTORY_POPUP_OPEN, bool)
);

export const setIsCartOpen = withMatcher(
  (bool: boolean): SetIsCartOpen =>
    createAction(ELEMENT_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);
