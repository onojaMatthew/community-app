import React from "react";

const InfoBar = ({ roomName, userAvatar }) => (
  <div style={{
    background: "#2979ff",
    height: 60,
    width: "100%",
    color: "#fff",
    paddingLeft: 15,
    paddingTop: 5,
    fontSize: 18
  }}>
    <span>
      <img style={{
        width: 50, 
        height:50, 
        borderRadius: "100%",
        marginRight: 10
      }} src={userAvatar} alt="Online user" />
    </span>
    {roomName}
  </div>
)

export default InfoBar;