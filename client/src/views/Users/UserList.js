import React from 'react';
import { Link } from "react-router-dom";

const UserList = ({user}) => {
  return (
    <tr>
      <th scope="row">
        <img style={{
          width: 40,
          height: 40,
          borderRadius: "50%"
        }} src={`https://ojirehprime-community-api.herokuapp.com/v1/profile/photo/${user._id}`} alt=""/>
      </th>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>
       <Link to={`/dashboard/users/${user._id}`}>View details</Link>
      </td>
    </tr>
  );
}

export default UserList;
