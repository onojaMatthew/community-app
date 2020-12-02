import React, { Component } from "react";
import { isAuthenticated } from "../../helper/authenticate";
import { Table, Spinner } from 'reactstrap';
import UserList from "./UserList";


export default class Users extends Component{
  state = {
    errMessage: "",
    message: ""
  }

  async componentDidMount() {
    const { getUsers } = this.props;
    const userId = isAuthenticated().user._id;
    await getUsers(userId);
  }

  render() {
    const { users } = this.props;
    const userList = users.users && users.users;
    return(
      <div>
        <h4>User List</h4>
        <Table dark>
          <thead>
            <tr>
              <th>Picture</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.usersLoading === true ? (
              <div className="text-center">
                <Spinner color="primary" />
              </div>
            ) : userList ? userList.map(user => (
              <UserList user={user} key={user._id} />
            )) : 
            userList && userList.length === 0 ? <p className="text-center">No Records found yet</p> : null}
          </tbody>
        </Table>
      </div>
    );
  }
}