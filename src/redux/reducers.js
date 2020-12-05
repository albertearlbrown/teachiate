import { combineReducers } from 'redux'
import users from './users/reducers'

export default () =>
  combineReducers({
    users,
  })
