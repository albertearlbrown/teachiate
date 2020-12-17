import { all } from 'redux-saga/effects';
import users from './users/sagas';
import profil from './profil/sagas';
import groups from './groups/sagas';

export default function* rootSaga() {
  yield all([
    users(),
    profil(),
    groups(),
  ])
}
