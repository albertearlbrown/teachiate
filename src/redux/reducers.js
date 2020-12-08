import { combineReducers } from 'redux'
import users from './users/reducers'
import profil from './profil/reducers'

export default () =>
  combineReducers({
    users,
    profil
  })
