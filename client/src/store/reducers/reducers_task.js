import {
  ASSIGN_TASK_START,
  ASSIGN_TASK_SUCCESS,
  ASSIGN_TASK_FAILED,
  COMPLETE_TASK_START,
  COMPLETE_TASK_SUCCESS,
  COMPLETE_TASK_FAILED,
  DELETE_TASK_START,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILED,
  GET_TASKS_START,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILED
} from "../actions/actions_task";

const initialState = {
  task: {},
  tasks: [],
  assignLoading: false,
  assignSuccess: false,
  getLoading: false,
  getSuccess: false,
  completeLoading: false,
  completeSuccess: false,
  deleteLoading: false,
  deleteSuccess: false,
  error: "",
}

const taskReducer = (state=initialState, action) => {
  switch(action.type) {
    case ASSIGN_TASK_START:
      return {
        ...state,
        assignLoading: true
      }
    case ASSIGN_TASK_SUCCESS:
      return {
        ...state,
        assignLoading: false,
        assignSuccess: true,
        tasks: state.tasks.concat(action.data),
      }
    case ASSIGN_TASK_FAILED:
      return {
        ...state,
        assignLoading: false,
        assignSuccess: false,
        error: action.error
      }
    case GET_TASKS_START:
      return {
        ...state,
        getLoading: true
      }
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        getLoading: false,
        getSuccess: true,
        tasks: action.data,
      }
    case GET_TASKS_FAILED:
      return {
        ...state,
        getLoading: false,
        getSuccess: false,
        error: action.error
      }
    case COMPLETE_TASK_START:
      return {
        ...state,
        completeLoading: true
      }
    case COMPLETE_TASK_SUCCESS:
      return {
        ...state,
        completeLoading: false,
        completeSuccess: true,
        task: action.data,
      }
    case COMPLETE_TASK_FAILED:
      return {
        ...state,
        completeLoading: false,
        completeSuccess: false,
        error: action.error
      }
    case DELETE_TASK_START:
      return {
        ...state,
        deleteLoading: true
      }
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        task: action.data,
      }
    case DELETE_TASK_FAILED:
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

export default taskReducer;