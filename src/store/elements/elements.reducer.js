import { ELEMENT_ACTION_TYPES } from './elements.types';

const INITIAL_ELEMENT_STATE = {
  isUserMenuOpen: false,
  isOrderHistoryPopupOpen: false,
  isCartOpen: false,
};

export const elementReducer = (state = INITIAL_ELEMENT_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case ELEMENT_ACTION_TYPES.SET_IS_ORDER_HISTORY_POPUP_OPEN:
      return {
        ...state,
        isOrderHistoryPopupOpen: payload,
      };

    case ELEMENT_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    case ELEMENT_ACTION_TYPES.SET_IS_USER_MENU_OPEN:
      return {
        ...state,
        isUserMenuOpen: payload,
      };
    default:
      return state;
  }
};
