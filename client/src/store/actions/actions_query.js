import { isAuthenticated } from "../../helper/authenticate";

export const QUERY_START = "QUERY_START";
export const QUERY_SUCCESS = "QUERY_SUCCESS";
export const QUERY_FAILED = "QUERY_FAILED";

export const GET_QUERY_START = "GET_QUERY_START";
export const GET_QUERY_SUCCESS = "GET_QUERY_SUCCESS";
export const GET_QUERY_FAILED = "GET_QUERY_FAILED";

export const GET_SINGLE_QUERY_START = "GET_SINGLE_QUERY_START";
export const GET_SINGLE_QUERY_SUCCESS = "GET_SINGLE_QUERY_SUCCESS";
export const GET_SINGLE_QUERY_FAILED = "GET_SINGLE_QUERY_FAILED";

export const DELETE_QUERY_START = "DELETE_QUERY_START";
export const DELETE_QUERY_SUCCESS = "DELETE_QUERY_SUCCESS";
export const DELETE_QUERY_FAILED = "DELETE_QUERY_FAILED";

export const QUERY_RESPONSE_START = "QUERY_RESPONSE_START";
export const QUERY_RESPONSE_SUCCESS = "QUERY_RESPONSE_SUCCESS";
export const QUERY_RESPONSE_FAILED = "QUERY_RESPONSE_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL; // "https://ojirehprime-community-api.herokuapp.com/v1";

export const queryStart = () => {
  return {
    type: QUERY_START
  }
}

export const querySuccess = (data) => {
  return {
    type: QUERY_SUCCESS,
    data
  }
}

export const queryFailed = (error) => {
  return {
    type: QUERY_FAILED,
    error
  }
}

export const issueQuery = (data) => {
  const role = isAuthenticated().user.role;
  const adminId = isAuthenticated().user._id;
  return dispatch => {
    fetch(`${BASE_URL}/query/${adminId}/${role}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(queryFailed(resp.error));
        dispatch(querySuccess(resp));
      })
      .catch(err => {
        dispatch(queryFailed(`Request failed. ${err.message}`));
      })
  }
}

export const deleteQueryStart = () => {
  return {
    type: DELETE_QUERY_START
  }
}

export const deleteQuerySuccess = (data) => {
  return {
    type: DELETE_QUERY_SUCCESS,
    data
  }
}

export const deleteQueryFailed = (error) => {
  return {
    type: DELETE_QUERY_FAILED,
    error
  }
}

export const deleteQuery = (queryId) => {
  const adminId = isAuthenticated().user._id;
  const role = isAuthenticated().user.role;
  return dispatch => {
    dispatch(deleteQueryStart());
    fetch(`${BASE_URL}/query/${queryId}/${adminId}/${role}`, {
      method: "DELETE",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteQueryFailed(resp.error));
        dispatch(deleteQuerySuccess(resp));
      })
      .catch(err => {
        dispatch(deleteQueryFailed(`Failed to delete. ${err.message}`));
      });
  }
}

export const getQueryStart = () => {
  return {
    type: GET_QUERY_START
  }
}

export const getQuerySuccess = (data) => {
  return {
    type: GET_QUERY_SUCCESS,
    data
  }
}

export const getQueryFailed = (error) => {
  return {
    type: GET_QUERY_FAILED,
    error
  }
}

export const getQuery = () => {
  const adminId = isAuthenticated().user._id;
  const role = isAuthenticated().user.role;
  return dispatch => {
    dispatch(getQueryStart());
    fetch(`${BASE_URL}/query/${adminId}/${role}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getQueryFailed(resp.error));
        dispatch(getQuerySuccess(resp));
      })
      .catch(err => {
        dispatch(getQueryFailed(`Request failed. ${err.message}`));
      });
  }
}

export const getSingleStart = () => {
  return {
    type: GET_SINGLE_QUERY_START
  }
}

export const getSingleSuccess = (data) => {
  return {
    type: GET_SINGLE_QUERY_SUCCESS,
    data
  }
}

export const getSingleFailed = (error) => {
  return {
    type: GET_SINGLE_QUERY_FAILED,
    error
  }
}

export const getSingleQuery = (userId) => {
  return dispatch => {
    dispatch(getSingleStart());
    fetch(`${BASE_URL}/query/${userId}`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getSingleFailed(resp.error));
        dispatch(getSingleSuccess(resp));
      })
      .catch(err => {
        dispatch(`Failed to fetch query. ${err.message}`);
      });
  }
}

export const queryResponseStart = () => {
  return {
    type: QUERY_RESPONSE_START
  }
}

export const queryResponseSuccess = (data) => {
  return {
    type: QUERY_RESPONSE_SUCCESS,
    data
  }
}

export const queryResponseFailed = (error) => {
  return {
    type: QUERY_RESPONSE_FAILED,
    error
  }
}

export const queryResponse = (data) => {
  const staffId = isAuthenticated().user._id;
  return dispatch => {
    dispatch(queryResponseStart());
    fetch(`${BASE_URL}/query/${staffId}`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(queryResponseFailed(resp.error));
        dispatch(queryResponseSuccess(resp));
      })
      .catch(err => {
        dispatch(`Operation failed. ${err.message}`);
      });
  }
}