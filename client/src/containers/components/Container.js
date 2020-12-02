import { connect } from "react-redux";
import EditProfile from "../../views/Pages/ProfileUpdate/EditProfile";
import { profileUpdate, uploadPhoto } from "../../store/actions/actions_user";


const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  const dispatchProps = {
    profileUpdate: (userId, data) => dispatch(profileUpdate(userId, data)),
    uploadPhoto: (userId, data) => dispatch(uploadPhoto(userId, data))
  }

  return dispatchProps;
}

const EditFile = connect(mapStateToProps, mapDispatchToProps)(EditProfile)

export default EditFile;