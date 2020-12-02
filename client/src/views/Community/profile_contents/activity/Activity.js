import React, { useState, useEffect } from "react";
import { Row, Col, Alert } from "reactstrap";

const styles = {
  sidebar: {
    color: "#5e86c9",
    fontSize: "18px",
    marginTop: ""
  }
}
const Activity = () => {
  const [ topics, setTopic ] = useState(false);
  const [ all, setAll ] = useState(true);
  const [ replies, setReplies ] = useState(false);
  const [ drafts, setDrafts ] = useState(false);
  const [ likes, setLikes ] = useState(false);

  const toggleAll = () => {
    setAll(true);
    setDrafts(false);
    setTopic(false);
    setLikes(false);
    setReplies(false)
  }

  const toggleReplies = () => {
    setAll(false);
    setDrafts(false);
    setTopic(false);
    setLikes(false);
    setReplies(true)
  }

  const toggleLikes = () => {
    setAll(false);
    setDrafts(false);
    setTopic(false);
    setLikes(true);
    setReplies(false)
  }

  const toggleTopics = () => {
    setAll(false);
    setDrafts(false);
    setTopic(true);
    setLikes(false);
    setReplies(false)
  }

  const toggleDrafts = () => {
    setAll(false);
    setDrafts(true);
    setTopic(false);
    setLikes(false);
    setReplies(false)
  }

  return (
    <div>
      <Row>
        <Col xs="12" xl="2">
          <p className="mt-3" style={styles.sidebar} onClick={toggleAll}>All</p>
          <p className="mt-3" style={styles.sidebar} onClick={toggleTopics}>Topics</p>
          <p className="mt-3" style={styles.sidebar} onClick={toggleReplies}>Replies</p>
          <p className="mt-3" style={styles.sidebar} onClick={toggleDrafts}>Drafts</p>
          <p className="mt-3" style={styles.sidebar} onClick={toggleLikes}>Likes</p>
        </Col>
        <Col xs="12" xl="10">
          <div>
            {all ? (
              <Row>
                <Col xs="12" xl="12">
                  <Alert style={{ background: "#d1f0ff", width: "100%" }}>You have no activity yet</Alert>
                </Col>
              </Row>
            ) : null}
            {topics ? (
              <Row>
                <Col xs="12" xl="12">
                  <Alert style={{ background: "#d1f0ff", width: "100%" }}>You have no activity yet</Alert>
                </Col>
              </Row>
            ) : null}
            {replies ? (
              <Row>
                <Col xs="12" xl="12">
                  <Alert style={{ background: "#d1f0ff", width: "100%" }}>You have no activity yet</Alert>
                </Col>
              </Row>
            ) : null}
            {drafts ? (
              <Row>
                <Col xs="12" xl="12">
                  <Alert style={{ background: "#d1f0ff", width: "100%" }}>You have no activity yet</Alert>
                </Col>
              </Row>
            ) : null}
            {likes ? (
              <Row>
                <Col xs="12" xl="12">
                  <Alert style={{ background: "#d1f0ff", width: "100%" }}>You have no activity yet</Alert>
                </Col>
              </Row>
            ) : null}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Activity;