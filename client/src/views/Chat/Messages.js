import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import MessageContent from "./MessageContent";

const Messages = ({ messages, username }) => (
  <ScrollToBottom>
    {messages.map((message, i) => (
      <div key={i}>
        <MessageContent message={message} username={username} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;