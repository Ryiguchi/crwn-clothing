import { USER_ACTION_TYPES, USER_SETTINGS_MENU_OPTIONS } from './user.types';
import { AdditionalInfo, UserData } from '../../utils/firebase/firebase.utils';

import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from '../../utils/reducer.utils';
import { User } from '@firebase/auth';
import { Order } from '../../components/payment-form/payment-form.component';

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

export type EmailSignInStart = ActionWithPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>;

export type SignInSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  UserData
>;

export type SignInFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_FAILED,
  Error
>;

export type SignUpStart = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_START,
  { email: string; password: string; displayName: string }
>;

export type SignUpSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_SUCCESSS,
  { user: User; additionalInfo: AdditionalInfo }
>;

export type SignUpFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_FAILED,
  Error
>;

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export type SignOutFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_OUT_FAILED,
  Error
>;

export type ChangeDisplayNameStart = ActionWithPayload<
  USER_ACTION_TYPES.SET_USER_DISPLAY_NAME_START,
  { user: UserData; newName: string }
>;

export type ChangeDisplayNameSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SET_USER_DISPLAY_NAME_SUCCESS,
  { newName: string; user: UserData }
>;

export type ChangeDisplayNameFailed = ActionWithPayload<
  USER_ACTION_TYPES.SET_USER_DISPLAY_NAME_FAILED,
  Error
>;

export type ChangeUserSettingsMenu = ActionWithPayload<
  USER_ACTION_TYPES.SET_USER_SETTINGS_MENU,
  USER_SETTINGS_MENU_OPTIONS
>;

export type ChangeUserEmailStart = ActionWithPayload<
  USER_ACTION_TYPES.SET_USER_EMAIL_START,
  { user: UserData; email: string }
>;

export type ChangeUserEmailSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SET_USER_EMAIL_SUCCESS,
  { email: string; user: UserData }
>;

export type ChangeUserEmailFailed = ActionWithPayload<
  USER_ACTION_TYPES.SET_USER_EMAIL_FAILED,
  Error
>;

export type ChangePasswordStart = ActionWithPayload<
  USER_ACTION_TYPES.CHANGE_PASSWORD_START,
  { oldPassword: string; newPassword: string }
>;

export type ChangePasswordSuccess =
  Action<USER_ACTION_TYPES.CHANGE_PASSWORD_SUCCESS>;

export type ChangePasswordFailed = ActionWithPayload<
  USER_ACTION_TYPES.CHANGE_PASSWORD_FAILED,
  Error
>;

export type SaveOrderStart = ActionWithPayload<
  USER_ACTION_TYPES.SAVE_ORDER_START,
  { user: UserData; order: Order }
>;

export type SaveOrderSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SAVE_ORDER_SUCCESS,
  Order
>;

export type SaveOrderFailed = ActionWithPayload<
  USER_ACTION_TYPES.SAVE_ORDER_FAILED,
  Error
>;

export type SetOrderHistoryPopupItems = ActionWithPayload<
  USER_ACTION_TYPES.SET_ORDER_HISTORY_POPUP_ITEMS,
  Order
>;

export type ResetPasswordStart = ActionWithPayload<
  USER_ACTION_TYPES.RESET_PASSWORD_START,
  string
>;

export type ResetPasswordSuccess =
  Action<USER_ACTION_TYPES.RESET_PASSWORD_SUCCESS>;

export type ResetPasswordFailed = ActionWithPayload<
  USER_ACTION_TYPES.RESET_PASSWORD_FAILED,
  Error
>;

export const checkUserSession = withMatcher(
  (): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

export const googleSignInStart = withMatcher(
  (): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
);

export const emailSignInStart = withMatcher(
  (email: string, password: string): EmailSignInStart =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
);

export const signInSuccess = withMatcher(
  (user: UserData): SignInSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);

export const signInFailed = withMatcher(
  (error: Error): SignInFailed =>
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
);

export const signUpStart = withMatcher(
  (email: string, password: string, displayName: string): SignUpStart =>
    createAction(USER_ACTION_TYPES.SIGN_UP_START, {
      email,
      password,
      displayName,
    })
);

export const signUpSuccess = withMatcher(
  (user: User, additionalInfo: AdditionalInfo): SignUpSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESSS, { user, additionalInfo })
);

