import React, { useState, useEffect } from "react";
import { localStorageAuth } from "../../../../helper/authenticate";
import { Avatar, Input, Button } from "antd";
import { Row, Col } from "reactstrap";
import { EditOutlined, MailFilled, MailOutlined, PlusOutlined, SettingFilled } from "@ant-design/icons";

const styles = {
  usernameLabel: {
    fontWeight: "bold",
    fontSize: "1.3195em",
    marginTop: "20px",
    color: "#000"
  },
  icon: {
    cursor: "pointer",
    color: "rgb(94, 134, 201)",
    fontSize: "18px"
  },
  usernameBtn: {
    borderColor: "#40a9ff",
    marginTop: "20px"
  },
  h5: {
    fontWeight: "bold",
    marginTop: "25px",
    color: "#000",
    fontSize: "15px",
    marginBottom: "15px"
  },

  plusIcon: {
    cursor: "pointer"
  }
  
}

const BASE_URL = process.env.REACT_APP_API_URL;

const Account = () => {
  const [ isClicked, setIsClicked ] = useState(false);
  const [ isEmailClicked, setIsEmailClicked ] = useState(false);
  const [ isAlternative, setIsAlternative ] = useState(false);

  const user =  localStorageAuth().user && localStorageAuth().user;
  const username = user && user.fullName,
  userId = user && user._id;
  return (
    <div>
      <Row>
        <Col xs="12" xl="12">
          {isClicked ? (
            <div>
              <h5 style={styles.h5}>Change username</h5>
              <Input placeholder="Basic usage" />
              <Button onClick={() => setIsClicked(false)} style={styles.usernameBtn}>Change</Button>
            </div>
          ) : (
            <>
              <p style={styles.usernameLabel}>Username</p>
              <p>Onoja <EditOutlined onClick={() => setIsClicked(true)} style={styles.icon} /></p>
            </>
          )}
          <div>
          <h5 style={styles.usernameLabel}>Profile picture</h5>
            <Avatar 
              style={{ background: "#52AF77", fontSize: "50px" }}
              size={100}
              src={`${BASE_URL}/community/photo/${userId}?${new Date().getTime()}`}
            >
              {username && username.charAt(0).toUpperCase()}
            </Avatar>
          </div>
          {/*  */}
          <div>
            <h5 style={styles.h5}>Name</h5>
            <label>
            <Input value={user && user.email} placeholder="Basic usage" />
            <span style={{color: "#40a9ff"}}>Your fullname (Optional)</span>
            </label>
          </div>

          <div>
            {isEmailClicked ? (
            <div>
              <h5 style={styles.h5}>Change email</h5>
              <Input value="onojamatthew59@gmail.com" placeholder="Basic usage" />
              <Button onClick={() => setIsClicked(false)} style={styles.usernameBtn}>Change</Button>
            </div>
          ) : (
            <>
              <h5 style={styles.h5}>Email</h5>
              <Row>
                <Col xs="12" xl="6">
                  {user && user.email} <br />
                  <span style={{ color: "#52AF77"}}>Primary</span>
                </Col>
                <Col xs="12" xl="6">
                  <SettingFilled onClick={() => setIsEmailClicked(true)} style={{
                    cursor: "pointer",
                    color: "#40a9ff"
                  }} />
                </Col>
              </Row>
            </>
          )}

            <Row className="mt-2 mb-5">
              <Col xs="12" xl="6">
                <span style={{ color: "#40a9ff" }}>Never shown to the public</span>
              </Col>
              {isAlternative ? (
                <Col xs="">
                  <Row>
                    <Col xs="6" xl="6">
                      <Input value="" placeholder="Basic usage" />
                    </Col>
                    <Col xs="6" xl="6">
                      <Button onClick={() => setIsAlternative(false)} style={styles.usernameBtn}>Change</Button>
                    </Col>
                  </Row>
                </Col>
              ) : (
                <Col xs="12" xl="6" style={styles.alternative} onClick={() => setIsAlternative(true)}>
                  <PlusOutlined className="plusIcon" /> <span style={{ color: "#40a9ff" }}>Add Alternative Email</span>
                </Col>
              )}
            </Row>

            {/* Password reset section */}
            <h5 style={styles.h5}>Password</h5>
            <Row className="mt-2 mb-5">
              <Col xs="12" xl="6">
                <div style={styles.passwordReset} className="passwordReset">
                  <span>
                    <MailFilled className="mailIcon" style={styles.mailIcon} /> Send password reset email
                  </span>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Account;