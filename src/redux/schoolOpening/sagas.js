import { all, takeEvery, put, call, select } from 'redux-saga/effects';
import * as userApi from './services';
import actions from './actions'

export function* LOAD_SCHOOL_OPENING_UPDATES(){
  const response = yield call(userApi.getSchoolOpeningUpdates)
  if (response.success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        schoolOpeningUpdates: response.data
      }
    })
  }else{
    yield put({
      type: actions.SET_STATE,
      payload: {
        schoolOpeningUpdates: {}
      }
    })
  }
}
export function* LOAD_COMMUNITY_FEEDS(){
  const response = yield call(userApi.getCommunityFeeds)
  if (response.success) {
    yield put({
      type: actions.LOAD_COMMUNITY_FEEDS,
      payload: {
        communityFeeds: response.data
      }
    })
  }else{
    yield put({
      type: actions.LOAD_COMMUNITY_FEEDS,
      payload: {
        communityFeeds: {}
      }
    })
  }
}
export function* POST_COMMENT_REPLY(){
  const response = yield call(userApi.replyComment)
  if (response.success) {
    yield put({
      type: actions.LOAD_COMMUNITY_FEEDS,
      payload: {
        communityFeeds: response.data
      }
    })
  }else{
    yield put({
      type: actions.LOAD_COMMUNITY_FEEDS,
      payload: {
        communityFeeds: {}
      }
    })
  }
}

export default function* rootSaga() {
  yield all([
    LOAD_SCHOOL_OPENING_UPDATES(),
    LOAD_COMMUNITY_FEEDS(),
    // takeEvery(actions.LOAD_SCHOOL_OPENING_UPDATES, LOAD_SCHOOL_OPENING_UPDATES),
    // takeEvery(actions.LOAD_COMMUNITY_FEEDS, LOAD_COMMUNITY_FEEDS),
  ])
}
