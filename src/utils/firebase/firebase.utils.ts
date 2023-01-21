import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
  sendPasswordResetEmail,
  User,
  NextOrObserver,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  updateDoc,
  writeBatch,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { Order } from '../../components/payment-form/payment-form.component';
import { Category } from '../../store/categories/categories.types';

// config is form the projects page on Firebase in the settings
const firebaseConfig = {
  apiKey: 'AIzaSyAtUP58g0HUnWShNGuhfY7YllQgf1TIl34',

  authDomain: 'crwn-clothing-db-cd201.firebaseapp.com',

  projectId: 'crwn-clothing-db-cd201',

  storageBucket: 'crwn-clothing-db-cd201.appspot.com',

  messagingSenderId: '182947838073',

  appId: '1:182947838073:web:d1e3740c7eb30d6bd0fca8',
};

initializeApp(firebaseConfig);

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

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
};

export type AdditionalInfo = {
  displayName?: string;
};

export type UserData = {
  displayName: string;
  email: string;
  providerId: string;
  createdAt: Date;
  orderHistory: Order[];
  id?: string;
};

// function that when given the user auth, gets a snapshot of the data
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInfo = {} as AdditionalInfo
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
    const { providerId } = userAuth.providerData[0];
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        providerId,
        orderHistory: [],
        ...additionalInfo,
      });
    } catch (error) {
      console.log('Error creating user', error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

// this will take the email and password and return an authUser object
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// callback is like the handler
// this is like the subscriber published model
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  const auth = getAuth();
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

export const changeUserDisplayName = async (
  user: UserData,
  newName: string
): Promise<void> => {
  const auth = getAuth();
  const userDocRef = doc(db, 'users', auth.currentUser!.uid);
  try {
    await setDoc(userDocRef, { ...user, displayName: newName });
    alert('Your display name has been successfully updated.');
  } catch (error) {
    alert('There was an error changing your display name!');
  }
};

export const changeUserEmail = async (
  user: UserData,
  email: string
): Promise<void> => {
  const auth = getAuth();

  try {
    if (user.providerId === 'google.com')
      throw new Error(
        'You can not change the email address of an account created with Google!'
      );
    await updateEmail(auth.currentUser!, email);
    alert('Your email address has been successfully updated.');
  } catch (error) {
    alert(error);
  }
};

export const reauthenticate = async (
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  const auth = getAuth();
  const { currentUser } = auth;
  if (!currentUser || !currentUser.email) return;
  const { email } = currentUser;

  const credential = EmailAuthProvider.credential(email, oldPassword);

  try {
    await reauthenticateWithCredential(currentUser, credential);
    await updatePassword(currentUser, newPassword);
    alert('Your password has been successfully changed.');
  } catch (error) {
    alert('A problem occured while trying to change your password');
  }
};

export const saveOrderToUserFirebase = async (user: UserData, order: Order) => {
  const auth = getAuth();
  if (!auth || !auth.currentUser) return;
  try {
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    const userOrders = user.orderHistory;
    await updateDoc(userDocRef, {
      ...user,
      orderHistory: [...userOrders, order],
    });
  } catch (error) {
    alert(
      'Your order was successful but due to an error, your order maight not be visible in your order history.'
    );
  }
};

export const sendResetEmail = async (email: string) => {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);
    alert('The password reset email has been sent!');
  } catch (error) {
    alert('There was a problem sending the email. Try again.');
  }
};
