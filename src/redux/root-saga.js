import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';

export default function* rootSaga() {
  // array of generators that we want to invoke
  yield all([call(fetchCollectionsStart)]);
}
