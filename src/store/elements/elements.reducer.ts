import {
  setIsCartOpen,
  setIsOrderHistoryPopupOpen,
  setIsUserMenuOpen,
} from './elements.action';
import { AnyAction } from 'redux';

export type ElementState = {
  isUserMenuOpen: Boolean;
  isOrderHistoryPopupOpen: Boolean;
  isCartOpen: Boolean;
};

const INITIAL_ELEMENT_STATE: ElementState = {
  isUserMenuOpen: false,
  isOrderHistoryPopupOpen: false,
  isCartOpen: false,
};

export const elementReducer = (
  state = INITIAL_ELEMENT_STATE,
  action: AnyAction
) => {
  if (setIsOrderHistoryPopupOpen.match(action)) {
    return {
      ...state,
      isOrderHistoryPopupOpen: action.payload,
    };
  }

  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (setIsUserMenuOpen.match(action)) {
    return {
      ...state,
      isUserMenuOpen: action.payload,
    };
  }

  return state;
};
