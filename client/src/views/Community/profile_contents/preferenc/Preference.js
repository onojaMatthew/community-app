import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import Account from "./Account";
import Profile from "./Profile";

const styles = {
  sidebar: {
    fontSize: "18px",
    marginTop: ""
  }
}
const Preference = () => {
  const [ account, setAccount ] = useState(true);
  const [ profile, setProfile ] = useState(false);

  const toggleAccount = () => {
    setAccount(true);
    setProfile(false);
  }

  const toggleProfile = () => {
    setAccount(false);
    setProfile(true);
  }

  return (
    <div>
      <Row>
        <Col xs="12" xl="2">
          <p className="mt-3" style={{ color: account === true ? "#000" : "#5e86c9", ...styles.sidebar}} onClick={toggleAccount}>Account</p>
          <p className="mt-3" style={{ color: profile === true ? "#000" : "#5e86c9", ...styles.sidebar}} onClick={toggleProfile}>Profile</p>
        </Col>
        <Col xs="12" xl="10">
          <div>
            {account ? (
              <Account />
            ) : null}
            {profile ? (
              <Profile />
            ) : null}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Preference;