import { isAuthenticated } from "../../helper/authenticate";
import dotenv from "dotenv";

export const COMMUNITY_CATEGORY_START = "COMMUNITY_CATEGORY_START";
export const COMMUNITY_CATEGORY_SUCCESS = "COMMUNITY_CATEGORY_SUCCESS";
export const COMMUNITY_CATEGORY_FAILED = "COMMUNITY_CATEGORY_FAILED";
export const GET_START = "GET_START";
export const GET_SUCCESS = "GET_SUCCESS";
export const GET_FAILED = "GET_FAILED";
export const DELETE_START = "DELETE_START";
export const DELETE_SUCCESS = "DELETE_SUCCESS";
export const DELETE_FAILED = "DELETE_FAILED";

// dotenv.config()

const BASE_URL = process.env.REACT_APP_API_URL; // "https://ojirehprime-community-api.herokuapp.com/v1";

export const communityCategoryStart = () => {
  return {
    type: COMMUNITY_CATEGORY_START
  }
}

export const communityCategorySuccess = (data) => {
  return {
    type: COMMUNITY_CATEGORY_SUCCESS,
    data
  }
}

export const communityCategoryFailed = (error) => {
  return {
    type: COMMUNITY_CATEGORY_FAILED,
    error
  }
}

export const communityCategory = (data) => {
  return dispatch => {
    dispatch(communityCategoryStart());
    fetch(`${BASE_URL}/chatcat/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp =>{
        if (resp.error) return dispatch(communityCategoryFailed(resp.error));
        dispatch(communityCategorySuccess(resp));
      })
      .catch(err => {
        dispatch(communityCategoryFailed(`Failed to post. ${err.message}`));
      });
  }
}

export const getStart = () => {
  return {
    type: GET_START
  }
}

export const getSuccess = (data) => {
  return {
    type: GET_SUCCESS,
    data
  }
}

export const getFailed = (error) => {
  return {
    type: GET_FAILED,
    error
  }
}

export const getChatCategory = () => {
  return dispatch => {
    dispatch(getStart());
    fetch(`${BASE_URL}/chatcat/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getFailed(resp.error));
        dispatch(getSuccess(resp));
      })
      .catch(err => {
        dispatch(getFailed(`Failed to fetch. ${err.message}`));
      });
  }
}

export const deleteStart = () => {
  return {
    type: DELETE_START
  }
}

export const deleteSuccess = (data) => {
  return {
    type: DELETE_SUCCESS,
    data
  }
}

export const deleteFailed = (error) => {
  return {
    type: DELETE_FAILED,
    error
  }
}

export const deleteCategory = (categoryId) => {
  return dispatch => {
    dispatch(deleteStart());
    fetch(`${BASE_URL}/chatcat/delete/${categoryId}`, {
      method: "DELETE",
      ACCEPT: "application/json",
      "Content-type": "application/json",
      "x-auth-token": isAuthenticated().token
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteFailed(resp.error));
        dispatch(deleteSuccess(resp));
      })
      .catch(err => {
        dispatch(deleteFailed(`Failed to delete. ${err.message}`));
      });
  }
}