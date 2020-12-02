import React, { useState, useEffect } from "react";
import { Input, Select } from "antd";
import { Row, Col } from "reactstrap";
import { 
  AlignCenterOutlined,
  AlignLeftOutlined, 
  AlignRightOutlined, 
  BoldOutlined, 
  ItalicOutlined, 
  LinkOutlined, 
} from "@ant-design/icons";
import { getAllCountries, getAllTimezones } from "countries-and-timezones";

const { Option } = Select;
const styles = {
  formatIcon: {
    color: "#5e86c9",
    marginRight: "15px",
    fontWeight: "bold !important",
    fontSize: "20px",
  },
  input: {
    width: "100%",
    height: "10vh",
    border: "none"
  },
  content: {
    background: "#dfe7f4",
    padding: "10px",
    borderRadius: "2px",
    
  },
  h5: {
    fontWeight: "bold",
    marginTop: "25px",
    color: "#000",
    fontSize: "25px",
    // marginBottom: "15px"
  },
  select: {
    width: "100%"
  }
}

const Profile = () => {
  const [ aboutMe, setAboutMe ] = useState("");
  const [ link, setLink ] = useState("");
  const [ isBold, setIsbold ] = useState(false);
  const [ isItalic, setIsItalic ] = useState(false);
  const [ isCenter, setIsCenter ] = useState(false);
  const [ isLeft, setIsLeft ] = useState(false);
  const [ isRight, setIsRight ] = useState(false);
  const [ isLinked, setIsLinked ] = useState(false);
  const [ timezone, setTimezone ] = useState([]);

  let text = "";

  if (isBold) {
    text = <strong>{aboutMe}</strong>
  } else if (isItalic) {
    text = <i>{aboutMe}</i>
  } else if (isCenter) {
    text = <p style={{ textAlign: "center"}}>{aboutMe}</p>
  } else if (isLeft) {
    text = <p style={{ textAlign: "left"}}>{aboutMe}</p>
  } else if (isRight) {
    text = <p style={{ textAlign: "right"}}>{aboutMe}</p>
  } else if (isLinked) {
    text = <a href={link}>{aboutMe}</a>
  }

  const onCenter = () => {
    setIsCenter(!isCenter);
    setIsLeft(false);
    setIsRight(false);
    setIsbold(false);
    setIsLinked(false);
    setIsItalic(false);
  }

  const onLeft = () => {
    setIsCenter(false);
    setIsLeft(!isLeft);
    setIsRight(false);
    setIsbold(false);
    setIsLinked(false);
    setIsItalic(false);
  }

  const onRight = () => {
    setIsCenter(false);
    setIsLeft(false);
    setIsRight(!isRight);
    setIsbold(false);
    setIsLinked(false);
    setIsItalic(false);
  }

  const onLink = () => {
    setIsCenter(false);
    setIsLeft(false);
    setIsRight(false);
    setIsbold(false);
    setIsLinked(!isLinked);
    setIsItalic(false);
  }

  const onBold = () => {
    setIsCenter(false);
    setIsLeft(false);
    setIsRight(false);
    setIsbold(!isBold);
    setIsLinked(false);
    setIsItalic(false);
  }

  const onItalic = () => {
    setIsCenter(false);
    setIsLeft(false);
    setIsRight(false);
    setIsbold(false);
    setIsLinked(false);
    setIsItalic(!isItalic);
  }

  const timezones = getAllTimezones();
  const timezoneResult = Object.keys(timezones);
  return (
    <div>
      <Row>
        <Col xs="12" xl="7">
          <div className="parent-container">
            <div className="child-container">
              <BoldOutlined style={{ 
                background: isBold ? "#9eb6df": null,
                padding: "5px",
                borderRadius: "3px",
                ...styles.formatIcon 
              }} className="formatIcon" onClick={onBold} />
              <ItalicOutlined style={{
                  background: isItalic ? "#9eb6df": null,
                  padding: "5px",
                  borderRadius: "3px",
                  ...styles.formatIcon 
                }} className="formatIcon" onClick={onItalic} />
              <LinkOutlined style={{ 
                  background: isLinked ? "#9eb6df": null,
                  padding: "5px",
                  borderRadius: "3px",
                  ...styles.formatIcon 
                }} className="formatIcon" onClick={onLink} />
              <AlignLeftOutlined style={{
                  background: isLeft ? "#9eb6df": null,
                  padding: "5px",
                  borderRadius: "3px", 
                  ...styles.formatIcon 
                }} className="formatIcon" onClick={onLeft} />

              <AlignCenterOutlined style={{ 
                  background: isCenter ? "#9eb6df": null,
                  padding: "5px",
                  borderRadius: "3px",
                  ...styles.formatIcon 
                }} className="formatIcon" onClick={onCenter} />

              <AlignRightOutlined style={{ 
                  background: isRight ? "#9eb6df": null,
                  padding: "5px",
                  borderRadius: "3px",
                  ...styles.formatIcon 
                }} className="formatIcon" onClick={onRight} />
              <hr />
              
              {/* Input field of type textarea goes here */}
              <input 
                onChange={(e) => setAboutMe(e.target.value)} 
                className="prof-input" 
                type="textarea" 
                style={styles.input}
                value={aboutMe}
              />
            </div>
          </div>
          {aboutMe.length ? (
            <div className="mt-5" style={styles.content}>{text}</div>
          ) : null}
        </Col>
      </Row>

      <Row>
        <Col xs="12" xl="7">
          <div>
            <h5 style={styles.h5}>Timezone</h5>
            <Input.Group compact>
              <Select style={styles.select} defaultValue="Select your timezone">
                {timezoneResult && timezoneResult.map((zone, i) => (
                  <Option value={zone}>{zone}</Option>
                ))}
              </Select>
            </Input.Group>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs="12" xl="7">
          <h5 style={styles.h5}>Location</h5>
          <Input compact />
        </Col>
      </Row>

      <Row className="mb-5">
        <Col xs="12" xl="7">
          <h5 style={styles.h5}>Website</h5>
          <Input compact style={{ width: "100%"}} />
        </Col>
      </Row>
    </div>
  )
}

export default Profile;