import { MailFilled, MessageFilled } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Row, Col, Alert } from "reactstrap";
import Inbox from "./Inbox";
import NewMessage from "./NewMessage";
import SentMessages from "./Sent";

const styles = {
  sidebar: {
    color: "#5e86c9",
    fontSize: "18px",
    marginTop: ""
  }
}
const Messages = () => {
  const [ inbox, setInbox ] = useState(true);
  const [ newMessage, setNewMessage ] = useState(false);
  const [ sent, setSent ] = useState(false);
  const [ archive, setArchive ] = useState(false);

  const toggleInbox = () => {
    setInbox(true);
    setNewMessage(false);
    setSent(false);
    setArchive(false);
  }

  const toggelNewMessage = () => {
    setInbox(false);
    setNewMessage(true);
    setSent(false);
    setArchive(false);
  }

  const toggleSent = () => {
    setInbox(false);
    setNewMessage(false);
    setSent(true);
    setArchive(false);
  }

  const toggleArchive = () => {
    setInbox(false);
    setNewMessage(false);
    setSent(false);
    setArchive(true);
  }

  return (
    <Row>
      <Col xs="12" xl="2">
        <p className="mt-3 new-message-button" style={styles.sidebar} onClick={toggelNewMessage}>
          <MailFilled /> New messages
        </p>
        <p className="mt-3" style={styles.sidebar} onClick={toggleInbox}>Inbox</p>
        <p className="mt-3" style={styles.sidebar} onClick={toggleSent}>Sent</p>
        <p className="mt-3" style={styles.sidebar} onClick={toggleArchive}>Mentions</p>
      </Col>
      <Col xs="12" xl="10">
        {newMessage ? (
          <NewMessage />
        ) : null}
        {inbox ? (
          <Inbox />
        ) : null}
        {sent ? (
         <SentMessages />
        ) : null}
        {archive ? (
          <Row>
            <Col xs="12" xl="12">
              <Alert style={{ background: "#d1f0ff", width: "100%" }}>You have no activity yet</Alert>
            </Col>
          </Row>
        ) : null}
      </Col>
    </Row>
  )
}

export default Messages;