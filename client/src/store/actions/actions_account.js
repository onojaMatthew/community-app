import Auth from "../../helper/Auth";
import { isAuthenticated } from "../../helper/authenticate";
import dotenv from "dotenv";
export const REGISTRATION_START = "REGISTRATION_START";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_START = "LOGOUT_START";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const RESUME_START = "RESUME_START";
export const RESUME_SUCCESS = "RESUME_SUCCESS";
export const RESUME_FAILED = "RESUME_FAILED";

dotenv.config();
const BASE_URL = process.env.REACT_APP_API_URL;

export const registrationStart = () => {
  return {
    type: REGISTRATION_START
  }
}

export const registrationSuccess = (data) => {
  return {
    type: REGISTRATION_SUCCESS,
    data
  }
}

export const registrationFailed = (error) => {
  return {
    type: REGISTRATION_FAILED,
    error
  }
}

export const registration = (data) => {
  return dispatch => {
    dispatch(registrationStart());
    fetch(`${BASE_URL}/create`, {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(registrationFailed(resp.error));
        localStorage.setItem("userId", resp.userId);
        dispatch(registrationSuccess(resp.message))
      })
      .catch(err => {
        dispatch(registrationFailed(`Request failed. ${err.message}`));
      });
  }
}

export const loginStart = () => {
  return {
    type: LOGIN_START
  }
}

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data
  }
}

export const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    error
  }
}

export const login = (data) => {
  return dispatch => {
    dispatch(loginStart());
    fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(loginFailed(resp.error));
        Auth.authenticateUser(JSON.stringify(resp));
        dispatch(loginSuccess(resp));
      })
      .then(() => {
        dispatch(timeResumed());
      })
      .catch(err => {
        dispatch(loginFailed(`Login failed. ${err.message}`));
      });
  }
}

export const logoutStart = () => {
  return {
    type: LOGOUT_START
  }
}

export const logoutSuccess = (data) => {
  return {
    type: LOGOUT_SUCCESS,
    data
  }
}

export const logoutFailed = (error) => {
  return {
    type: LOGOUT_FAILED,
    error
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(loginStart());
    fetch(`${BASE_URL}/logout`, {
      method:"GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(resp =>{
        if (resp.error) return dispatch(logoutFailed(resp.error));
        dispatch(logoutSuccess(resp));
      })
      .catch(err => {
        dispatch(logoutFailed(`Failed to logout. ${err.message}`));
      });
  }
}

export const resumeStart = () => {
  return {
    type: RESUME_START
  }
}

export const resumeSuccess = (data) => {
  return {
    type: RESUME_SUCCESS,
    data
  }
}

export const resumeFailed = (error) => {
  return {
    type: RESUME_FAILED,
    error
  }
}

export const timeResumed = () => {
  return dispatch => {
    fetch(`${BASE_URL}/resumption/${isAuthenticated().user._id}`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(resumeFailed(resp.error));
        dispatch(resumeSuccess(resp));
      })
      .catch(err => {
        dispatch(resumeFailed(`Failed to update resumption time ${err.message}`));
      });
  }
}