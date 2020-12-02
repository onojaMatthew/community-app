import {
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  PROFILE_UPDATE_START,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILED,
  PHOTO_UPLOAD_START,
  PHOTO_UPLOAD_SUCCESS,
  PHOTO_UPLOAD_FAILED,
  UPDATE_STATUS_START,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAILED,
  ASSIGN_PORTFOLIO_START,
  ASSIGN_PORTFOLIO_SUCCESS,
  ASSIGN_PORTFOLIO_FAILED,
  ALLOCATE_SALARY_START,
  ALLOCATE_SALARY_SUCCESS,
  ALLOCATE_SALARY_FAILED,
} from "../actions/actions_user";

const initialState = {
  user: {},
  users: [],
  updateSuccess: false,
  updateLoading: false,
  uploadSuccess: false,
  uploadLoading: false,
  userLoading: false,
  userSuccess: false,
  usersSuccess: false,
  usersLoading: false,
  deleteSuccess: false,
  deleteLoading: false,
  statusLoading: false,
  statusSuccess: false,
  portfolioSuccess: false,
  portfolioLoading: false,
  salaryLoading: false,
  salarySuccess: false,
  error: ""
}


const userReducers = (state=initialState, action) => {
  switch(action.type) {
    case GET_USER_START:
      return {
        ...state,
        userLoading: true,
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        userSuccess: true,
        user: action.data,
      }
    case GET_USER_FAILED:
      return {
        ...state,
        userLoading: false,
        userSuccess: false,
        error: action.error
      }
    case GET_USERS_START:
      return {
        ...state,
        usersLoading: true,
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        usersLoading: false,
        usersSuccess: true,
        users: action.data,
      }
    case GET_USERS_FAILED:
      return {
        ...state,
        usersLoading: false,
        usersSuccess: false,
        error: action.error
      }
    case PROFILE_UPDATE_START:
      return {
        ...state,
        updateLoading: true
      }
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        user: action.data,
      }
    case PROFILE_UPDATE_FAILED:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        error: action.error
      }
    case PHOTO_UPLOAD_START:
      return {
        ...state,
        uploadLoading: true,
      }
    case PHOTO_UPLOAD_SUCCESS:
      return {
        ...state,
        uploadLoading: false,
        uploadSuccess: true,
        user: action.data,
      }
    case PHOTO_UPLOAD_FAILED:
      return {
        ...state,
        uploadLoading: false,
        uploadSuccess: false,
        error: action.error
      }
    case UPDATE_STATUS_START:
      return {
        ...state,
        statusLoading: true
      }
    case UPDATE_STATUS_SUCCESS: 
      return {
        ...state,
        statusLoading: false,
        statusSuccess: true,
        user: action.user
      }
    case UPDATE_STATUS_FAILED:
      return {
        ...state,
        statusLoading: false,
        statusSuccess: false,
        error: action.error
      }
    case ASSIGN_PORTFOLIO_START: 
      return {
        ...state,
        portfolioLoading: true
      }
    case ASSIGN_PORTFOLIO_SUCCESS: 
      return {
        ...state,
        portfolioLoading: false,
        portfolioSuccess: true,
        user: action.data
      }
    case ASSIGN_PORTFOLIO_FAILED: 
      return {
        ...state,
        portfolioLoading: false,
        portfolioSuccess: false,
        error: action.error
      }
    case ALLOCATE_SALARY_START:
      return {
        ...state,
        salaryLoading: true,
      }
    case ALLOCATE_SALARY_SUCCESS:
      return {
        ...state,
        salaryLoading: false,
        salarySuccess: true,
        user: action.data,
      }
    case ALLOCATE_SALARY_FAILED:
      return {
        ...state,
        salaryLoading: false,
        salarySuccess: false,
        error: action.error
      }
    default: 
      return state;
  }
}

export default userReducers;