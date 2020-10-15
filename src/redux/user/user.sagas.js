import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  auth,
  createUserProfileDocument,
  googleProvider,
} from '../../firebase/firebase.utils';

import { googleSignInFailure, googleSignInSuccess } from './user.actions';

import UserActionTypes from './user.types';

export function* signInWithGoogle() {
  // every API call needs go into try-catch block to catch the error
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    console.log('user with google popup: ', user);
    // create user object to storage into the database
    const userRef = yield call(createUserProfileDocument, user);
    // get user snapshot from firebase
    const userSnapshot = yield userRef.get();
    //put(), puts things back into our regular Redux flow
    yield put(
      // update the currentUser state with the userReducer
      googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch (error) {
    yield put(googleSignInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart)]);
}
