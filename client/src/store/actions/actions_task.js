import { isAuthenticated } from "../../helper/authenticate";

export const ASSIGN_TASK_START = "ASSIGN_TASK_START";
export const ASSIGN_TASK_SUCCESS = " ASSIGN_TASK_SUCCESS";
export const ASSIGN_TASK_FAILED = "ASSIGN_TASK_FAILED";
export const GET_TASKS_START = "GET_TASKS_START";
export const GET_TASKS_SUCCESS = "GET_TASKS_SUCCESS";
export const GET_TASKS_FAILED = "GET_TASKS_FAILED";
export const COMPLETE_TASK_START = "COMPLETE_TASK_START";
export const COMPLETE_TASK_SUCCESS = "COMPLETE_TASK_SUCCESS";
export const COMPLETE_TASK_FAILED = "COMPLETE_TASK_FAILED";
export const DELETE_TASK_START = "DELETE_TASK_START";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const DELETE_TASK_FAILED = "DELETE_TASK_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL; // "https://ojirehprime-community-api.herokuapp.com/v1";

export const assignTaskStart = () => {
  return {
    type: ASSIGN_TASK_START
  }
}

export const assignTaskSuccess = (data) => {
  return {
    type: ASSIGN_TASK_SUCCESS,
    data
  }
}

export const assignTaskFailed = (error) => {
  return {
    type: ASSIGN_TASK_FAILED,
    error
  }
}

export const assignTask = (data) => {
  const userId = isAuthenticated().user._id;
  return dispatch => {
    dispatch(assignTaskStart());
    fetch(`${BASE_URL}/task/${userId}`, {
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
        if (resp.error) return dispatch(assignTaskFailed(resp.error));
        dispatch(assignTaskSuccess(resp))
      })
      .catch(err => {
        dispatch(assignTaskFailed(`Request failed. ${err.message}`));
      });
  }
}

export const getTasksStart = () => {
  return {
    type: GET_TASKS_START
  }
}

export const getTasksSuccess = (data) => {
  return {
    type: GET_TASKS_SUCCESS,
    data
  }
}

export const getTasksFailed = (error) => {
  return {
    type: GET_TASKS_FAILED,
    error
  }
}

export const getTasks = () => {
  return dispatch => {
    dispatch(getTasksStart());
    fetch(`${BASE_URL}/task`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      }
    })
      .then(response => response.json())
      .then(resp =>{
        if (resp.error) return dispatch(getTasksFailed(resp.error));
        dispatch(getTasksSuccess(resp));
      })
      .catch(err => {
        dispatch(getTasksFailed(`Request failed. ${err.message}`));
      });
  }
}

export const completeTastStart = () => {
  return {
    type: COMPLETE_TASK_START
  }
}

export const completeTaskSuccess = (data) => {
  return {
    type: COMPLETE_TASK_SUCCESS,
    data
  }
}

export const completeTaskFailed = (error) => {
  return {
    type: COMPLETE_TASK_FAILED,
    error
  }
}

export const completeTask = () => {
  return dispatch => {
    dispatch(completeTastStart());
    fetch(`${BASE_URL}/task`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(completeTaskFailed(resp.error));
        dispatch(completeTaskSuccess(resp));
      })
      .catch(err => {
        dispatch(completeTaskFailed(`Request failed. ${err.message}`));
      });
  }
}

export const deleteTaskStart = () => {
  return {
    type: DELETE_TASK_START
  }
}

export const deleteTaskSuccess = (data) => {
  return {
    type: DELETE_TASK_SUCCESS,
    data
  }
}

export const deleteTaskFailed = (error) => {
  return {
    type: DELETE_TASK_FAILED,
    error
  }
}

export const deleteTask = (taskId) => {
  return dispatch => {
    dispatch(deleteTaskStart());
    fetch(`${BASE_URL}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json()",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.eror) return dispatch(deleteTaskFailed(resp.error));
        dispatch(deleteTaskSuccess(resp));
      })
      .catch(err => {
        dispatch(deleteTaskFailed(`Server Error. ${err.message}`));
      });
  }
}