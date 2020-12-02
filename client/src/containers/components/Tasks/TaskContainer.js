import { connect } from "react-redux";
import Tasks from "../../../views/Tasks/Tasks";
import { assignTask, completeTask, deleteTask, getTasks } from "../../../store/actions/actions_task";
import { getUsers } from "../../../store/actions/actions_user";

const mapStateToProps = (state) => {
  return {
    task: state.task,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  const dispatchToProps = {
    getTasks: () => dispatch(getTasks()),
    assignTask: (data) => dispatch(assignTask(data)),
    completeTask: () => dispatch(completeTask()),
    getUsers: () => dispatch(getUsers()),
    deleteTask: (taskId) => dispatch(deleteTask(taskId))
  }

  return dispatchToProps;
}

const TasksContainer = connect(mapStateToProps, mapDispatchToProps)(Tasks);

export default TasksContainer;