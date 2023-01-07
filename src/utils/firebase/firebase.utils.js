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

// firebase/app - initialize firebase/app with the config settings from our app
// A Firebase App is a container-like object that stores common configuration and shares authentication across Firebase services. After you initialize a Firebase App object in your code, you can add and start using Firebase services.
const firebaseApp = initializeApp(firebaseConfig);
// firebase/auth - create a provider which is specific to each item (button, page, etc)
const googleProvider = new GoogleAuthProvider();
// set the parameters
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

// export const addCollectionAndDocuments = async (
//   collectionKey,
//   objectsToAdd
// ) => {
//   // returns existing or creates new collectionRef
//   const collectionRef = collection(db, collectionKey);

//   // 1 transaction is 1 unit of work
//   // 1 unit of work can be many 'writes'
//   // if 1 write fails, the whole transaction fails
//   //writeBatch will return a batch instance for our db
//   const batch = writeBatch(db);
//   objectsToAdd.forEach(object => {
//     const docRef = doc(collectionRef, object.title.toLowerCase());
//     batch.set(docRef, object);
//   });

//   await batch.commit();
// };

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
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
    } catch (err) {
      console.log('Error creating user', err.message);
    }
  }

  return userDocRef;
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
