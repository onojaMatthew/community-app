import React from "react";
import { Col, Row, FormGroup, Button, Spinner } from "reactstrap";


const Reply = ({ closeMessageBox, topic, message, onSendMessage, setMessage }) => {
  return (
    <div>
      <FormGroup>
        <textarea
          rows="4" 
          cols={
            navigator.userAgent.match(/Android/i) ? "33" :
            navigator.userAgent.match(/webOS/i) ? "33" :
            navigator.userAgent.match(/iPhone/i)  ? "33" :
            navigator.userAgent.match(/iPad/i)  ? "33" :
            navigator.userAgent.match(/iPod/i)  ? "33" :
            navigator.userAgent.match(/BlackBerry/i)  ? "33" :
            navigator.userAgent.match(/Windows Phone/i) ? "33" : "65"}
          name="message"
          column="700px"
          onChange={(e) => setMessage(e.target.value)}
          onClick={(e) => e.key === "Enter" ? onSendMessage(e.target.value) : null}
          value={message}
          placeholder="Write your comment here..."
          style={{
            border: "1px solid grey",
            borderRadius: 0
          }}
        ></textarea>
      </FormGroup>
      <Row className="justify-content-center">
        <Col xs="12">
          <Row>
            <Col>
              {topic.loading === true ? (
                <div className="text-center pt-3">
                  <Spinner color="primary" /> <span>Please wait...</span>
                </div>
              ) : (
                <Button onClick={(e) => onSendMessage(e)} color="success">Reply</Button>
              )}
            </Col>
            <Col xs="4" xl="4">
              <Button onClick={() => closeMessageBox()} color="warning">Cancel</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Reply;