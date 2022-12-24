import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// config is form the projects page on Firebase in the settings
const firebaseConfig = {
  apiKey: 'AIzaSyAtUP58g0HUnWShNGuhfY7YllQgf1TIl34',

  authDomain: 'crwn-clothing-db-cd201.firebaseapp.com',

  projectId: 'crwn-clothing-db-cd201',

  storageBucket: 'crwn-clothing-db-cd201.appspot.com',

  messagingSenderId: '182947838073',

  appId: '1:182947838073:web:d1e3740c7eb30d6bd0fca8',
};

// firebase/app - initialize firebase/app with the config settings from our app
const firebaseApp = initializeApp(firebaseConfig);
// firebase/auth - create a provider which is specific to each item (button, page, etc)
const provider = new GoogleAuthProvider();
// set the parameters
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
// Firebase/auth - export the sign-in to be used
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
// firebase/firestore to select our database
export const db = getFirestore(); // directly points to our database
// function that when given the user auth, gets a snapshot of the data
export const createUserDocumentFromAuth = async userAuth => {
  // firebase/auth - gets the document in the database
  const userDocRef = doc(db, 'users', userAuth.uid);

  // firebase/auth - getDoc gets the data from the document - has special methods
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (err) {
      console.log('Error creating user', err.message);
    }
  }

  return userDocRef;
};
