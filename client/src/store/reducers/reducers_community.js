import {
  NEW_COMMUNITY_START,
  NEW_COMMUNITY_SUCCESS,
  NEW_COMMUNITY_FAILED,
  COMMUNITY_LOGIN_START,
  COMMUNITY_LOGIN_SUCCESS,
  COMMUNITY_LOGIN_FAILED,
  GET_COMMUNITY_START,
  GET_COMMUNITY_SUCCESS,
  GET_COMMUNITY_FAILED,
  GET_ALL_COMMUNITY_START,
  GET_ALL_COMMUNITY_SUCCESS,
  GET_ALL_COMMUNITY_FAILED,
  DELETE_COMMUNITY_START,
  DELETE_COMMUNITY_SUCCESS,
  DELETE_COMMUNITY_FAILED,
  UPLOAD_START,
  UPLOAD_SUCCESS,
  UPLOAD_FAILED,
} from "../actions/actions_community";

const initialState = {
  community: {},
  communities: [],
  deleteLoading: false,
  deleteSuccess: false,
  loading: false,
  uploadLoading: false,
  uploadSuccess: false,
  success: false,
  error: ""
}

const communityReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_COMMUNITY_START:
      return {
        ...state,
        loading: true,
      }
    case NEW_COMMUNITY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        communities: state.communities.concat(action.data),
      }
    case NEW_COMMUNITY_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case COMMUNITY_LOGIN_START:
      return {
        ...state,
        loading: true
      }
    case COMMUNITY_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        community: action.data,
      }
    case COMMUNITY_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case GET_COMMUNITY_START:
      return {
        ...state,
        loading: true,
      }
    case GET_COMMUNITY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        community: action.data,
      }
    case GET_COMMUNITY_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case GET_ALL_COMMUNITY_START:
      return {
        ...state,
        loading: true,
      }
    case GET_ALL_COMMUNITY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        communities: action.data,
      }
    case GET_ALL_COMMUNITY_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case DELETE_COMMUNITY_START:
      return {
        ...state,
        deleteLoading: true,
      }
    case DELETE_COMMUNITY_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        communities: action.data,
      }
    case DELETE_COMMUNITY_FAILED:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: false,
        error: action.error
      }
    case UPLOAD_START:
      return {
        ...state,
        uploadLoading: true,
      }
    case UPLOAD_SUCCESS:
      return {
        ...state,
        uploadLoading: false,
        uploadSuccess: true,
        community: action.data,
      }
    case UPLOAD_FAILED:
      return {
        ...state,
        uploadLoading: false,
        uploadSuccess: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default communityReducer;