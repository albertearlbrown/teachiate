import actions from './actions'

const initialState = {
  loading: false,
  schoolOpeningUpdates : [],
  communityFeeds : [],
}

export default function userReducer(state = initialState, action) {
  const post = state.communityFeeds.filter(i=>i._id===action.payload.id)[0]
  const posts = state.schoolOpeningUpdates.filter(i=>i._id===action.payload.id)[0]
  const postIndex = state.communityFeeds.indexOf(post)
  const postIndexx = state.schoolOpeningUpdates.indexOf(posts)
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
      state.communityFeeds[postIndex].comments[commentIndex].replies.push(action.payload.data)
      return { ...state, communityFeeds:[...state.communityFeeds] }
    case actions.LIKE_FEED_POST:
      if(post.likes.includes(action.payload.userId)) {
        let newLikes = post.likes.filter(k=>k!==action.payload.userId)
        post.likes = newLikes
      }else{
        post.likes.push(action.payload.userId)
      }
      return { ...state, communityFeeds:[...state.communityFeeds] }
    case actions.LIKE_COMMUNITY_POST:
      if(posts.likes.includes(action.payload.userId)) {
        let newLikes = posts.likes.filter(k=>k!==action.payload.userId)
        posts.likes = newLikes
      }else{
        posts.likes.push(action.payload.userId)
      }
      return { ...state, schoolOpeningUpdates:[...state.schoolOpeningUpdates] }
    case actions.REPLY_COMMENT_SCHOOL:
      // Required Comment
      const newComment = state.schoolOpeningUpdates[postIndexx].comments.filter(j=>j._id===action.payload.commentId)[0]
      // Comment index
      const commentIndexx = state.schoolOpeningUpdates[postIndexx].comments.indexOf(newComment)
      state.schoolOpeningUpdates[postIndexx].comments[commentIndexx].replies.push(action.payload.data)
      return { ...state, schoolOpeningUpdates:[...state.schoolOpeningUpdates] }
    case actions.NEW_COMMENT:
      state.communityFeeds[postIndex].comments.push(action.payload.data)
      return { ...state, communityFeeds:[...state.communityFeeds] }
    default:
      return state
  }
}
