import { connect } from "react-redux";
import { login } from "../../store/actions/actions_account";
import Login from "../../views/Pages/Login/Login";

const mapStateToProps = (state) => {
  return {
    account: state.account
  }
}

const mapDispatchToProps = (dispatch) => {
  const dispatchProps = {
    login: (data) => dispatch(login(data))
  }

  return dispatchProps;
}

const AccountRegistration = connect(mapStateToProps, mapDispatchToProps)(Login);

export default AccountRegistration