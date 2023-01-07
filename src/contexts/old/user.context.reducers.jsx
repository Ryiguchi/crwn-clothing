import { createContext, useEffect, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

// the actual value that you want to access
export const UserContext = createContext({
  // set to null because if it is empty, it still is a truthy value
  currentUser: null,
  setCurrentUser: () => null,
});

// set values to prevent human typing errors
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

// useReducer automatically gets the state and the action is given as an argument with dispatch
// the Reducer replaces setState
// state.value = current value
// can also spread the state in the return statement for values that don't get changed
// ex: return {...state, currentUser: payload}
export const userReducer = (state, action) => {
  // payload contains the new value to set to
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        currentUser: payload,
      };
    default:
      // need to handle error for a type that we don't have a case for
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

// children are the components that need access to the context
export const UserProvider = ({ children }) => {
  // can destructure 'currentUser' from 'state'
  // initial state is an object
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  // dispatch is attatched to useReducer which has userReducer as an argument
  // need to define setCurrentUser to pass as a value
  const setCurrentUser = user => {
    // need type and payload to call userReducer
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  // allows any of the children to access useState
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
