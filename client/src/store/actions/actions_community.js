import Auth from "../../helper/LocalStorageAuth"
import { localStorageAuth } from "../../helper/authenticate";

export const NEW_COMMUNITY_START = "NEW_COMMUNITY_START";
export const NEW_COMMUNITY_SUCCESS = "NEW_COMMUNITY_SUCCESS";
export const NEW_COMMUNITY_FAILED = "NEW_COMMUNITY_FAILED";
export const COMMUNITY_LOGIN_START = "COMMUNITY_LOGIN_START";
export const COMMUNITY_LOGIN_SUCCESS = "COMMUNITY_LOGIN_SUCCESS";
export const COMMUNITY_LOGIN_FAILED = "COMMUNITY_LOGIN_FAILED";
export const GET_COMMUNITY_START = "GET_COMMUNITY_START";
export const GET_COMMUNITY_SUCCESS = "GET_COMMUNITY_SUCCESS";
export const GET_COMMUNITY_FAILED = "GET_COMMUNITY_FAILED";
export const GET_ALL_COMMUNITY_START = "GET_ALL_COMMUNITY_START";
export const GET_ALL_COMMUNITY_SUCCESS = "GET_ALL_COMMUNITY_SUCCESS";
export const GET_ALL_COMMUNITY_FAILED = "GET_ALL_COMMUNITY_FAILED";
export const GET_BY_CATEGORY_START = "GET_BY_CATEGORY_START";
export const GET_BY_CATEGORY_SUCCESS = "GET_BY_CATEGORY_SUCCESS";
export const GET_BY_CATEGORY_FAILED = "GET_BY_CATEGORY_FAILED";
export const DELETE_COMMUNITY_START = "DELETE_COMMUNITY_START";
export const DELETE_COMMUNITY_SUCCESS = "DELETE_COMMUNITY_SUCCESS";
export const DELETE_COMMUNITY_FAILED = "DELETE_COMMUNITY_FAILED";
export const UPLOAD_START = "UPLOAD_START";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const UPLOAD_FAILED = "UPLOAD_FAILED";

export const UPDATE_START = "UPDATE_START";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_FAILED = "UPDATE_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL; // "https://ojirehprime-community-api.herokuapp.com/v1";

export const newCommunityStart = () => {
  return {
    type: NEW_COMMUNITY_START
  }
}

export const newCommunitySuccess = (data) => {
  return {
    type: NEW_COMMUNITY_SUCCESS,
    data
  }
}

export const newCommunityFailed = (error) => {
  return {
    type: NEW_COMMUNITY_FAILED,
    error
  }
}

export const newCommunity = (data) => {
  return dispatch => {
    dispatch(newCommunityStart());
    fetch(`${BASE_URL}/community/signup`, {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(newCommunityFailed(resp.error));
        dispatch(newCommunitySuccess(resp));
      })
      .catch(err => {
        if (err.message.includes("Network Error")) {
          dispatch(newCommunityFailed(`Network Error. `));
        }
        dispatch(newCommunityFailed(`Request failed. ${err.message}`));
      });
  }
}

export const communityLoginStart = () => {
  return {
    type: COMMUNITY_LOGIN_START
  }
}

export const communityLoginSuccess = (data) => {
  return {
    type: COMMUNITY_LOGIN_SUCCESS,
    data
  }
}

export const communityLoginFailed = (error) => {
  return {
    type: COMMUNITY_LOGIN_FAILED,
    error
  }
}

export const communityLogin = (data) => {
  return dispatch => {
    dispatch(communityLoginStart());
    fetch(`${BASE_URL}/community/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(communityLoginFailed(resp.error));
        Auth.authenticateUser(JSON.stringify(resp));
        dispatch(communityLoginSuccess(resp));
      })
      .catch(err => {
        if (err.message.includes("Network Error")) {
          dispatch(communityLoginFailed(`Network Error. `));
        }
        dispatch(communityLoginFailed(`Request failed. ${err.message}`));
      });
  }
}

export const getCommunityStart = () => {
  return {
    type: GET_COMMUNITY_START
  }
}

export const getCommnunitySuccess = (data) => {
  return {
    type: GET_COMMUNITY_SUCCESS,
    data
  }
}

export const getCommunityFailed = (error) => {
  return {
    type: GET_COMMUNITY_FAILED,
    error
  }
}

export const getCommunity = (communityId) => {
  return dispatch => {
    dispatch(getCommunityStart());
    fetch(`${BASE_URL}/community/${communityId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getCommunityFailed(resp.errror));
        dispatch(getCommnunitySuccess(resp));
      })
      .catch(err => {
        if (err.message.includes("Network Error")) {
          dispatch(getCommunityFailed(`Network Error.`));
        }
        dispatch(getCommunityFailed(`Request failed. ${err.message}`));
      });
  }
}

