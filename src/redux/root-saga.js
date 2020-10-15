import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
  // array of generators that we want to invoke
  yield all([call(fetchCollectionsStart), call(userSagas)]);
}
