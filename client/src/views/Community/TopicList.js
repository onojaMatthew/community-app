import React from "react";
import { Link } from "react-router-dom";
import { Table, Spinner, Row, Col } from "reactstrap";
import { Avatar, Image } from "antd";
// import Avatar from "../../assets/img/user-avatar.png";
// import Image from "react-image-resizer";
const TopicList = ({ topicList }) => {
  return (
    <Table className="table table-strip">
      <thead style={{
        color: "green"
      }}>
        <tr>
          <th colSpan="30">Topic</th>
        </tr>
      </thead>
      <tbody>
        {topicList.length > 0 ? topicList.map(topic => (
          topic.loading === true ? <Spinner color="primary" /> : (
            <tr style={{
              paddingTop: "50px !important"
            }}
            >
              <td colSpan="30">
                <Row>
                  <Col xs="3" xl="2">
                    <Avatar
                      src={topic.createdBy ? `${process.env.REACT_APP_API_URL}/community/photo/${topic.createdBy._id}`: `${Avatar}`}
                      size={50}
                    />
                  </Col>
                  <Col xs="9" xl="10">
                    <p><Link to={`/community/topic/${topic._id}`} style={{ color: "#4E7AC4" }}>{topic.title}</Link></p>
                    <p style={{ display: "flex" }}>
                      <div style={{
                        height: 10,
                        width:10,
                        marginTop: 2,
                        marginRight: 5,
                        background: topic.category && topic.category.name === "Help" ? 
                          "green": topic.category && topic.category.name === "Developers" ?
                          "#ED5656" : topic.category && topic.category.name === "Community and Events" ?
                          "#08c" : topic.category && topic.category.name === "Ideas and Feedback" ? 
                          "#345b9d" : topic.category && topic.category.name === "OjirehPrime Chat" ?
                          "#99BDA9" : topic.category && topic.category.name === "Gererals" ?
                          "#E9D09A" : topic.category && topic.category.name === "Financial Chats" ?
                          "#ff0000" : "#000"
                      }}></div><Link to="/cat/" 
                      style={{ 
                        color: "#345b9d",  
                        fontWeight: "bolder",
                        fontSize: 12 
                      }}>{topic.category && topic.category.name}</Link></p>
                  </Col>
                </Row>
              </td>
            </tr>
          )
        )) : "No records found" }
      </tbody>
    </Table>
  )
}

export default TopicList;