import { connect } from "react-redux";
import PartnerCategory from "../../../views/Category/PartnerCategory";
import { createCategory, getCategory, deleteCategory, updateCategory } from "../../../store/actions/actions_category";

const mapStateToProps = (state) => ({...state});

const mapDispatchToProps = (dispatch) => {
  const dispatchProps = {
    createCategory: (data) => dispatch(createCategory(data)),
    getCategory: () => dispatch(getCategory()),
    deleteCategory: (categoryId) => dispatch(deleteCategory(categoryId)),
    updateCategory: (categoryId) => dispatch(updateCategory(categoryId))
  }

  return dispatchProps;
}

const CategoryFile = connect(mapStateToProps, mapDispatchToProps)(PartnerCategory);

export default CategoryFile;