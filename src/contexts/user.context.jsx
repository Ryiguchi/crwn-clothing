import { createContext, useEffect, useReducer } from 'react';

import { createAction } from '../utils/reducer.utils';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRRET_USER: 'user/SET-CURRENT-USER',
};

const INITIAL_USER_STATE = {
  currentUser: null,
};

export const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRRET_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error('Wrong user action');
  }
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(
    userReducer,
    INITIAL_USER_STATE
  );

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRRET_USER, user));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, setCurrentUser };

  // allows any of the children to access useState
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
