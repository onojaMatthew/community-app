import React from "react";
import { Card } from "antd";
import { Row, Col } from "reactstrap";
import { CheckCircleFilled, EyeFilled, UserOutlined } from "@ant-design/icons";

const Badge = () => {
  return (
    <Row className="p-1">
      <Col xs="12" xl="4" className="">
        <Card className="card">
          <Row>
            <Col xs="4" xl="4">
              <UserOutlined style={{ fontSize: "80px", color: "#cd7f32"}} />
            </Col>
            <Col xs="4" xl="8">
              <p style={{ fontSize: "20px"}}><strong>Basic</strong></p>
              <p style={{ fontSize: "16px"}}>Granted all essential</p>
              <p style={{ fontSize: "16px"}}>community functions</p>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs="12" xl="4" className="">
        <Card className="card">
          <Row>
            <Col xs="4" xl="4">
              <EyeFilled style={{ fontSize: "80px", color: "#cd7f32"}} />
            </Col>
            <Col xs="4" xl="8">
              <p style={{ fontSize: "20px"}}><strong>Enthusiast</strong></p>
              <p style={{ fontSize: "16px"}}>Visited 10 consecutive days</p>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs="12" xl="4" className="">
        <Card className="card">
          <Row>
            <Col xs="4" xl="4">
              <CheckCircleFilled style={{ fontSize: "80px", color: "#cd7f32"}} />
            </Col>
            <Col xs="4" xl="8">
              <p style={{ fontSize: "20px"}}><strong>First like</strong></p>
              <p style={{ fontSize: "16px"}}>Liked a post</p>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default Badge;