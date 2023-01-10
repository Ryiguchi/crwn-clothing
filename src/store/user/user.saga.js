import { takeLatest, put, call, all } from 'redux-saga/effects';

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  setIsUserMenuOpen,
  changeDisplayNameFailed,
  changeDisplayNameSuccess,
  changeUserEmailFailed,
  changeUserEmailSuccess,
  checkUserSession,
} from './user.action';

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
} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalInfo) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInfo
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
    yield put(checkUserSession());
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
    yield put(checkUserSession());
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalInfo } }) {
  yield call(getSnapshotFromUserAuth, user, additionalInfo);
  yield put(checkUserSession());
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
    yield put(setIsUserMenuOpen(false));
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* changeDisplayName({ payload: { user, newName } }) {
  try {
    yield call(changeUserDisplayName, user, newName);
    yield put(changeDisplayNameSuccess(newName));
  } catch (error) {
    yield put(changeDisplayNameFailed(error));
  }
}

export function* changeEmail({ payload: { user, email } }) {
  try {
    yield call(changeUserEmail, user, email);
    yield put(changeUserEmailSuccess(email));
  } catch (error) {
    yield put(changeUserEmailFailed(error));
  }
}

// Entry functions
export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESSS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onSetUserDisplayName() {
  yield takeLatest(
    USER_ACTION_TYPES.SET_USER_DISPLAY_NAME_START,
    changeDisplayName
  );
}

export function* onChangeUserEmailStart() {
  yield takeLatest(USER_ACTION_TYPES.SET_USER_EMAIL_START, changeEmail);
}
//
export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
    call(onSetUserDisplayName),
    call(onChangeUserEmailStart),
  ]);
}
