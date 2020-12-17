import { all, takeEvery, put, call, select } from 'redux-saga/effects';
import * as groupApi from './services';
import actions from './actions'

export function* LOAD_GROUP({payload}){
  const response = yield call(groupApi.loadGroup, payload.id)
  if (response) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        group: response
      }
    })
  }else{
    yield put({
      type: actions.SET_STATE,
      payload: {
        group: {},
        showMessageError: true,
        message: 'Failed to load group, please try later!'
      }
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOAD_GROUP, LOAD_GROUP),
  ])
}
