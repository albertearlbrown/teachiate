import actions from './actions'

const initialState = {
  loading: false,
  group: {},
  posts: []
}

export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
