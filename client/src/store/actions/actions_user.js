import { isAuthenticated } from "../../helper/authenticate";

export const GET_USER_START = "GET_USER_START";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const GET_USERS_START = "GET_USERS_START";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILED = "GET_USERS_FAILED";
export const PROFILE_UPDATE_START = "PROFILE_UPDATE_START";
export const PROFILE_UPDATE_SUCCESS = "PROFILE_UPDATE_SUCCESS";
export const PROFILE_UPDATE_FAILED = "PROFILE_UPDATE_FAILED";
export const PHOTO_UPLOAD_START = "PHOTO_UPLOAD_START";
export const PHOTO_UPLOAD_SUCCESS = "PHOTO_UPLOAD_SUCCESS";
export const PHOTO_UPLOAD_FAILED = "PHOTO_UPLOAD_FAILED";
export const UPDATE_STATUS_START = "UPDATE_STATUS_START";
export const UPDATE_STATUS_SUCCESS = "UPDATE_STATUS_SUCCESS";
export const UPDATE_STATUS_FAILED = "UPDATE_STATUS_FAILED";
export const ASSIGN_PORTFOLIO_START = "ASSIGN_PORTFOLIO_START";
export const ASSIGN_PORTFOLIO_SUCCESS = "ASSIGN_PORTFOLIO_SUCCESS";
export const ASSIGN_PORTFOLIO_FAILED = "ASSIGN_PORTFOLIO_FAILED";
export const ALLOCATE_SALARY_START = "ALLOCATE_SALARY_START";
export const ALLOCATE_SALARY_SUCCESS = "ALLOCATE_SALARY_SUCCESS";
export const ALLOCATE_SALARY_FAILED = "ALLOCATE_SALARY_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL; // "https://ojirehprime-community-api.herokuapp.com/v1";

export const profileUpdateStart = () => {
  return {
    type: PROFILE_UPDATE_START
  }
}

export const profielUpdateSuccess = (data) => {
  return {
    type: PROFILE_UPDATE_SUCCESS,
    data
  }
}

export const profileUpdateFailed = (error) => {
  return {
    type: PROFILE_UPDATE_FAILED,
    error
  }
}

export const profileUpdate = (userId, data) => {
  return dispatch => {
    dispatch(profileUpdateStart());
    fetch(`${BASE_URL}/update/${userId}`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(profileUpdateFailed(resp.error));
        dispatch(profielUpdateSuccess(resp))
      })
      .catch(err => {
        dispatch(profileUpdateFailed(`Profile update failed. Please try again ${err.message}`));
      });
  }
}

export const uploadStart = () => {
  return {
    type: PHOTO_UPLOAD_START
  }
}

export const uploadSuccess = (data) => {
  return {
    type: PHOTO_UPLOAD_SUCCESS,
    data
  }
}

export const uploadFailed = (error) => {
  return {
    type: PHOTO_UPLOAD_FAILED,
    error
  }
}

export const uploadPhoto = (userId, data) => {
  return dispatch => {
    dispatch(uploadStart());
    fetch(`${BASE_URL}/profile/upload/${userId}`, {
      method: "PUT",
      body: data
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(uploadFailed(resp.error));
        dispatch(uploadSuccess(resp));
      })
      .catch(err => {
        dispatch(uploadFailed(`Failed to upload photo. ${err.message}`));
      });
  }
}

export const getUserStart = () => {
  return {
    type: GET_USER_START
  }
}

export const getUserSuccess = (data) => {
  return {
    type: GET_USER_SUCCESS,
    data
  }
}

export const getUserFailed = (error) => {
  return {
    type: GET_USER_FAILED, 
    error
  }
}

