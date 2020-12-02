import React from 'react';
import { Button, Form, FormGroup, Label, Input, Card, CardBody, Spinner } from 'reactstrap';

const NewTask = ({
  users,
  task,
  onChange,
  onAssignTask,
  deadline,
  description
}) => {
  // const userList = users.users && users.users;
  return (
    <Card>
      <CardBody>
        <Form onSubmit={(e) => onAssignTask(e)}>
          <FormGroup>
            <Label for="exampleSelect">Assign to:</Label>
            <Input onChange={(e) => onChange(e, "assignedTo")} type="select" name="select" id="exampleSelect">
              <option>Select a staff</option>
              {users.map(user => (
                <option value={user._id}>{user.firstName} {user.lastName}</option> 
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Assign a supervisor</Label>
            <Input onChange={(e) => onChange(e, "supervisedBy")} type="select" id="exampleSelect">
              <option>Select a supervisor</option>
              {users.map(user => (
                <option value={user._id}>{user.firstName} {user.lastName}</option> 
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Deadline</Label>
            <Input onChange={(e) => onChange(e, "deadline")} value={deadline} type="date" id="exampleSelect" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Task description</Label>
            <Input 
              type="textarea" 
              onChange={(e) => onChange(e, "description")}
              value={description}
              id="exampleText"
            />
          </FormGroup>
          {task.assignLoading === true ? <Spinner color="primary" /> : <Button color="primary">Assign task</Button>}
        </Form>
      </CardBody>
    </Card>
  );
}

export default NewTask;
