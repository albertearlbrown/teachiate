import { combineReducers } from 'redux'
import users from './users/reducers'
import profil from './profil/reducers'
import groups from './groups/reducers'

export default () =>
  combineReducers({
    users,
    profil,
    groups
  })
