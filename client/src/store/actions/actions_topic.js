import { localStorageAuth } from "../../helper/authenticate";

export const CREATE_TOPIC_START = "CREATE_TOPIC_START";
export const CREATE_TOPIC_SUCCESS = "CREATE_TOPIC_SUCCESS";
export const CREATE_TOPIC_FAILED = "CREATE_TOPIC_FAILED";
export const GET_TOPIC_START = "GET_TOPIC_START";
export const GET_TOPIC_SUCCESS = "GET_TOPIC_SUCCESS";
export const GET_TOPIC_FAILED = "GET_TOPIC_FAILED";
export const GET_TOPICS_START = "GET_TOPICS_START";
export const GET_TOPICS_SUCCESS = "GET_TOPICS_SUCCESS";
export const GET_TOPICS_FAILED = "GET_TOPICS_FAILED";
export const GET_BY_CATEGORY_START = "GET_BY_CATEGORY_START";
export const GET_BY_CATEGORY_SUCCESS = "GET_BY_CATEGORY_SUCCESS";
export const GET_BY_CATEGORY_FAILED = "GET_BY_CATEGORY_FAILED";
export const DELETE_TOPIC_START = "DELETE_TOPIC_START";
export const DELETE_TOPIC_SUCCESS = "DELETE_TOPIC_SUCCESS";
export const DELETE_TOPIC_FAILED = "DELETE_TOPIC_FAILED";
export const LIKE_TOPIC_START = "LIKE_TOPIC_START";
export const LIKE_TOPIC_SUCCESS = "LIKE_TOPIC_SUCCESS";
export const LIKE_TOPIC_FAILED = "LIKE_TOPIC_FAILED";
export const UNLIKE_TOPIC_START = "UNLIKE_TOPIC_START";
export const UNLIKE_TOPIC_SUCCESS = "UNLIKE_TOPIC_SUCCESS";
export const UNLIKE_TOPIC_FAILED = "UNLIKE_TOPIC_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL; // "https://ojirehprime-community-api.herokuapp.com/v1";

export const createTopicStart = () => {
  return {
    type: CREATE_TOPIC_START
  }
}

export const createTopicSuccess = (data) => {
  return {
    type: CREATE_TOPIC_SUCCESS,
    data
  }
}

export const createTopicFailed = (error) => {
  return {
    type: CREATE_TOPIC_FAILED,
    error
  }
}

export const createTopic = (data) => {
  const token = localStorageAuth().token;
  return dispatch => {
    dispatch(createTopicStart());
    fetch(`${BASE_URL}/topic/new`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(createTopicFailed(resp.error));
        dispatch(createTopicSuccess(resp));
      })
      .then(() => {
        dispatch(getTopics());
      })
      .catch(err => {
        if (err.message.includes("Network Error")) {
          dispatch(createTopicFailed(`Network Error. `));
        }
        dispatch(createTopicFailed(`Request failed. ${err.message}`));
      });
  }
}

export const getTopicStart = () => {
  return {
    type: GET_TOPIC_START
  }
}

export const getTopicSuccess = (data) => {
  return {
    type: GET_TOPIC_SUCCESS,
    data
  }
}

export const getTopicFailed = (error) => {
  return {
    type: GET_TOPIC_FAILED,
    error
  }
}

export const getTopic = (topicId) => {
  return dispatch => {
    dispatch(getTopicStart());
    fetch(`${BASE_URL}/topic/${topicId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getTopicFailed(resp.error));
        dispatch(getTopicSuccess(resp));
      })
      .catch(err => {
        if (err.message.includes("Network Error")) {
          dispatch(getTopicFailed(`Network Error. `));
        }
        dispatch(getTopicFailed(`Request failed. ${err.message}`));
      });
  }
}

export const getTopicsStart = () => {
  return {
    type: GET_TOPICS_START
  }
}

export const getTopicsSuccess = (data) => {
  return {
    type: GET_TOPICS_SUCCESS,
    data
  }
}

export const getTopicsFailed = (error) => {
  return {
    type: GET_TOPICS_FAILED,
    error
  }
}

export const getTopics = () => {
  return dispatch => {
    dispatch(getTopicsStart());
    fetch(`${BASE_URL}/topic/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getTopicFailed(resp.error));
        dispatch(getTopicsSuccess(resp));
      })
      .catch(err => {
        if (err.message.includes("Network Error")) {
          dispatch(getTopicsFailed(`Network Error. `));
        }
        dispatch(getTopicsFailed(`Request failed. ${err.message}`));
      });
  }
}