export const signUpFailed = withMatcher(
  (error: Error): SignUpFailed =>
    createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)
);

export const signOutStart = withMatcher(
  (): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);

export const signOutSuccess = withMatcher(
  (): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);

export const signOutFailed = withMatcher(
  (error: Error): SignOutFailed =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
);

export const changeDisplayNameStart = withMatcher(
  (user: UserData, newName: string): ChangeDisplayNameStart =>
    createAction(USER_ACTION_TYPES.SET_USER_DISPLAY_NAME_START, {
      user,
      newName,
    })
);

export const changeDisplayNameSuccess = withMatcher(
  (newName: string, user: UserData): ChangeDisplayNameSuccess =>
    createAction(USER_ACTION_TYPES.SET_USER_DISPLAY_NAME_SUCCESS, {
      newName,
      user,
    })
);

export const changeDisplayNameFailed = withMatcher(
  (error: Error): ChangeDisplayNameFailed =>
    createAction(USER_ACTION_TYPES.SET_USER_DISPLAY_NAME_FAILED, error)
);

export const changeUserSettingsMenu = withMatcher(
  (menu: USER_SETTINGS_MENU_OPTIONS): ChangeUserSettingsMenu =>
    createAction(USER_ACTION_TYPES.SET_USER_SETTINGS_MENU, menu)
);

export const changeUserEmailStart = withMatcher(
  (user: UserData, email: string): ChangeUserEmailStart =>
    createAction(USER_ACTION_TYPES.SET_USER_EMAIL_START, { user, email })
);

export const changeUserEmailSuccess = withMatcher(
  (email: string, user: UserData): ChangeUserEmailSuccess =>
    createAction(USER_ACTION_TYPES.SET_USER_EMAIL_SUCCESS, { email, user })
);

export const changeUserEmailFailed = withMatcher(
  (error: Error): ChangeUserEmailFailed =>
    createAction(USER_ACTION_TYPES.SET_USER_EMAIL_FAILED, error)
);

export const changePasswordStart = withMatcher(
  (oldPassword: string, newPassword: string): ChangePasswordStart =>
    createAction(USER_ACTION_TYPES.CHANGE_PASSWORD_START, {
      oldPassword,
      newPassword,
    })
);

export const changePasswordSuccess = withMatcher(
  (): ChangePasswordSuccess =>
    createAction(USER_ACTION_TYPES.CHANGE_PASSWORD_SUCCESS)
);

export const changePasswordFailed = withMatcher(
  (error: Error): ChangePasswordFailed =>
    createAction(USER_ACTION_TYPES.CHANGE_PASSWORD_FAILED, error)
);

export const saveOrderStart = withMatcher(
  (user: UserData, order: Order): SaveOrderStart =>
    createAction(USER_ACTION_TYPES.SAVE_ORDER_START, { user, order })
);

export const saveOrderSuccess = withMatcher(
  (order: Order): SaveOrderSuccess =>
    createAction(USER_ACTION_TYPES.SAVE_ORDER_SUCCESS, order)
);

export const saveOrderFailed = withMatcher(
  (error: Error): SaveOrderFailed =>
    createAction(USER_ACTION_TYPES.SAVE_ORDER_FAILED, error)
);

export const setOrderHistoryPopupItems = withMatcher(
  (items: Order): SetOrderHistoryPopupItems =>
    createAction(USER_ACTION_TYPES.SET_ORDER_HISTORY_POPUP_ITEMS, items)
);

export const resetPasswordStart = withMatcher(
  (email: string): ResetPasswordStart =>
    createAction(USER_ACTION_TYPES.RESET_PASSWORD_START, email)
);

export const resetPasswordSuccess = withMatcher(
  (): ResetPasswordSuccess =>
    createAction(USER_ACTION_TYPES.RESET_PASSWORD_SUCCESS)
);

export const resetPasswordFailed = withMatcher(
  (error: Error): ResetPasswordFailed =>
    createAction(USER_ACTION_TYPES.RESET_PASSWORD_FAILED, error)
);
