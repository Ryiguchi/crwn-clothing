import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

// config is form the projects page on Firebase in the settings
const firebaseConfig = {
  apiKey: 'AIzaSyAtUP58g0HUnWShNGuhfY7YllQgf1TIl34',

  authDomain: 'crwn-clothing-db-cd201.firebaseapp.com',

  projectId: 'crwn-clothing-db-cd201',

  storageBucket: 'crwn-clothing-db-cd201.appspot.com',

  messagingSenderId: '182947838073',

  appId: '1:182947838073:web:d1e3740c7eb30d6bd0fca8',
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Auth is an instance of the curent user that has signed in /Signed up
export const auth = getAuth();
// Firebase/auth - export the function to create the (userAuth) to be used to get the userDocRef
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// firebase/firestore to select our database
export const db = getFirestore(); // directly points to our database

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

// function that when given the user auth, gets a snapshot of the data
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;
  // firebase/auth - gets the document in the database
  //Even if there is no user, Firestore  will return an empty one
  const userDocRef = doc(db, 'users', userAuth.uid);

  // firebase/auth - getDoc gets the data from the document - has special methods
  const userSnapshot = await getDoc(userDocRef);

  // if it is a new user, there won't be a userSnapshot
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  return userSnapshot;
};

// this will take the email and password and return an authUser object
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// callback is like the handler
// this is like the subscriber published model
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
