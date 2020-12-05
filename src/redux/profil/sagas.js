import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as profilApi from './services';
import actions from './actions'
import userActions from '../users/actions'

export function* UPDATE_BACKGROUND_INFO({payload}){
  yield put({
    type: actions.SET_STATE,
    payload: { loading: true}
  })
  const response = yield call(profilApi.updateBackgroundInfo, payload)
  if (response.status) {
    yield put({
      type: userActions.SET_STATE,
      payload: { currentUser: response.data}
    })
    yield put({
      type: actions.SET_STATE,
      payload: { loading: false, openNotification: true}
    })
  }else{
    yield put({
      type: actions.SET_STATE,
      payload: { loading: false}
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.UPDATE_BACKGROUND_INFO, UPDATE_BACKGROUND_INFO),
  ])
}
