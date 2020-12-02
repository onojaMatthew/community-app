import {
  CREATE_TOPIC_START,
  CREATE_TOPIC_SUCCESS,
  CREATE_TOPIC_FAILED,
  GET_TOPIC_START,
  GET_TOPIC_SUCCESS,
  GET_TOPIC_FAILED,
  GET_TOPICS_START,
  GET_TOPICS_SUCCESS,
  GET_TOPICS_FAILED,
  GET_BY_CATEGORY_START,
  GET_BY_CATEGORY_SUCCESS,
  GET_BY_CATEGORY_FAILED,
  DELETE_TOPIC_START,
  DELETE_TOPIC_SUCCESS,
  DELETE_TOPIC_FAILED,
  LIKE_TOPIC_START,
  LIKE_TOPIC_SUCCESS,
  LIKE_TOPIC_FAILED,
  UNLIKE_TOPIC_START,
  UNLIKE_TOPIC_SUCCESS,
  UNLIKE_TOPIC_FAILED,
} from "../actions/actions_topic";

const initialState = {
  topic: {},
  topics: [],
  categoryLoading: false,
  categorySuccess: false,
  loading: false,
  success: false,
  error: ""
}

const topicReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TOPIC_START:
      return {
        ...state,
        loading: true,
      }
    case CREATE_TOPIC_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        topics: state.topics.concat(action.data),
      }
    case CREATE_TOPIC_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case GET_TOPIC_START:
      return {
        ...state,
        loading: true,
      }
    case GET_TOPIC_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        topic: action.data,
      }
    case GET_TOPIC_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case GET_TOPICS_START:
      return {
        ...state,
        loading: true,
      }
    case GET_TOPICS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        topics: action.data,
      }
    case GET_TOPICS_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case GET_BY_CATEGORY_START:
      return {
        ...state,
        categoryLoading: true,
      }
    case GET_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryLoading: false,
        categorySuccess: true,
        success: false,
        topics: action.data,
      }
    case GET_BY_CATEGORY_FAILED:
      return {
        ...state,
        categoryLoading: false,
        categorySuccess: false,
        error: action.error
      }
    case DELETE_TOPIC_START:
      return {
        ...state,
        loading: true,
      }
    case DELETE_TOPIC_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        topic: action.data,
      }
    case DELETE_TOPIC_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case LIKE_TOPIC_START:
      return {
        ...state,
        loading: true,
      }
    case LIKE_TOPIC_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        topic: action.data,
      }
    case LIKE_TOPIC_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case UNLIKE_TOPIC_START:
      return {
        ...state,
        loading: true,
      }
    case UNLIKE_TOPIC_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        topic: action.data,
      }
    case UNLIKE_TOPIC_FAILED:
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

export default topicReducer;