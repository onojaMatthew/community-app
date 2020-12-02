import { isAuthenticated } from "../../helper/authenticate";
import dotenv from "dotenv";

export const CREATE_CATEGORY_START = "CREATE_CATEGORY_START";
export const CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS";
export const CREATE_CATEGORY_FAILED = "CREATE_CATEGORY_FAILED";

export const GET_CATEGORY_START = "GET_CATEGORY_START";
export const GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS";
export const GET_CATEGORY_FAILED = "GET_CATEGORY_FAILED";

export const UPDATE_CATEGORY_START = "UPDATE_CATEGORY_START";
export const UPDATE_CATEGORY_SUCCESS = "UPDATE_CATEGORY_SUCCESS";
export const UPDATE_CATEGORY_FAILED = "UPDATE_CATEGORY_FAILED";

export const DELETE_CATEGORY_START = "DELETE_CATEGORY_START";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_FAILED = "DELETE_CATEGORY_FAILED";
dotenv.config();
const BASE_URL = process.env.REACT_APP_API_URL;  // "https://ojirehprime-community-api.herokuapp.com/v1";

export const createCategoryStart = () => {
  return {
    type: CREATE_CATEGORY_START
  }
}

export const createCategorySuccess = (data) => {
  return {
    type: CREATE_CATEGORY_SUCCESS,
    data
  }
}

export const createCategoryFailed = (error) => {
  return {
    type: CREATE_CATEGORY_FAILED,
    error
  }
}

export const createCategory = (data) => {
  const adminId = isAuthenticated().user._id,
    role = isAuthenticated().user.role;
  return dispatch => {
    dispatch(createCategoryStart());
    fetch(`${BASE_URL}/category/${adminId}/${role}`, {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(createCategoryFailed(resp.error));
        dispatch(createCategorySuccess(resp));
      })
      .then(() => {
        dispatch(getCategory());
      })
      .catch(err => {
        dispatch(`Failed to create. ${err.message}`);
      });
  }
}

export const getCategoryStart = () => {
  return {
    type: GET_CATEGORY_START
  }
}

export const getCategorySuccess = (data) => {
  return {
    type: GET_CATEGORY_SUCCESS,
    data
  }
}

export const getCategoryFailed = (error) => {
  return {
    type: GET_CATEGORY_FAILED,
    error
  }
}

export const getCategory = () => {
  return dispatch => {
    dispatch(getCategoryStart());
    fetch(`${BASE_URL}/category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getCategoryFailed(resp.error));
        dispatch(getCategorySuccess(resp));
      })
      .catch(err => {
        dispatch(getCategoryFailed(`Failed to fetch. ${err.message}`));
      });
  }
}

export const deleteCategoryStart = () => {
  return {
    type: DELETE_CATEGORY_START
  }
}

export const deleteCategorySuccess = (data) => {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    data
  }
}

export const deleteCategoryFailed = (error) => {
  return {
    type: DELETE_CATEGORY_FAILED,
    error
  }
}

export const deleteCategory = (categoryId) => {
  const role = isAuthenticated().user.role;
  return dispatch => {
    dispatch(deleteCategoryStart());
    fetch(`${BASE_URL}/category/${categoryId}/${role}`, {
      method: "DELETE",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteCategoryFailed(resp.error));
        dispatch(deleteCategorySuccess(resp));
      })
      .then(() => {
        dispatch(getCategory());
      })
      .catch(err => {
        dispatch(deleteCategoryFailed(`Request failed. ${err.message}`));
      });
  }
}

export const updateCategoryStart = () => {
  return {
    type: UPDATE_CATEGORY_START
  }
}

export const updateCategorySuccess = (data) => {
  return {
    type: UPDATE_CATEGORY_SUCCESS,
    data
  }
}

export const updateCategoryFailed = (error) => {
  return {
    type: UPDATE_CATEGORY_FAILED,
    error
  }
}

export const updateCategory = (data) => {
  const categoryId = data.categoryId;
  const adminId = isAuthenticated().user._id,
    role = isAuthenticated().user.role;
  return dispatch =>{
    dispatch(updateCategoryStart());
    fetch(`${BASE_URL}/category/${categoryId}/${adminId}/${role}`, {
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
        if (resp.error) return dispatch(updateCategoryFailed(resp.error));
        dispatch(updateCategorySuccess(resp));
      })
      .catch(err => {
        dispatch(updateCategoryFailed(`Request failed. ${err.message}`));
      });
  }
}