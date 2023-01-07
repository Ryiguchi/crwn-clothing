import { createContext, useState, useEffect } from 'react';

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
// children are the components that need access to the context
export const UserProvider = ({ children }) => {
  // Initialize the state as null
  // Any component that is listening for currentUser via context, will update when setCurrentUser is ran
  const [currentUser, setCurrentUser] = useState(null);
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
