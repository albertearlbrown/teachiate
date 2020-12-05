import { all } from 'redux-saga/effects';
import users from './users/sagas';
import profil from './profil/sagas';

export default function* rootSaga() {
  yield all([
    users(),
    profil()
  ])
}
