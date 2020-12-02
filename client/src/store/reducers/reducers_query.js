import {
  QUERY_START,
  QUERY_SUCCESS,
  QUERY_FAILED,
  GET_QUERY_START,
  GET_QUERY_SUCCESS,
  GET_QUERY_FAILED,
  DELETE_QUERY_START,
  DELETE_QUERY_SUCCESS,
  DELETE_QUERY_FAILED,
  QUERY_RESPONSE_START,
  QUERY_RESPONSE_SUCCESS,
  QUERY_RESPONSE_FAILED,
  GET_SINGLE_QUERY_START,
  GET_SINGLE_QUERY_SUCCESS,
  GET_SINGLE_QUERY_FAILED
} from "../actions/actions_query";

const initialState = {
  queries: [],
  query: {},
  loading: false,
  success: false,
  getLoading: false,
  getSuccess: false,
  responseLoading: false,
  responseSuccess: false,
  deleteLoading: false,
  deleteSuccess: false,
  error: ""
}

const queryReducer = (state = initialState, action) => {
  switch(action.type) {
    case QUERY_START:
      return {
        ...state,
        loading: true
      }
    case QUERY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        queries: state.queries.concat(action.data),
      }
    case QUERY_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case GET_QUERY_START:
      return {
        ...state,
        getLoading: true
      }
    case GET_QUERY_SUCCESS:
      return {
        ...state,
        getLoading: false,
        getSuccess: true,
        queries: action.data
      }
    case GET_QUERY_FAILED:
      return {
        ...state,
        getLoading: false,
        getSuccess: false,
        error: action.error
      }
    case DELETE_QUERY_START:
      return {
        ...state,
        deleteLoading: true
      }
    case DELETE_QUERY_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        query: action.data,
      }
    case DELETE_QUERY_FAILED:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: false,
        error: action.error
      }
    case QUERY_RESPONSE_START:
      return {
        ...state,
        responseLoading: true,
      }
    case QUERY_RESPONSE_SUCCESS:
      return {
        ...state,
        responseLoading: false,
        responseSuccess: true,
        query: action.data,
      }
    case QUERY_RESPONSE_FAILED:
      return {
        ...state,
        responseLoading: false,
        responseSuccess: false,
        error: action.error
      }
    case GET_SINGLE_QUERY_START:
      return {
        ...state,
        getLoading: true      }
    case GET_SINGLE_QUERY_SUCCESS:
      return {
        ...state,
        getLoading: false,
        getSuccess: true,
        query: action.data,
      }
    case GET_SINGLE_QUERY_FAILED:
      return {
        ...state,
        getLoading: false,
        getSuccess: false,
        error: action.error
      }
    default: 
      return state;
  }
}

export default queryReducer;