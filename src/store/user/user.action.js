import { USER_ACTION_TYPES } from './user.types';

import { createAction } from '../../utils/reducer.utils';

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRRET_USER, user);

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

export const signUpStart = (email, password, displayName) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName,
  });

export const signUpSuccess = (user, additionalInfo) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESSS, { user, additionalInfo });

export const signUpFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);

export const signOutStart = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const signOutSuccess = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const signOutFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);

export const changeDisplayNameStart = (user, newName) =>
  createAction(USER_ACTION_TYPES.SET_USER_DISPLAY_NAME_START, {
    user,
    newName,
  });

export const changeDisplayNameSuccess = (newName) =>
  createAction(USER_ACTION_TYPES.SET_USER_DISPLAY_NAME_SUCCESS, newName);

export const changeDisplayNameFailed = (error) =>
  createAction(USER_ACTION_TYPES.SET_USER_DISPLAY_NAME_FAILED, error);

export const changeUserSettingsMenu = (menu) =>
  createAction(USER_ACTION_TYPES.SET_USER_SETTINGS_MENU, menu);

export const changeUserEmailStart = (user, email) =>
  createAction(USER_ACTION_TYPES.SET_USER_EMAIL_START, { user, email });

export const changeUserEmailSuccess = (email) =>
  createAction(USER_ACTION_TYPES.SET_USER_EMAIL_SUCCESS, email);

export const changeUserEmailFailed = (error) =>
  createAction(USER_ACTION_TYPES.SET_USER_EMAIL_FAILED, error);

export const changePasswordStart = (oldPassword, newPassword) =>
  createAction(USER_ACTION_TYPES.CHANGE_PASSWORD_START, {
    oldPassword,
    newPassword,
  });

export const changePasswordSuccess = () =>
  createAction(USER_ACTION_TYPES.CHANGE_PASSWORD_SUCCESS);

export const changePasswordFailed = (error) =>
  createAction(USER_ACTION_TYPES.CHANGE_PASSWORD_FAILED, error);

export const saveOrderStart = (user, order) =>
  createAction(USER_ACTION_TYPES.SAVE_ORDER_START, { user, order });

export const saveOrderSuccess = (order) =>
  createAction(USER_ACTION_TYPES.SAVE_ORDER_SUCCESS, order);

export const saveOrderFailed = (error) =>
  createAction(USER_ACTION_TYPES.SAVE_ORDER_FAILED, error);

export const setOrderHistoryPopupItems = (items) =>
  createAction(USER_ACTION_TYPES.SET_ORDER_HISTORY_POPUP_ITEMS, items);
