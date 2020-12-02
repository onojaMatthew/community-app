import {
  SEND_CHAT_START,
  SEND_CHAT_SUCCESS,
  SEND_CHAT_FAILED,
  GET_CHAT_START,
  GET_CHAT_SUCCESS,
  GET_CHAT_FAILED,
  GET_MESSAGE_START,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILED,
  LIKE_CHAT_SUCCESS,
  LIKE_CHAT_FAILED,
  UNLIKE_CHAT_START,
  UNLIKE_CHAT_SUCCESS,
  UNLIKE_CHAT_FAILED,
  LIKE_CHAT_START,
} from "../actions/actions_chat";

const initialState = {
  chats: [],
  loading: false,
  success: false,
  error: ""
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) { 
    case SEND_CHAT_START:
      return{
        ...state,
        loading: true,
      }
    case SEND_CHAT_SUCCESS:
      return{
        ...state,
        loading: false,
        success: true,
        chats: state.chats.concat(action.data),
      }
    case SEND_CHAT_FAILED:
      return{
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case GET_CHAT_START:
      return{
        ...state,
        loading: true,
      }
    case GET_CHAT_SUCCESS:
      return{
        ...state,
        loading: false,
        success: true,
        chats: action.data,
      }
    case GET_CHAT_FAILED:
      return{
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case GET_MESSAGE_START:
      return {
        ...state,
        loading: true,
      }
    case GET_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        chats: action.data,
      }
    case GET_MESSAGE_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case LIKE_CHAT_START:
      return {
        ...state,
        loading: true
      }
    case LIKE_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        chat: action.data,
      }
    case LIKE_CHAT_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case UNLIKE_CHAT_START:
      return {
        ...state,
        loading: true
      }
    case UNLIKE_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        chat: action.data,
      }
    case UNLIKE_CHAT_FAILED:
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

export default chatReducer;