import React from "react";

const MessageContent = ({ message: { user, text }, username }) => {
  let isSentByCurrentUser = false;
  const trimName = username.trim().toLowerCase();
  if (user === trimName) {
    isSentByCurrentUser = true;
  }

  return(
   
    isSentByCurrentUser === true ? (
      <div style={{
        float: "right",
      }}>
        <p className="sentText pr-10">{trimName}</p>
        <div>
          <p>{text}</p>
        </div>
      </div>
    ) : (
      <div style={{
        float: "left"
      }}>
        <div>
          <p >{text}</p>
        </div>
        <p className="sentText pl-10">{user}</p>
      </div>
    )
  )
}

export default MessageContent;