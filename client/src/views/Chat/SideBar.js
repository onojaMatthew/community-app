import React from "react";

const SideBar = ({ winLocation, userList }) => {
  // const BASE_URL = process.env.REACT_APP_API_URL;
  return(
    <div
      style={{
        height: "100vh",
        background: "#2f353a",
        color: "#fff",
        fontSize: 14
      }}
    >
      {/* {userList && userList.map(user => (
        <div key={user._id} style={{
            paddingLeft: 15,
            cursor: "pointer",
            color: "#fff",
            padding: "10px"
          }}
          onClick={() => winLocation(user._id)}
        >
          <img style={{
            width: 40,
            height: 40,
            borderRadius: "50%"
          }} src={`${BASE_URL}/profile/photo/${user._id}`} alt=""/>
          <span style={{
            margin: "10px"
          }}>{user && user.firstName} {user && user.lastName}</span>
        </div>
      ))} */}
    </div>
  );
}

export default SideBar;