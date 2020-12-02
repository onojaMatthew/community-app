import {
  ADD_SALARY_START,
  ADD_SALARY_SUCCESS,
  ADD_SALARY_FAILED,
  GET_SALARY_START,
  GET_SALARY_SUCCESS,
  GET_SALARY_FAILED,
  UPDATE_SALARY_START,
  UPDATE_SALARY_SUCCESS,
  UPDATE_SALARY_FAILED,
  DELETE_SALARY_START,
  DELETE_SALARY_SUCCESS,
  DELETE_SALARY_FAILED
} from "../actions/actions_salary";

const initialState = {
  salaries: [],
  salary: {},
  addLoading: false,
  addSuccess: false,
  getLoading: false,
  getSuccess: false,
  updateLoading: false,
  updateSuccess: false,
  deleteLoading: false,
  deleteSuccess: false,
  error: ""
}

const salaryReducer = (state=initialState, action) => {
  switch(action.type) {
    case ADD_SALARY_START:
      return {
        ...state,
        addLoading: true,
      }
    case ADD_SALARY_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        salaries: state.salaries.concat(action.data),
      }
    case ADD_SALARY_FAILED:
      return {
        ...state,
        addLoading: false,
        addSuccess: false,
        error: action.error
      }
    case GET_SALARY_START:
      return {
        ...state,
        getLoading: true,
      }
    case GET_SALARY_SUCCESS:
      return {
        ...state,
        getLoading: false,
        getSuccess: true,
        salaries: action.data,
      }
    case GET_SALARY_FAILED:
      return {
        ...state,
        getLoading: false,
        getSuccess: false,
        error: action.error
      }
    case UPDATE_SALARY_START:
      return {
        ...state,
        updateLoading: true,
      }
    case UPDATE_SALARY_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        salary: action.data,
      }
    case UPDATE_SALARY_FAILED:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        error: action.error
      }
    case DELETE_SALARY_START:
      return {
        ...state,
        deleteLoading: true
      }
    case DELETE_SALARY_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        salary: action.data,
      }
    case DELETE_SALARY_FAILED:
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

export default salaryReducer;