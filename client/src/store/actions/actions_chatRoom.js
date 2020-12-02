import { isAuthenticated } from "../../helper/authenticate";
import dotenv from "dotenv";

export const CREATE_CHAT_ROOM_START = "CREATE_CHAT_ROOM_START";
export const CREATE_CHAT_ROOM_SUCCESS = "CREATE_CHAT_ROOM_SUCCESS";
export const CREATE_CHAT_ROOM_FAILED = "CREATE_CHAT_ROOM_FAILED";
export const GET_CHAT_ROOM_START = "GET_CHAT_ROOM_START";
export const GET_CHAT_ROOM_SUCCESS = "GET_CHAT_ROOM_SUCCESS";
export const GET_CHAT_ROOM_FAILED = "GET_CHAT_ROOM_FAILED";
export const DELETE_CHAT_ROOM_START = "DELETE_CHAT_ROOM_START";
export const DELETE_CHAT_ROOM_SUCCESS = "DELETE_CHAT_ROOM_SUCCESS";
export const DELETE_CHAT_ROOM_FAILED = "DELETE_CHAT_ROOM_FAILED";
export const JOIN_CHAT_START = "JOIN_CHAT_START";
export const JOIN_CHAT_SUCCESS = "JOIN_CHAT_SUCCESS";
export const JOIN_CHAT_FAILED = "JOIN_CHAT_FAILED";

dotenv.config()

const BASE_URL = process.env.REACT_APP_API_URL; // "https://ojirehprime-community-api.herokuapp.com/v1"

export const createChatRoomStart = () => {
  return {
    type: CREATE_CHAT_ROOM_START
  }
}

export const createChatRoomSuccess = (data) => {
  return {
    type: CREATE_CHAT_ROOM_SUCCESS,
    data
  }
}

export const createChatRoomFailed = (error) => {
  return {
    type: CREATE_CHAT_ROOM_FAILED,
    error
  }
}

export const createChatRoom = (socket, data) => {
  return dispatch => {
    dispatch(createChatRoomStart());
    socket.emit("join", data, () => {});
    return () => {
      socket.emit("disconnect");
      socket.off();
    }
  }
}

export const getChatRoomStart = () => {
  return {
    type: GET_CHAT_ROOM_START
  }
}

export const getChatRoomSuccess = (data) => {
  return {
    type: GET_CHAT_ROOM_SUCCESS,
    data
  }
}

export const getChatRoomFailed = (error) => {
  return {
    type: GET_CHAT_ROOM_FAILED,
    error
  }
}

export const getChatRoom = () => {
  return dispatch => {
    dispatch(getChatRoomStart());
    fetch(`${BASE_URL}/room`, {
      method: "GET",
      headers: {
        "Content-Type": "application/jsom",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getChatRoomFailed(resp.error));
        dispatch(getChatRoomSuccess(resp));
      })
      .catch(err => {
        dispatch(getChatRoomFailed(`Request failed. ${err.message}`));
      });
  }
}

export const deleteChatRoomStart = () => {
  return {
    type: DELETE_CHAT_ROOM_START
  }
}

export const deleteChatRoomSuccess = (data) => {
  return {
    type: DELETE_CHAT_ROOM_SUCCESS,
    data
  }
}

export const deleteChatRoomFailed = (error) => {
  return {
    type: DELETE_CHAT_ROOM_FAILED,
    error
  }
}

export const deleteChatRoom = (roomId) => {
  return dispatch => {
    dispatch(deleteChatRoomStart());
    fetch(`${BASE_URL}/room/delete/${roomId}`, {
      method: "DELETE",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteChatRoomFailed(resp.error));
        dispatch(deleteChatRoomSuccess(resp));
      })
      .then(() => {
        dispatch(getChatRoom());
      })
      .catch(err => {
        dispatch(deleteChatRoomFailed(`Request failed. ${err.message}` ));
      });
  }
}

export const joinChatStart = () => {
  return {
    type: JOIN_CHAT_START
  }
}

export const joinChatSuccess = (data) => {
  return {
    type: JOIN_CHAT_SUCCESS,
    data
  }
}

export const joinChatFailed = (error) => {
  return {
    type: JOIN_CHAT_FAILED,
    error
  }
}


export const joinChatRoom = (socket, data) => {
  return dispatch => {
    // dispatch(joinChatStart());
    // console.log(response, " response from action");
    dispatch(joinChatSuccess(socket.emit("join", data)));
    return () => {
      socket.emit("disconnect");
      socket.off();
    }
  }
}
