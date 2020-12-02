import { connect } from "react-redux";
import { getUsers } from "../../../store/actions/actions_user";
import Users from "../../../views/Users/Users";


const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  const dispatchProps = {
    getUsers: (userId) => dispatch(getUsers(userId))
  }

  return dispatchProps;
}

const UserFile = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UserFile;