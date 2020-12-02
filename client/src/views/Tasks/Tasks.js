import React, { Component } from "react";
import NewTask from "./NewTask";

export default class Tasks extends Component{
  state = {
    assignedTo: "",
    supervisedBy: "",
    deadline: "",
    message: "",
    description: "",
    errMsg: ""
  }

  async componentDidMount() {
    const { getTasks, getUsers } = this.props;
    await getTasks();
    await getUsers();
  }

  componentDidUpdate(prevProps, nextProps) {
    if (this.props.task && this.props.task !== prevProps.task) {
      if (this.props.task.error && this.props.task.error.length > 0) {
        this.setState({ errMsg: this.props.task.error });
      } if (this.props.task.assignSuccess === true) {
        this.setState({ message: "Task assigned successfully" });
      }
    }
  }

  onChange = (e, name) => {
    let fields = this.state;
    fields[name] = e.target.value;
    this.setState({ fields });
  }

  onAssignTask = async (e) => {
    e.preventDefault();
    const { assignedTo, description, supervisedBy, deadline } = this.state;
    const { assignTask } = this.props;
    const data = { assignedTo, description, supervisedBy, deadline }
    await assignTask(data);
  }

  render() {
    const { users, task } = this.props;
    const userList = users.users ? users.users : null;
    return (
      <div>
        <h4>Task component</h4>
        <NewTask 
          onAssignTask={this.onAssignTask}
          onChange={this.onChange}
          task={task}
          users={userList}
          assingnedTo={this.state.assignedTo}
          supervisor={this.state.supervisor}
          description={this.state.description}
          deadline={this.state.deadline}
        />
      </div>
    );
  }
}