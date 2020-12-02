import React from "react";
import { Input, FormGroup, Button, Col, Row } from "reactstrap";

const MessageBox = ({ setMessage, sendMessage, message }) => (
  <div>
    <Row>
      <Col xs="11" xl={11}>
        <FormGroup className="mr-sm-2">
          <Input
            style={{ marginLeft: "10px" }}
            type="text"
            placeholder="Type a message..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyPress={(e) => e.key === "Enter" ? sendMessage(e) : null}
          />
        </FormGroup>
      </Col>
      <Col xs="1" xl="1">
        <Button onClick={(e) => sendMessage(e)} color="primary">Send</Button>
      </Col>
    </Row>
  </div>
)

export default MessageBox;