import { AnyAction } from 'redux';
import { Order } from '../../components/payment-form/payment-form.component';
import { CurrentUser } from '../../utils/firebase/firebase.utils';
import { USER_SETTINGS_MENU_OPTIONS } from './user.types';
import {
  signInSuccess,
  signOutSuccess,
  signInFailed,
  signOutFailed,
  signUpFailed,
  changeDisplayNameFailed,
  changeUserEmailFailed,
  changePasswordFailed,
  saveOrderFailed,
  resetPasswordFailed,
  changeDisplayNameSuccess,
  changeUserEmailSuccess,
  changeUserSettingsMenu,
  saveOrderSuccess,
  setOrderHistoryPopupItems,
} from './user.action';

export type UserState = {
  currentUser: CurrentUser | null;
  isLoading: boolean;
  error: Error | null;
  userSettingsMenu: USER_SETTINGS_MENU_OPTIONS;
  orderHistoryPopupItems: Order | null;
};

const INITIAL_USER_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
  userSettingsMenu: USER_SETTINGS_MENU_OPTIONS.CHANGE_NAME,
  orderHistoryPopupItems: null,
};

export const userReducer = (state = INITIAL_USER_STATE, action: AnyAction) => {
  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
      isLoading: false,
    };
  }

  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
      isLoading: false,
    };
  }

  if (
    signInFailed.match(action) ||
    signOutFailed.match(action) ||
    signUpFailed.match(action) ||
    changeDisplayNameFailed.match(action) ||
    changeUserEmailFailed.match(action) ||
    changePasswordFailed.match(action) ||
    saveOrderFailed.match(action) ||
    resetPasswordFailed.match(action)
  ) {
    return {
      ...state,
      error: action.payload,
    };
  }

  if (changeDisplayNameSuccess.match(action)) {
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        displayName: action.payload,
      },
    };
  }

  if (changeUserEmailSuccess.match(action)) {
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        email: action.payload,
      },
    };
  }

  if (changeUserSettingsMenu.match(action)) {
    return {
      ...state,
      userSettingsMenu: action.payload,
    };
  }

  if (saveOrderSuccess.match(action) && state.currentUser) {
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        orderHistory: [...state.currentUser.orderHistory, action.payload],
      },
    };
  }

  if (setOrderHistoryPopupItems.match(action)) {
    return {
      ...state,
      orderHistoryPopupItems: action.payload,
    };
  }

  return state;
};
