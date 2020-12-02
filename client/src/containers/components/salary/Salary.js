import { connect } from "react-redux";
import { addSalary, getSalary, updateSalary, deleteSalary } from "../../../store/actions/actions_salary";
import Salary from "../../../views/Salary/Salary";

const mapStateToProps = (state) => {
  return {
    salary: state.salary
  }
}

const mapDispatchToProps = (dispatch) => {
  const dispatchToProps = {
    addSalary: (data) => dispatch(addSalary(data)),
    getSalary: () => dispatch(getSalary()),
    updateSalary: (data) => dispatch(updateSalary(data)),
    deleteSalary: (data) => dispatch(deleteSalary(data)),
  }

  return dispatchToProps;
}

const SalaryFile = connect(mapStateToProps, mapDispatchToProps)(Salary);

export default SalaryFile;