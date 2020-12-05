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

export function* GET_NOTIFICATION_CONFIGS(){
  yield put({
    type: actions.SET_STATE,
    payload: {
      showForm: false,
      loading: true
    }
  })
  const response = yield call(profilApi.getNotificationConfig)
  if (response) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        notificationConfig: response.data,
        showForm: true,
        loading: false,
      }
    })
  }else{
    yield put({
      type: actions.SET_STATE,
      payload: {
        notificationConfig: {},
        loading: false,
        showForm: true,
      }
    })
  }
}

export function* UPDATE_NOTIFICATION_CONFIGS({payload}){
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true
    }
  })
  const response = yield call(profilApi.updateNotificationsConfig, payload)
  if (response) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        openNotification: true
      }
    })
  }else{
    yield put({
      type: actions.SET_STATE,
      payload: {
        notificationConfig: {},
        loading: false,
        showForm: true,
      }
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.UPDATE_BACKGROUND_INFO, UPDATE_BACKGROUND_INFO),
    takeEvery(actions.GET_NOTIFICATION_CONFIGS, GET_NOTIFICATION_CONFIGS),
    takeEvery(actions.UPDATE_NOTIFICATION_CONFIGS, UPDATE_NOTIFICATION_CONFIGS),
  ])
}