export const byCategoryStart = () => {
  return {
    type: GET_BY_CATEGORY_START
  }
}

export const byCategorySuccess = (data) => {
  return {
    type: GET_BY_CATEGORY_SUCCESS,
    data
  }
}

export const byCategoryFailed = (error) => {
  return {
    type: GET_BY_CATEGORY_FAILED,
    error
  }
}

export const getByCategory = (category) => {
  return dispatch => {
    dispatch(byCategoryStart());
    fetch(`${BASE_URL}/topic/category/${category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(byCategoryFailed(resp.error));
        dispatch(byCategorySuccess(resp));
      })
      .catch(err => {
        if (err.message.includes("Network Error")) {
          dispatch(byCategoryFailed(`Network Error. `));
        }
        dispatch(byCategoryFailed(`Request failed. ${err.message}`));
      });
  }
}

export const deleteStart = () => {
  return {
    type: DELETE_TOPIC_START
  }
}

export const deleteSuccess = (data) => {
  return {
    type: DELETE_TOPIC_SUCCESS,
    data
  }
}

export const deleteFailed = (error) => {
  return {
    type: DELETE_TOPIC_FAILED,
    error
  }
}

export const deleteTopic = (topicId) => {
  return dispatch => {
    dispatch(deleteStart());
    fetch(`${BASE_URL}/topic/delete/${topicId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteFailed(resp.error));
        dispatch(deleteSuccess(resp));
      })
      .catch(err => {
        if (err.message.includes("Network Error")) {
          dispatch(deleteFailed(`Network Error. `));
        }
        dispatch(deleteFailed(`Request failed. ${err.message}`));
      });
  }
}

export const likeTopicStart = () => {
  return {
    type: LIKE_TOPIC_START
  }
}

export const likeTopicSuccess = (data) => {
  return {
    type: LIKE_TOPIC_SUCCESS,
    data
  }
}

export const likeTopicFailed = (error) => {
  return {
    type: LIKE_TOPIC_FAILED,
    error
  }
}

export const likeTopic = (topicId, communityId) => {
  return dispatch => {
    dispatch(likeTopicStart())
    fetch(`${BASE_URL}/topic/like/${topicId}/${communityId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": localStorageAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(likeTopicFailed(resp.error));
        dispatch(likeTopicSuccess(resp));
      })
      .then(() => {
        dispatch(getTopic(topicId))
      })
      .catch(err => {
        dispatch(likeTopicFailed(err.message));
      });
  }
}

export const unlikeTopicStart = () => {
  return {
    type: UNLIKE_TOPIC_START
  }
}

export const unlikeTopicSuccess = (data) => {
  return {
    type: UNLIKE_TOPIC_SUCCESS,
    data
  }
}

export const unlikeTopicFailed = (error) => {
  return {
    type: UNLIKE_TOPIC_FAILED,
    error
  }
}

export const unlikeTopic = (topicId, communityId) => {
  return dispatch => {
    dispatch(unlikeTopicStart());
    fetch(`${BASE_URL}/topic/unlike/${topicId}/${communityId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": localStorageAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(unlikeTopicFailed(resp.error));
        dispatch(unlikeTopicSuccess(resp));
      })
      .then(() => {
        dispatch(getTopic(topicId))
      })
      .catch(err => {
        dispatch(unlikeTopicFailed(err.message));
      });
  }
}