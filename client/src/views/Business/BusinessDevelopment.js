import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Row
} from "reactstrap";

export default class BusinessDevelopment extends Component{
  state = {
    card2: false
  }
  render() {
    return (
      <Card>
        <CardBody>
          <Row className="justify-content-center">
            <Col xs="12" sm="6" lg="3">
              <Card className="text-white bg-success text-center">
                <CardBody className="p-0">
                  <div className="text-value">Send a Mail <i className="icon-envelope"></i></div>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" sm="6" lg="3">
              <Card className="text-white bg-success text-center">
                <CardBody className="p-0">
                  <Link 
                    to="/dashboard/chat"
                    style={{ 
                      textDecoration: "none",
                      color: "#fff"
                    }}
                  >
                    <div className="text-value">
                      chat
                    </div>
                  </Link>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" sm="6" lg="3">
              <Card className="text-white bg-success text-center">
                <CardBody className="p-0">
                  <div className="text-value">Make a Call <i className="icon-phone"></i></div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="6" lg="4">
              <Card className="text-white bg-success">
                <CardBody className="pb-4">
                  <ButtonGroup className="float-right">
                    <i className="icon-location-pin"></i>
                  </ButtonGroup>
                  <div className="text-value">100,000</div>
                  <div>Total Cards in Circulation</div>
                </CardBody>
              
              </Card>
            </Col>
            <Col xs="12" sm="6" lg="4">
              <Card className="text-white bg-info">
                <CardBody className="pb-4">
                  <ButtonGroup className="float-right">
                    <i className="icon-location-pin"></i>
                  </ButtonGroup>
                  <div className="text-value">100,000</div>
                  <div>Affiliate Marketing</div>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" sm="6" lg="4">
              <Card className="text-white bg-primary">
                <CardBody className="pb-4">
                  <ButtonGroup className="float-right">
                    <i className="icon-location-pin"></i>
                  </ButtonGroup>
                  <div className="text-value">500,000</div>
                  <div>Direct Marketing</div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="6" lg="4">
              <Card className="text-white bg-danger">
                <CardBody className="pb-4">
                  <ButtonGroup className="float-right">
                    <i className="icon-location-pin"></i>
                  </ButtonGroup>
                  <div className="text-value">10,000</div>
                  <div>Total Agent</div>
                </CardBody>
              
              </Card>
            </Col>
            <Col xs="12" sm="6" lg="4">
              <Card className="text-white bg-primary">
                <CardBody className="pb-4">
                  <ButtonGroup className="float-right">
                    <i className="icon-location-pin"></i>
                  </ButtonGroup>
                  <div className="text-value">1,000</div>
                  <div>Total Salary Account</div>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" sm="6" lg="4">
              <Card className="text-white bg-warning">
                <CardBody className="pb-4">
                  <ButtonGroup className="float-right">
                  <i className="icon-location-pin"></i>
                  </ButtonGroup>
                  <div className="text-value">98</div>
                  <div>Strategic Partnership</div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}