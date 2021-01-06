import { all, takeEvery, put, call, select } from 'redux-saga/effects';
import * as userApi from './services';
import actions from './actions'

export function* LOAD_CURRENT_ACCOUNT(){
  const response = yield call(userApi.getCurrentUser)
  if (response.success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        currentUser: response.data
      }
    })
  }else{
    yield put({
      type: actions.SET_STATE,
      payload: {
        currentUser: {}
      }
    })
  }
}

export default function* rootSaga() {
  yield all([
    LOAD_CURRENT_ACCOUNT(),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
  ])
}
