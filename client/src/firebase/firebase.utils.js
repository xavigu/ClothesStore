import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA2nXiFIYyHPDRW_W9jtG7adzaLiZ-hPUg',
  authDomain: 'clothes-store-a35af.firebaseapp.com',
  databaseURL: 'https://clothes-store-a35af.firebaseio.com',
  projectId: 'clothes-store-a35af',
  storageBucket: 'clothes-store-a35af.appspot.com',
  messagingSenderId: '68458598170',
  appId: '1:68458598170:web:d1e467b033582889bea6a3',
  measurementId: 'G-QB4SVP0WBX',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  // check if there is any data of that userRef in the database(snapshot), if not create de new user in database
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

// Transform array of query objects into an object to use in the app with the right properties
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      id: doc.id,
      routeName: encodeURI(title.toLowerCase()),
      title,
      items,
    };
  });
  // transform the array of objects into an object of objects with a key
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.routeName] = collection;
    return accumulator;
  }, {});
};

// Function to add a collection in Firebase passing a string collectionKey, and the array of objects to add
export const addCollectionsAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log('collection Ref:', collectionRef);
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

firebase.initializeApp(config);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// get access to google auth in the auth library
export const googleProvider = new firebase.auth.GoogleAuthProvider();
// trigger the google pop-up whenever we use google authentication passing the provider
// to the method signInWithPopup after setting parameters
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
