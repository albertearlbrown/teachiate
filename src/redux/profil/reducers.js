import actions from './actions'

const initialState = {
  loading: false,
  currentUser: {},
  notificationConfig: {},
  showForm: false,
  sendToList: [],
  inbox: [],
  sent:[],
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}