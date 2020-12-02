import { isAuthenticated } from "../../helper/authenticate";

export const CREATE_PORTFOLIO_START = "CREATE_PORTFOLIO_START";
export const CREATE_PORTFOLIO_SUCCESS = "CREATE_PORTFOLIO_SUCCESS";
export const CREATE_PORTFOLIO_FAILED = "CREATE_PORTFOLIO_FAILED";

export const GET_START = "GET_START";
export const GET_SUCCESS = "GET_SUCCESS";
export const GET_FAILED = "GET_FAILED";

export const DELETE_START = "DELETE_START";
export const DELETE_SUCCESS = "DELETE_SUCCESS";
export const DELETE_FAILED = "DELETE_FAILED";

export const UPDATE_START = "UPDATE_START";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_FAILED = "UPDATE_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL; // "https://ojirehprime-community-api.herokuapp.com/v1";

export const createPortfolioStart = () => {
  return {
    type: CREATE_PORTFOLIO_START
  }
}

export const createPortfolioSuccess= (data) => {
  return {
    type: CREATE_PORTFOLIO_SUCCESS,
    data
  }
}

export const createPortfolioFailed = (error) => {
  return {
    type: CREATE_PORTFOLIO_FAILED,
    error
  }
}

export const createPortfolio = (data) => {
  const role = isAuthenticated().user.role,
    adminId = isAuthenticated().user._id;
  return dispatch => {
   dispatch(createPortfolioStart());
   fetch(`${BASE_URL}/portfolio/${adminId}/${role}`, {
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
      if (resp.error) return dispatch(createPortfolioFailed(resp.error));
      dispatch(createPortfolioSuccess(resp));
    })
    .catch(err => {
      dispatch(createPortfolioFailed(`Failed to create. ${err.message}`));
    });
  }
}

export const getPortfolioStart = () => {
  return {
    type: GET_START
  }
}

export const getPortfolioSuccess = (data) => {
  return {
    type: GET_SUCCESS,
    data
  }
}

export const getPortfolioFailed = (error) => {
  return {
    type: GET_FAILED,
    error
  }
}

export const getPortfolio = () => {
  const adminId = isAuthenticated().user._id,
    role = isAuthenticated().user.role;
  return dispatch => {
    dispatch(getPortfolioStart());
    fetch(`${BASE_URL}/portfolio/${adminId}/${role}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getPortfolioFailed(resp.error));
        dispatch(getPortfolioSuccess(resp));
      })
      .catch(err => {
        dispatch(getPortfolioFailed(`Failed to fetch portfolios. ${err.message} `));
      });
  }
}

export const updateStart = () => {
  return {
    type: UPDATE_START
  }
}

export const updateSuccess = (data) => {
  return {
    type: UPDATE_SUCCESS,
    data
  }
}

export const updateFailed = (error) => {
  return {
    type: UPDATE_FAILED,
    error
  }
}

export const updatePortfolio = (data) => {
  const adminId = isAuthenticated().user._id,
    role = isAuthenticated().user.role;

  return dispatch => {
    dispatch(updateStart());
    fetch(`${BASE_URL}/portfolio/update/${adminId}/${role}`, {
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
        if (resp.error) return dispatch(updateFailed(resp.error));
        dispatch(updateSuccess(resp));
      })
      .catch(err => {
        dispatch(`Failed to update. ${err.message}`);
      });
  }
}

export const deleteStart = () => {
  return {
    type: DELETE_START
  }
}

export const deleteSuccess = (data) => {
  return {
    type: DELETE_SUCCESS,
    data
  }
}

export const deleteFailed = (error) => {
  return {
    type: DELETE_FAILED,
    error
  }
}

export const deletePortfolio = (portfolioId) => {
  const adminId = isAuthenticated().user._id,
    role = isAuthenticated().user.role;
  return dispatch => {
    dispatch(deleteStart());
    fetch(`${BASE_URL}/portfolio/delete/${portfolioId}/${adminId}/${role}`, {
      method: "DELETE",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteFailed(resp.error));
        dispatch(deleteSuccess(resp));
      })
      .cacht(err => {
        dispatch(deleteFailed(`Failed to delete. ${err.message}`));
      });
  }
}