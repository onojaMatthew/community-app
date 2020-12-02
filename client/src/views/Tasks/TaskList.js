import React, { Component } from "react";
import { Table, Spinner, Input, FormGroup, Card, CardBody } from 'reactstrap';
import moment from "moment";
export default class TaskList extends Component{
  async componentDidMount() {
    const { getTasks } = this.props;
    await getTasks();
  }
  render() {
    const { task } = this.props;
    console.log(task, " this props")
    const tasks = task.tasks && task.tasks;
    return(
      <Card>
        <CardBody>
          <h3>All Task</h3>
          <Table dark>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Task</th>
                <th>Assigned On</th>
                <th>Deadline</th>
                <th>Assigned By</th>
                <th>Assigned To</th>
                <th>Supervisor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {task.getLoading === true ? <Spinner color="primary" /> : tasks && tasks.length > 0 ? tasks.map((t,i) => (
                
                <tr key={t._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{t.description}</td>
                  <td>{moment(t.assignedDate).format("DD/MM/YYYY")}</td>
                  <td>{moment(t.deadline).format("DD/MM/YYYY")}</td>
                  <td>{t.assignedBy && t.assignedBy.firstName} {t.assignedBy && t.assignedBy.lastName}</td>
                  <td>{t.assignedTo && t.assignedTo.firstName} {t.assignedTo && t.assignedTo.lastName}</td>
                  <td>{t.supervisedBy && t.supervisedBy.firstName} {t.supervisedBy && t.supervisedBy.lastName}</td>
                  <td>
                    {t.status === "complete" ? (
                      <FormGroup>
                      <Input style={{
                        width: 10,
                        height: 20
                      }} valid />
                    </FormGroup>
                    ) : "In progress"}
                    
                  </td>
                </tr>
              )) : <tr><td>Record is empty</td></tr>}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}