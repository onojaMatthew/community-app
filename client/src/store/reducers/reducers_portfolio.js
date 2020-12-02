import {
  CREATE_PORTFOLIO_START,
  CREATE_PORTFOLIO_SUCCESS,
  CREATE_PORTFOLIO_FAILED,
  GET_START,
  GET_SUCCESS,
  GET_FAILED,
  UPDATE_START,
  UPDATE_SUCCESS,
  UPDATE_FAILED,
  DELETE_START,
  DELETE_SUCCESS,
  DELETE_FAILED
} from "../actions/actions_portfolio";

const initialState = {
  portfolios: [],
  portfolio: {},
  createLoading: false,
  createSuccess: false,
  getLoading: false,
  getSuccess: false,
  updateLoading: false,
  updateSuccess: false,
  deleteLoading: false,
  deleteSuccess: false,
  error: ""
}

const portfolioReducers = (state=initialState, action) => {
  switch(action.type) {
    case CREATE_PORTFOLIO_START:
      return {
        ...state,
        createLoading: true,
      }
    case CREATE_PORTFOLIO_SUCCESS:
      return {
        ...state,
        createLoading: false,
        createSuccess: true,
        portfolios: state.portfolios.concat(action.data),
      }
    case CREATE_PORTFOLIO_FAILED:
      return {
        ...state,
        createLoading: false,
        createSuccess: false,
        error: action.error
      }
    case GET_START:
      return {
        ...state,
        getLoading: true
      }
    case GET_SUCCESS:
      return {
        ...state,
        getLoading: false,
        getSuccess: true,
        portfolios: action.data,
      }
    case GET_FAILED:
    return {
      ...state,
      getLoading: false,
      getSuccess: false,
      error: action.error
    }    
    case UPDATE_START:
      return {
        ...state,
        updateLoading: true
      }
    case UPDATE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        portfolio: action.data,
      }
    case UPDATE_FAILED:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        error: action.error
      }
    case DELETE_START:
      return {
        ...state,
        deleteLoading: true,
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        portfolio: action.data,
      }
    case DELETE_FAILED:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: false,
        error: action.error
      }    
    default:
      return state;
  }
}

export default portfolioReducers;