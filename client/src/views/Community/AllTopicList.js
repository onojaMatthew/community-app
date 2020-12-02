import React from "react";
import { Link } from "react-router-dom";
import { Table, Spinner, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const AllTopicList = ({ topicList }) => {
  console.log(topicList, "the topic list")
  return (
    <Table className="table table-strip">
      <thead style={{
        color: "green"
      }}>
        <tr>
          <th colSpan="30">Topic</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>Replies</th>
          <th>Likes</th>
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
                      }}></div><Link to="/cat" 
                      style={{ 
                        color: "#345b9d",  
                        fontWeight: "bolder",
                        fontSize: 12 
                      }}>{topic.category && topic.category.name}</Link></p>
                  </Col>
                </Row>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <span className="fa-layers fa-1x">
                  <FontAwesomeIcon icon={faCircle} />
                  <span className="fa-layers-text" style={{ 
                    fontFamily: "Joystick",
                    fontSize: "12px",
                    color: "white",
                    padding: "2px"
                  }}>{topic.like && topic.like.length}</span>
                </span>
              </td>
              <td>
                <span className="fa-layers fa-1x">
                  <FontAwesomeIcon icon={faCircle} />
                  <span className="fa-layers-text" style={{ 
                    fontFamily: "Joystick",
                    fontSize: "12px",
                    color: "white",
                    padding: "2px"
                  }}>{topic.like && topic.like.length}</span>
                </span>
              </td>
            </tr>
          )
        )) : "No records found" }
      </tbody>
    </Table>
  );
}

export default AllTopicList;