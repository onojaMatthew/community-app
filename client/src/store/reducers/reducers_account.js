import {
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  RESUME_START,
  RESUME_SUCCESS,
  RESUME_FAILED
} from "../actions/actions_account";

const initialState = {
  account: {},
  loginLoading: false,
  loginSuccess: false,
  registerLoading: false,
  registerSuccess: false,
  logoutLoading: false,
  logoutSuccess: false,
  resumeLoading: false,
  resumeSuccess: false,
  error: ""
}

const accountReducer = (state=initialState, action) => {
  switch(action.type) {
    case REGISTRATION_START:
      return {
        ...state,
        registerLoading: true
      }
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        registerLoading: false,
        registerSuccess: true,
        account: action.data,
      }
    case REGISTRATION_FAILED:
      return {
        ...state,
        registerLoading: false,
        registerSuccess: false,
        error: action.error
      }
    case LOGIN_START:
      return {
        ...state,
        loginLoading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: true,
        account: action.data,
      }
    case LOGIN_FAILED:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: false,
        error: action.error
      }
    case LOGOUT_START:
      return {
        ...state,
        logoutLoading: true
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutLoading: false,
        account: action.data,
        logoutSuccess: true,
      }
    case LOGOUT_FAILED:
      return {
        ...state,
        logoutLoading: false,
        logoutSuccess: false,
        error: action.error
      }
    case RESUME_START:
      return {
        ...state,
        resumeLoading: true,
      }
    case RESUME_SUCCESS:
      return {
        ...state,
        resumeLoading: false,
        resumeSuccess: true,
        account: action.error,
      }
    case RESUME_FAILED:
    return {
      ...state,
      resumeLoading: false,
      resumeSuccess: false,
      error: action.error
    }    
    default: 
      return state;
  }
}

export default accountReducer;