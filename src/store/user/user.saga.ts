import { takeLatest, put, call, all } from 'typed-redux-saga/macro';

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  changeDisplayNameFailed,
  changeDisplayNameSuccess,
  changeUserEmailFailed,
  changeUserEmailSuccess,
  checkUserSession,
  changePasswordFailed,
  saveOrderFailed,
  saveOrderSuccess,
  resetPasswordFailed,
  SignUpSuccess,
  ResetPasswordStart,
  SaveOrderStart,
  ChangePasswordStart,
  ChangeUserEmailStart,
  ChangeDisplayNameStart,
  SignUpStart,
  EmailSignInStart,
} from './user.action';

import { setIsUserMenuOpen } from '../elements/elements.action';

import { clearCart } from '../cart/cart.action';

import { USER_ACTION_TYPES } from './user.types';

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  changeUserDisplayName,
  changeUserEmail,
  reauthenticate,
  saveOrderToUserFirebase,
  sendResetEmail,
  AdditionalInfo,
} from '../../utils/firebase/firebase.utils';
import { User } from '@firebase/auth';

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalInfo?: AdditionalInfo
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInfo
    );
    if (userSnapshot) {
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
    yield* put(checkUserSession());
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const userCredentnial = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredentnial) {
      const { user } = userCredentnial;
      yield* call(getSnapshotFromUserAuth, user);
      yield* put(checkUserSession());
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUp({
  payload: { email, password, displayName },
}: SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName }));
    }
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

export function* signInAfterSignUp({
  payload: { user, additionalInfo },
}: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalInfo);
  yield* put(checkUserSession());
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
    yield* put(setIsUserMenuOpen(false));
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

export function* changeDisplayName({
  payload: { user, newName },
}: ChangeDisplayNameStart) {
  try {
    yield* call(changeUserDisplayName, user, newName);
    yield* put(changeDisplayNameSuccess(newName, user));
  } catch (error) {
    yield* put(changeDisplayNameFailed(error as Error));
  }
}

export function* changeEmail({
  payload: { user, email },
}: ChangeUserEmailStart) {
  try {
    yield* call(changeUserEmail, user, email);
    yield* put(changeUserEmailSuccess(email, user));
  } catch (error) {
    yield* put(changeUserEmailFailed(error as Error));
  }
}

export function* changePassword({
  payload: { oldPassword, newPassword },
}: ChangePasswordStart) {
  try {
    yield* call(reauthenticate, oldPassword, newPassword);
  } catch (error) {
    yield* put(changePasswordFailed(error as Error));
  }
}

export function* saveOrderToUser({ payload: { user, order } }: SaveOrderStart) {
  try {
    yield* call(saveOrderToUserFirebase, user, order);
    yield* put(saveOrderSuccess(order));
    yield* put(clearCart());
  } catch (error) {
    yield* put(saveOrderFailed(error as Error));
  }
}

export function* resetPassword({ payload: email }: ResetPasswordStart) {
  try {
    yield* call(sendResetEmail, email);
  } catch (error) {
    yield* put(resetPasswordFailed(error as Error));
  }
}

// Entry functions
export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESSS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onSetUserDisplayName() {
  yield* takeLatest(
    USER_ACTION_TYPES.SET_USER_DISPLAY_NAME_START,
    changeDisplayName
  );
}

export function* onChangeUserEmailStart() {
  yield* takeLatest(USER_ACTION_TYPES.SET_USER_EMAIL_START, changeEmail);
}

export function* onChangePasswordStart() {
  yield* takeLatest(USER_ACTION_TYPES.CHANGE_PASSWORD_START, changePassword);
}

export function* onSaveOrderStart() {
  yield* takeLatest(USER_ACTION_TYPES.SAVE_ORDER_START, saveOrderToUser);
}

export function* onResetPasswordStart() {
  yield* takeLatest(USER_ACTION_TYPES.RESET_PASSWORD_START, resetPassword);
}

//
export function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
    call(onSetUserDisplayName),
    call(onChangeUserEmailStart),
    call(onChangePasswordStart),
    call(onSaveOrderStart),
    call(onResetPasswordStart),
  ]);
}
