import React, { useState, useEffect } from "react";
import { Alert } from "antd";
import { Row, Col } from "reactstrap";

const styles = {
  sidebar: {
    color: "#5e86c9",
    fontSize: "18px",
    marginTop: ""
  }
}
const Notification = () => {
  const [ responses, setResponses ] = useState(false);
  const [ all, setAll ] = useState(true);
  const [ mentions, setMentions ] = useState(false);
  const [ edit, setEdit ] = useState(false);
  const [ likes, setLikes ] = useState(false);

  const toggleAll = () => {
    setAll(true);
    setEdit(false);
    setResponses(false);
    setLikes(false);
    setMentions(false);
  }

  const toggleEdit = () => {
    setAll(false);
    setEdit(true);
    setResponses(false);
    setLikes(false);
    setMentions(false);
  }

  const toggleLikes = () => {
    setAll(false);
    setEdit(false);
    setResponses(false);
    setLikes(true);
    setMentions(false);
  }

  const toggleResponses = () => {
    setAll(false);
    setEdit(false);
    setResponses(true);
    setLikes(false);
    setMentions(false);
  }

  const toggleMentions = () => {
    setAll(false);
    setEdit(false);
    setResponses(false);
    setLikes(false);
    setMentions(true);
  }

  return (
    <div>
      <Row>
        <Col xs="12" xl="2">
          <p className="mt-3" style={styles.sidebar} onClick={toggleAll}>All</p>
          <p className="mt-3" style={styles.sidebar} onClick={toggleResponses}>Responses</p>
          <p className="mt-3" style={styles.sidebar} onClick={toggleLikes}>Likes</p>
          <p className="mt-3" style={styles.sidebar} onClick={toggleMentions}>Mentions</p>
          <p className="mt-3" style={styles.sidebar} onClick={toggleEdit}>Edit</p>
        </Col>
        <Col xs="12" xl="10">
          <div>
            {all ? (
              <Row>
                <Col xs="12" xl="12">
                  <Alert message="Informational Notes" type="info" showIcon />
                </Col>
              </Row>
            ) : null}
            {responses ? (
              <Row>
                <Col xs="12" xl="12">
                  <Alert message="Informational Notes" type="info" showIcon />
                </Col>
              </Row>
            ) : null}
            {likes ? (
              <Row>
                <Col xs="12" xl="12">
                  <Alert message="Informational Notes" type="info" showIcon />
                </Col>
              </Row>
            ) : null}
            {mentions ? (
              <Row>
                <Col xs="12" xl="12">
                  <Alert message="Informational Notes" type="info" showIcon />
                </Col>
              </Row>
            ) : null}
            {edit ? (
              <Row>
                <Col xs="12" xl="12">
                  <Alert message="Informational Notes" type="info" showIcon />
                </Col>
              </Row>
            ) : null}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Notification;