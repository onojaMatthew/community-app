import React, { useState, useEffect } from "react";
import queryString from "query-string"
import { Card, Row, Col } from "reactstrap";
import DefaultAvatar from "../../assets/img/user-avatar.png";

import io from "socket.io-client";
import SideBar from "./SideBar";
import InfoBar from "./InfoBar";
import MessageBox from "./MessageBox";
import Messages from "./Messages";

let socket;
const Message = ({ location }) => {
  const [username, setName] = useState("");
  const [roomName, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const url = "localhost:5255";

  useEffect(() => {
    const { username, roomName } = queryString.parse(location.search);
    socket = io(url);
    setName(username);
    setRoom(roomName);
    
    socket.emit("join", { username, roomName}, () => {})

    return () => {
      socket.emit("disconnect");
      socket.off();
    }
  }, [url, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.llog(message, " from socket")
      setMessages([...messages, message]);
      console.log("after set message")
    })
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault()
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  }

  return (
    <div>
      <InfoBar userAvatar={DefaultAvatar} roomName={roomName} />
      <Card style={{ height: "80vh" }}>
        <Row>
          <Col xs="12" xl="9">
            <Messages username={username} messages={messages} />
            <MessageBox setMessage={setMessage} sendMessage={sendMessage} message={message} />
          </Col>
          <Col
            xs="3" sm="3" xl="3"
            style={{ 
              height:"430px",
            }}
          >
            <SideBar />
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Message;