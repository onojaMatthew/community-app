import { connect } from "react-redux";
import { getTasks } from "../../../store/actions/actions_task";
import TaskList from "../../../views/Tasks/TaskList";

const mapStateToProps = (state) => {
  return {
    task: state.task
  }
}

const mapDispatchToProps = (dispatch) => {
  const dispatchProps = {
    getTasks: () => dispatch(getTasks())
  }

  return dispatchProps;
}

const TaskListContainer = connect(mapStateToProps, mapDispatchToProps)(TaskList);

export default TaskListContainer;