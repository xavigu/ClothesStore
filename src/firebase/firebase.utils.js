import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA2nXiFIYyHPDRW_W9jtG7adzaLiZ-hPUg",
  authDomain: "clothes-store-a35af.firebaseapp.com",
  databaseURL: "https://clothes-store-a35af.firebaseio.com",
  projectId: "clothes-store-a35af",
  storageBucket: "clothes-store-a35af.appspot.com",
  messagingSenderId: "68458598170",
  appId: "1:68458598170:web:d1e467b033582889bea6a3",
  measurementId: "G-QB4SVP0WBX"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  // check if there is any data of that userRef in the database(snapshot), if not create de new user in database
  if(!snapshot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


// get access to google auth in the auth library
const provider = new firebase.auth.GoogleAuthProvider();
// trigger the google pop-up whenever we use google authentication passing the provider
// to the method signInWithPopup after setting parameters
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;