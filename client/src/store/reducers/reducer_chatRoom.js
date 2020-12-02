import {
  CREATE_CHAT_ROOM_START,
  CREATE_CHAT_ROOM_SUCCESS,
  CREATE_CHAT_ROOM_FAILED,
  GET_CHAT_ROOM_START,
  GET_CHAT_ROOM_SUCCESS,
  GET_CHAT_ROOM_FAILED,
  DELETE_CHAT_ROOM_START,
  DELETE_CHAT_ROOM_SUCCESS,
  DELETE_CHAT_ROOM_FAILED,
  JOIN_CHAT_SUCCESS,
} from "../actions/actions_chatRoom";

const initialState = {
  rooms: [],
  room: {},
  loading: false,
  success: false,
  getLoading: false,
  getSuccess: false,
  deleteLoading: false,
  deleteSuccess: false,
  joinLoading: false,
  joinSuccess: false,
  error: ""
}

const chatroomReducer = (state=initialState, action) => {
  switch(action.type) {
    case CREATE_CHAT_ROOM_START:
      return {
        ...state,
        loading: true
      }
    case CREATE_CHAT_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        rooms: state.rooms.concat(action.data),
      }
    case CREATE_CHAT_ROOM_FAILED:
      return {
        ...state,
        postLoading: false,
        postSuccess: false,
        error: action.error
      }
    case GET_CHAT_ROOM_START:
      return {
        ...state,
        getLoading: true
      }
    case GET_CHAT_ROOM_SUCCESS:
      return {
        ...state,
        getLoading: false,
        getSuccess: true,
        rooms: action.data,
      }
    case GET_CHAT_ROOM_FAILED:
      return {
        ...state,
        getLoading: false,
        getSuccess: false,
        error: action.error
      }
    case DELETE_CHAT_ROOM_START:
      return {
        ...state,
        deleteLoading: true
      }
    case DELETE_CHAT_ROOM_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        room: action.data,
      }
    case DELETE_CHAT_ROOM_FAILED:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: false,
        error: action.error
      }
    case JOIN_CHAT_SUCCESS:
      return {
        ...state,
        joinLoading: false,
        joinSuccess: true,
        room: action.data
      }
    default: 
      return state;
  }
}

export default chatroomReducer;