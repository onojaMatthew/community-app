import { isAuthenticated } from "../../helper/authenticate";

export const ADD_SALARY_START = "ADD_SALARY_START";
export const ADD_SALARY_SUCCESS = "ADD_SALARY_SUCCESS";
export const ADD_SALARY_FAILED = "ADD_SALARY_FAILED";

export const GET_SALARY_START = "GET_SALARY_START";
export const GET_SALARY_SUCCESS = "GET_SALARY_SUCCESS";
export const GET_SALARY_FAILED = "GET_SALARY_FAILED";

export const UPDATE_SALARY_START = "UPDATE_SALARY_START";
export const UPDATE_SALARY_SUCCESS = "UPDATE_SALARY_SUCCESS";
export const UPDATE_SALARY_FAILED = "UPDATE_SALARY_FAILED";

export const DELETE_SALARY_START = "DELETE_SALARY_START";
export const DELETE_SALARY_SUCCESS = "DELETE_SALARY_SUCCESS";
export const DELETE_SALARY_FAILED = "DELETE_SALARY_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL; // "https://ojirehprime-community-api.herokuapp.com/v1";

export const addSalaryStart = () => {
  return {
    type: ADD_SALARY_START
  }
}

export const addSalarySuccess = (data) => {
  return {
    type: ADD_SALARY_SUCCESS,
    data
  }
}

export const addSalaryFailed = (error) => {
  return {
    type: ADD_SALARY_FAILED,
    error
  }
}

export const addSalary = (data) => {
  const role = isAuthenticated().user.role;
  return dispatch => {
    dispatch(addSalaryStart());
    fetch(`${BASE_URL}/salary/${role}`, {
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
        if (resp.error) return dispatch(addSalaryFailed(resp.error));
        dispatch(addSalarySuccess(addSalarySuccess(resp)));
      })
      .then(() => {
        dispatch(getSalary());
      })
      .catch(err => {
        return dispatch(addSalaryFailed(`Request failed. ${err.message}`));
      });
  }
}

export const getSalaryStart = () => {
  return {
    type: GET_SALARY_START
  }
}

export const getSalarySuccess = (data) => {
  return {
    type: GET_SALARY_SUCCESS,
    data
  }
}

export const getSalaryFailed = (error) => {
  return {
    type: GET_SALARY_FAILED,
    error
  }
}

export const getSalary = () => {
  return dispatch => {
    dispatch(getSalaryStart());
    fetch(`${BASE_URL}/salary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getSalaryFailed(resp.error));
        dispatch(getSalarySuccess(resp));
      })
      .catch(err => {
        dispatch(getSalaryFailed(`Request failed. ${err.message}`));
      });
  }
}

export const updateSalaryStart = () => {
  return {
    type: UPDATE_SALARY_START
  }
}

export const updateSalarySuccess = (data) => {
  return {
    type: UPDATE_SALARY_SUCCESS,
    data
  }
}

export const updateSalaryFailed = (error) => {
  return {
    type: UPDATE_SALARY_FAILED,
    error
  }
}

export const updateSalary = (data) => {
  const role = isAuthenticated().user.role;
  return dispatch => {
    dispatch(updateSalaryStart());
    fetch(`${BASE_URL}/salary/${role}/${data.salaryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(updateSalaryFailed(resp.error));
        dispatch(updateSalarySuccess(resp));
      })
      .then(() => {
        dispatch(getSalary());
      })
      .catch(err => {
        dispatch(updateSalaryFailed(`Request failed. ${err.message}`));
      });
  }
}

export const deleteSalaryStart = () => {
  return {
    type: DELETE_SALARY_START
  }
}

export const deleteSalarySuccess = (data) => {
  return {
    type: DELETE_SALARY_SUCCESS,
    data
  }
}

export const deleteSalaryFailed = (error) => {
  return {
    type: DELETE_SALARY_FAILED,
    error
  }
}

export const deleteSalary = (salaryId) => {
  const role = isAuthenticated().user.role;
  return dispatch => {
    dispatch(deleteSalaryStart());
    fetch(`${BASE_URL}/salary/${role}/${salaryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteSalaryFailed(resp.error));
        dispatch(deleteSalarySuccess(resp));
      })
      .then(() => {
        dispatch(getSalary());
      })
      .catch(err =>  {
        dispatch(deleteSalaryFailed(`Request failed. ${err.message}`));
      });
  }
}