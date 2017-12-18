import {combineReducers} from 'redux';
import { reducer as form } from 'redux-form';
import {
  ADD_POST,
  ADD_COMMENT,
  DELETE_POST,
  DELETE_POST_COMMENTS,
  DELETE_COMMENT,
  GET_ALL_POSTS,
  GET_CATEGORIES,
  GET_CATEGORY_POSTS,
  SET_CATEGORY,
  SET_SORT,
  GET_POST_COMMENTS,
  GET_POST_DETAILS,
  UPDATE_POST,
  UPDATE_COMMENT,
  VOTE_POST,
  VOTE_COMMENT,
  INCREMENT_COMMENTS,
  DECREMENT_COMMENTS
} from '../actions'

function posts(state = [], action) {

  switch (action.type) {
    case ADD_POST:
      return [
        ...state,
        action.post
      ]

    case DELETE_POST:
      return state.filter((post) => post.id !== action.postId)

    case GET_ALL_POSTS:
      return action.posts

    case GET_POST_DETAILS:
        return [action.post]

    case GET_CATEGORY_POSTS:
       return action.posts

    case UPDATE_POST:
      return state.map((post) => post.id === action.postId
        ? {...post, title: action.title, body:action.body}
        : post)

    case VOTE_POST:
      return state.map(
         (post) => post.id === action.post.id ? action.post : post )

    case DECREMENT_COMMENTS:
      return state.map((post) => post.id === action.postId
        ?  {...post, commentCount: post.commentCount - 1}
        : post)

    case INCREMENT_COMMENTS:
      return state.map((post) => post.id === action.postId
        ?  {...post, commentCount: post.commentCount + 1}
        : post)

    default:
      return state
  }
}

function comments(state = {}, action) {

  switch (action.type) {

    case ADD_COMMENT:
      const comment = action.comment
      const parentId = comment.parentId
      return {
        ...state,
        [parentId]: [
          ...state[parentId],
          comment
        ]
      }

    case DELETE_COMMENT:
      return {
        ...state,
        [action.parentId]: state[action.parentId].filter((comment) => comment.id !== action.commentId)
      }

    case GET_POST_COMMENTS:
      return {
        ...state,
        [action.postId]: action.comments
      }

    case UPDATE_COMMENT:
      return {
        ...state,
        [action.parentId]: state[action.parentId].map((comment) => comment.id === action.commentId
          ? {...comment,
            body:action.comment.body,
            timestamp: action.comment.timestamp}
          : comment)
      }

    case DELETE_POST_COMMENTS:
      const newState = Object.assign( {}, state)
      delete newState[action.postId]
      return newState

    case VOTE_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: state[action.comment.parentId].map((comment) => comment.id === action.comment.id
          ? action.comment
          : comment)
      }

    default:
      return state
  }
}

function categories(state = [], action) {

  switch (action.type) {

    case GET_CATEGORIES:
      return [{name: 'all', path:'all'}].concat(action.categories.categories)

    default:
      return state
  }
}

function listState (state = { category: 'all', sortType: 'Top Score', error: {} } , action) {

  switch (action.type) {

    case SET_CATEGORY:
      return { ...state, category:action.category }

    case SET_SORT:
      return  { ...state, sortType:action.sortType }

    default:
      return state
  }
}

export default combineReducers({posts,
  comments,
  categories,
  listState,
  form})
