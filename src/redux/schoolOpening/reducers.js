import actions from './actions'

const initialState = {
  loading: false,
  schoolOpeningUpdates : [],
  communityFeeds : [],
}

export default function userReducer(state = initialState, action) {
  const post = state.communityFeeds.filter(i=>i._id===action.payload.id)[0]
  const postIndex = state.communityFeeds.indexOf(post)
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    case actions.LOAD_SCHOOL_OPENING_UPDATES:
      return { ...state, ...action.payload }
    case actions.LOAD_COMMUNITY_FEEDS:
      return { ...state, ...action.payload }
    case actions.REPLY_COMMENT:
      // Required Comment
      const comment = state.communityFeeds[postIndex].comments.filter(j=>j._id===action.payload.commentId)[0]
      // Comment index
      const commentIndex = state.communityFeeds[postIndex].comments.indexOf(comment)
      console.log(action.payload, postIndex, commentIndex, comment)
      state.communityFeeds[postIndex].comments[commentIndex].replies.push(action.payload.data)
      return { ...state, communityFeeds:[...state.communityFeeds] }
    case actions.NEW_COMMENT:
      state.communityFeeds[postIndex].comments.push(action.payload.data)
      return { ...state, communityFeeds:[...state.communityFeeds] }
    default:
      return state
  }
}
