import { connect } from "react-redux";
import { getUser, updateStatus, assignPortfolio, allocateSalary } from "../../../store/actions/actions_user";
import UserView from "../../../views/Users/UserView";
import { issueQuery, getSingleQuery } from "../../../store/actions/actions_query";
import { getPortfolio } from "../../../store/actions/actions_portfolio";
import { getSalary } from "../../../store/actions/actions_salary";


const mapStateToProps = (state) => {
  return {
    users: state.users,
    query: state.query,
    portfolio: state.portfolio,
    salary: state.salary,
  }
}

const mapDispatchToProps = (dispatch) => {
  const dispatchProps = {
    getUser: (userId) => dispatch(getUser(userId)),
    issueQuery: (data) => dispatch(issueQuery(data)),
    updateStatus: (data) => dispatch(updateStatus(data)),
    getPortfolio: () => dispatch(getPortfolio()),
    getSingleQuery: (userId) => dispatch(getSingleQuery(userId)),
    assignPortfolio: (data) => dispatch(assignPortfolio(data)),
    getSalary: () => dispatch(getSalary()),
    allocateSalary: (data) => dispatch(allocateSalary(data)),
  }

  return dispatchProps;
}

const UserviewFile = connect(mapStateToProps, mapDispatchToProps)(UserView);

export default UserviewFile;