export const getUser = (userId) => {
  return dispatch => {
    dispatch(getUserStart());
    fetch(`${BASE_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getUserSuccess(resp.error));
        dispatch(getUserSuccess(resp));
      })
      .catch(err => {
        dispatch(getUserFailed(`Request failed. ${err.message}`));
      });
  }
}


export const getUsersStart = () => {
  return {
    type: GET_USERS_START
  }
}

export const getUsersSuccess = (data) => {
  return {
    type: GET_USERS_SUCCESS,
    data
  }
}

export const getUsersFailed = (error) => {
  return {
    type: GET_USERS_FAILED, 
    error
  }
}

export const getUsers = () => {
  const role = isAuthenticated().user.role,
    userId = isAuthenticated().user._id;
  return dispatch => {
    dispatch(getUsersStart());
    fetch(`${BASE_URL}/users/${userId}/${role}`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getUsersSuccess(resp.error));
        dispatch(getUsersSuccess(resp));
      })
      .catch(err => {
        dispatch(getUsersFailed(`Request failed. ${err.message}`));
      });
  }
}

export const updateStatusStart = () => {
  return {
    type: UPDATE_STATUS_START
  }
}

export const updateStatusSuccess = (data) => {
  return {
    type: UPDATE_STATUS_SUCCESS,
    data
  }
}

export const updateStatusFailed = (error) => {
  return {
    type: UPDATE_STATUS_FAILED,
    error
  }
}

export const updateStatus = (data) => {
  const userId = data.userId,
   adminId = isAuthenticated().user._id,
   role = isAuthenticated().user.role;
  
  return dispatch => {
    dispatch(updateStatusStart());
    fetch(`${BASE_URL}/status/${userId}/${role}/${adminId}`, {
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
        if (resp.error) return dispatch(updateStatusFailed(resp.error));
        dispatch(updateStatusSuccess(resp));
      })
      .then(() => {
        dispatch(getUser(userId))
      })
      .catch(err => {
        dispatch(updateStatusFailed(`Request failed. ${err.message}`));
      });
  }
}

export const assignPortfolioStart = () => {
  return {
    type: ASSIGN_PORTFOLIO_START
  }
}

export const assignPortfolioSuccess = (data) => {
  return {
    type: ASSIGN_PORTFOLIO_SUCCESS,
    data
  }
}

export const assignPortfolioFailed = (error) => {
  return {
    type: ASSIGN_PORTFOLIO_FAILED,
    error
  }
}

export const assignPortfolio = (data) => {
  const adminId = isAuthenticated().user._id,
    role = isAuthenticated().user.role,
    portfolioId = data.portfolioId,
    userId = data.userId;
  return dispatch => {
    dispatch(assignPortfolioStart());
    fetch(`${BASE_URL}/user/portfolio/${portfolioId}/${userId}/${role}/${adminId}`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(assignPortfolioFailed(resp.error));
        dispatch(assignPortfolioSuccess(resp));
      })
      .then(() => {
        dispatch(getUser(userId));
      })
      .catch(err => {
        dispatch(assignPortfolioFailed(`Failed to complete. ${err.message}`));
      });
  }
}

export const allocateSalaryStart = () => {
  return {
    type: ALLOCATE_SALARY_START
  }
}

export const allocateSalarySuccess = (data) => {
  return {
    type: ALLOCATE_SALARY_SUCCESS,
    data
  }
}

export const allocateSalaryFailed = (error) => {
  return {
    type: ALLOCATE_SALARY_FAILED,
    error
  }
}

export const allocateSalary = (data) => {
  const userId = data.userId,
    role = isAuthenticated().user.role,
    adminId = isAuthenticated().user._id;
  return dispatch => {
    dispatch(allocateSalaryStart());
    fetch(`${BASE_URL}/user/salary/${userId}/${role}/${adminId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      },
      body: JSON.stringify(data)
    })
      .then(response =>  response.json())
      .then(resp => {
        if (resp.error) return dispatch(allocateSalaryFailed(resp.error));
        dispatch(allocateSalarySuccess(resp));
      })
      .catch(err => {
        dispatch(`Request failed. ${err.message}`);
      });
  }
}