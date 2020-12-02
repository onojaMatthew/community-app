import { connect } from "react-redux";
import Register from "../../views/Pages/Register/Register";
import { registration } from "../../store/actions/actions_account";

const mapStateToProps = (state) => {
  return {
    account: state.account
  }
}

const mapDispatchToProps = (dispatch) => {
  const dispatchProps = {
    registration: (data) => dispatch(registration(data))
  }

  return dispatchProps;
}

const AccountRegistration = connect(mapStateToProps, mapDispatchToProps)(Register);

export default AccountRegistration