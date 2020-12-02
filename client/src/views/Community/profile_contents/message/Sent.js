import React from "react";
import { Alert } from "antd";
import { Row, Col } from "reactstrap";

const SentMessages = () => {
  return (
    <div className="mt-4">
      <Row>
        <Col xs="12" xl="12">
          <Alert style={{ background: "#d1f0ff", width: "100%" }}>You have no activity yet</Alert>
        </Col>
      </Row>
    </div>
  );
}

export default SentMessages;