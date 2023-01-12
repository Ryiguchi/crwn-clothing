import { USER_ACTION_TYPES } from './user.types';

const INITIAL_USER_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
  userSettingsMenu: 'changeName',
  orderHistoryPopupItems: {},
};

export const userReducer = (state = INITIAL_USER_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        isLoading: false,
      };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
      };

    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
    case USER_ACTION_TYPES.SET_USER_DISPLAY_NAME_FAILED:
    case USER_ACTION_TYPES.SET_USER_EMAIL_FAILED:
    case USER_ACTION_TYPES.CHANGE_PASSWORD_FAILED:
    case USER_ACTION_TYPES.SAVE_ORDER_FAILED:
    case USER_ACTION_TYPES.RESET_PASSWORD_FAILED:
      return {
        ...state,
        error: payload,
      };

    case USER_ACTION_TYPES.SET_USER_DISPLAY_NAME_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          displayName: payload,
        },
      };
    case USER_ACTION_TYPES.SET_USER_SETTINGS_MENU:
      return {
        ...state,
        userSettingsMenu: payload,
      };
    case USER_ACTION_TYPES.SET_USER_EMAIL_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          email: payload,
        },
      };
    case USER_ACTION_TYPES.SAVE_ORDER_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          orderHistory: [...state.currentUser.orderHistory, payload],
        },
      };

    case USER_ACTION_TYPES.SET_ORDER_HISTORY_POPUP_ITEMS:
      return {
        ...state,
        orderHistoryPopupItems: payload,
      };

    default:
      return state;
  }
};