export const getAllStart = () => {
  return {
    type: GET_ALL_COMMUNITY_START
  }
}

export const getAllSuccess = (data) => {
  return {
    type: GET_ALL_COMMUNITY_SUCCESS,
    data
  }
}

export const getAllFailed = (error) => {
  return {
    type: GET_ALL_COMMUNITY_FAILED,
    error
  }
}

export const getAllCommunities = () => {
  return dispatch => {
    dispatch(getAllStart());
    fetch(`${BASE_URL}/communities`, {
      method: "GET",
      headers: {
        ACCEP: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getAllFailed());
        dispatch(getAllSuccess(resp));
      })
      .catch(err => {
        if (err.message.includes("Network Error")) {
          dispatch(getAllFailed(`Network Error.`));
        }
        dispatch(getAllFailed(`Request failed. ${err.message}`));
      })
  }
}

export const deleteCommunityStart = () => {
  return {
    type: DELETE_COMMUNITY_START
  }
}

export const deleteCommunitySuccess = (data) => {
  return {
    type: DELETE_COMMUNITY_SUCCESS,
    data
  }
}

export const deleteCommunityFailed = (error) => {
  return {
    type: DELETE_COMMUNITY_FAILED,
    error
  }
}

export const deleteCommunity = (communityId) => {
  return dispatch => {
    dispatch(deleteCommunityStart());
    fetch(`${BASE_URL}/community/${communityId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": localStorageAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteCommunityFailed(resp.error));
        dispatch(deleteCommunitySuccess(resp));
      })
      .catch(err => {
        if (err.message.includes("Network Error")) {
          dispatch(deleteCommunityFailed(`Network Error.`));
        }
        dispatch(deleteCommunityFailed(`Request failed. ${err.message}`));
      });
  }
}


export const uploadStart = () => {
  return {
    type: UPLOAD_START
  }
}

export const uploadSuccess = (data) => {
  return {
    type: UPLOAD_SUCCESS,
    data
  }
}

export const uploadFailed = (error) => {
  return {
    type: UPLOAD_FAILED,
    error
  }
}

export const upload = (data, communityId) => {
  return dispatch => {
    dispatch(uploadStart());
    fetch(`${BASE_URL}/community/photo/upload/${communityId}`, {
      method: "PUT",
      headers: {
        "x-auth-token": localStorageAuth().token
      },
      body: data

    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(uploadFailed(resp.error));
        dispatch(uploadSuccess(resp));
      })
      .catch(err => {
        if (err.message.includes("Network Error")) {
          dispatch(uploadFailed(`Network Error.`));
        }
        dispatch(uploadFailed(`Request failed. ${err.message}`));
      });
  }
}

export const updateStart = () => {
  return {
    type: UPDATE_START
  }
}

export const updateSuccess = (data) => {
  return {
    type: UPDATE_SUCCESS,
    data
  }
}

export const updateFailed = (error) => {
  return {
    type: UPDATE_FAILED,
    error
  }
}

export const updateInfo = (data) => {
  const communityId = localStorageAuth().user._id;
  return dispatch => {
    dispatch(updateStart());
    fetch(`${BASE_URL}/community/update/${communityId}`, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": localStorageAuth().token
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(updateFailed(resp.error));
        dispatch(updateSuccess(resp));
      })
      .then(() => {
        dispatch(getCommunity(communityId));
      })
      .catch(err => {
        dispatch(updateFailed(`Request failed. ${err.message}`));
      });
  }
}