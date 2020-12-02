import {
  CREATE_CATEGORY_START,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILED,
  GET_CATEGORY_START,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILED,
  DELETE_CATEGORY_START,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILED,
  UPDATE_CATEGORY_START,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILED
} from "../actions/actions_category";

const initialState = {
  categories: [],
  category: {},
  createCategoryLoading: false,
  createCategorySuccess: false,
  getCategoryLoading: false,
  getCategorySuccess: false,
  updateCategoryLoading: false,
  updateCategorySuccess: false,
  deleteCategoryLoading: false,
  deleteCategorySuccess: false,
  error: ""
}

const categoryReducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_CATEGORY_START:
      return {
        ...state,
        createCategoryLoading: true,
      }
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        createCategoryLoading: false,
        createCategorySuccess: true,
        categories: state.categories.concat(action.data),
      }
    case CREATE_CATEGORY_FAILED:
      return {
        ...state,
        createCategoryLoading: false,
        createCategorySuccess: false,
        error: action.error
      }
    case GET_CATEGORY_START:
      return {
        ...state,
        getCategoryLoading: true
      }
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        getCategoryLoading: false,
        getCategorySuccess: true,
        categories: action.data
      }
    case GET_CATEGORY_FAILED:
      return {
        ...state,
        getCategoryLoading: false,
        getCategorySuccess: false,
        error: action.error
      }
    case DELETE_CATEGORY_START:
      return {
        ...state,
        deleteCategoryLoading: true,
      }
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        deleteCategoryLoading: false,
        deleteCategorySuccess: true,
        category: action.data,
        error: action.error
      }
    case DELETE_CATEGORY_FAILED:
      return {
        ...state,
        deleteCategoryLoading: false,
        deleteCategorySuccess: false,
        error: action.error
      }
    case UPDATE_CATEGORY_START:
      return {
        ...state,
        udpateCategoryLoading: true
      }
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        udpateCategoryLoading: false,
        udpateCategorySuccess: true,
        category: action.data,
      }
    case UPDATE_CATEGORY_FAILED:
    return {
      ...state,
      udpateCategoryLoading: false,
      udpateCategorySuccess: false,
      error: action.error
    }    
    default:
      return state;
  }
}

export default categoryReducer;