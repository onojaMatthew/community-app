import {
  COMMUNITY_CATEGORY_START,
  COMMUNITY_CATEGORY_SUCCESS,
  COMMUNITY_CATEGORY_FAILED,
  GET_START,
  GET_SUCCESS,
  GET_FAILED,
  DELETE_START,
  DELETE_SUCCESS,
  DELETE_FAILED
} from "../actions/actions_community_category";

const initialState = {
  categories: [],
  category: {},
  loading: false,
  success: false,
  error: ""
}

const topicCategoryReducer = (state=initialState, action) => {
  switch (action.type) {
    case COMMUNITY_CATEGORY_START:
      return {
        ...state,
        loading: true
      }
    case COMMUNITY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        categories: state.categories.concat(action.data),
      }
    case COMMUNITY_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case GET_START:
      return {
        ...state,
        loading: true
      }
    case GET_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        categories: action.data,
      }
    case GET_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case DELETE_START:
      return {
        ...state,
        loading: true,
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        category: action.data,
      }
    case DELETE_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default topicCategoryReducer;