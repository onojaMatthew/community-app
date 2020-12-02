import { localStorageAuth } from "../../helper/authenticate";
import dotenv from "dotenv";

export const SEND_CHAT_START = "SEND_CHAT_START";
export const SEND_CHAT_SUCCESS = "SEND_CHAT_SUCCESS";
export const SEND_CHAT_FAILED = "SEND_CHAT_FAILED";
export const GET_CHAT_START = "GET_CHAT_START";
export const GET_CHAT_SUCCESS = "GET_CHAT_SUCCESS";
export const GET_CHAT_FAILED = "GET_CHAT_FAILED";
export const GET_MESSAGE_START = "GET_MESSAGE_START";
export const GET_MESSAGE_SUCCESS = "GET_MESSAGE_SUCCESS";
export const GET_MESSAGE_FAILED = "GET_MESSAGE_FAILED";
export const LIKE_CHAT_START = "LIKE_CHAT_START";
export const LIKE_CHAT_SUCCESS = "LIKE_CHAT_SUCCESS";
export const LIKE_CHAT_FAILED = "LIKE_CHAT_FAILED";
export const UNLIKE_CHAT_START = "UNLIKE_CHAT_START";
export const UNLIKE_CHAT_SUCCESS = "UNLIKE_CHAT_SUCCESS";
export const UNLIKE_CHAT_FAILED = "UNLIKE_CHAT_FAILED";
dotenv.config()
const BASE_URL = process.env.REACT_APP_API_URL; // "https://ojirehprime-community-api.herokuapp.com/v1";

export const sendChatStart = () => {
  return {
    type: SEND_CHAT_START
  }
}

export const sendChatSuccess = (data) => {
  return {
    type: SEND_CHAT_SUCCESS,
    data
  }
}

export const sendChatFailed = (error) => {
  return {
    type: SEND_CHAT_FAILED,
    error
  }
}

export const sendChat = (socket, data) => {
  return dispatch => {
    dispatch(sendChatStart());
    socket.emit("sendMessage", data, () => {
      // if (error) return dispatch(sendChatFailed());
      // dispatch(sendChatSuccess("Success"));
    });
  }
}

export const getChatStart = () => {
  return {
    type: GET_CHAT_START
  }
}

export const getChatSuccess = (data) => {
  return {
    type: GET_CHAT_SUCCESS,
    data
  }
}

export const getChatFailed = (error) => {
  return {
    type: GET_CHAT_FAILED,
    error
  }
}

export const getChats = (topicId) => {
  return dispatch => {
    dispatch(getChatStart())
    fetch(`${BASE_URL}/chat/${topicId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getChatFailed(resp.error));
        dispatch(getChatSuccess(resp));
      })
      .catch(err => {
        dispatch(getChatFailed(`Failed to fetch chats. ${err.message}`));
      });
  }
}

export const getMessageStart = () => {
  return {
    type: GET_MESSAGE_START
  }
}

export const getMessageSuccess = (data) => {
  return {
    type: GET_MESSAGE_SUCCESS,
    data
  }
}

export const getMessageFailed = (error) => {
  return {
    type: GET_MESSAGE_FAILED,
    error
  }
}

export const getMessage = (socket) => {
  return dispatch => {
    dispatch(getMessageStart());
    socket.on("message", (message, error) => {
      if (error) return dispatch(getMessageFailed(error));
      dispatch(getMessageSuccess(message));
    })
  }
}

export const likeChatStart = () => {
  return {
    type: LIKE_CHAT_START
  }
}

export const likeChatSuccess = (data) => {
  return {
    type: LIKE_CHAT_SUCCESS,
    data
  }
}

export const likeChatFailed = (error) => {
  return {
    type: LIKE_CHAT_FAILED,
    error
  }
}

export const likeChat = (chatId, communityId, topicId) => {
  return dispatch => {
    fetch(`${BASE_URL}/chat/like/${chatId}/${communityId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": localStorageAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(likeChatFailed(resp.error));
        dispatch(likeChatSuccess(resp));
      })
      .then(() => {
        dispatch(getChats(topicId));
      })
      .catch(err => {
        dispatch(likeChatFailed(err.message));
      });
  }
}

export const unlikeChatStart = () => {
  return {
    type: UNLIKE_CHAT_START
  }
}

export const unlikeChatSuccess = (data) => {
  return {
    type: UNLIKE_CHAT_SUCCESS,
    data
  }
}

export const unlikeChatFailed = (error) => {
  return {
    type: UNLIKE_CHAT_FAILED,
    error
  }
}

export const unlikeChat = (chatId, communityId, topicId) => {
  return dispatch => {
    dispatch(unlikeChatStart());
    fetch(`${BASE_URL}/chat/unlike/${chatId}/${communityId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": localStorageAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(unlikeChatFailed(resp.error));
        dispatch(unlikeChatSuccess(resp));
      })
      .then(() => {
        dispatch(getChats(topicId));
      })
      .catch(err => {
        dispatch(unlikeChatFailed(err.message));
      });
  }
}