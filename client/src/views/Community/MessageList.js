import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faThumbsUp, 
  faThumbsDown, 
  faCircle,
} from '@fortawesome/free-solid-svg-icons'
import Avatar from "../../assets/img/user-avatar.png";
import { Row, Col } from "reactstrap";
import { localStorageAuth } from "../../helper/authenticate";

const MessageList = ({ 
  messages,
  onLikeChat,
  onUnlikeChat,
  chats
 }) => {
  // console.log(messages, chats)
  const userId = localStorageAuth().user && localStorageAuth().user._id;
  return (
    <div className="p-3">
      {messages.map(message => (
        <>
          <hr/>
          <Row key={message._id}>
            <Col xs="3" xl="2">
              <div style={{
                display: "flex"
              }}>
                <img 
                  height="50"
                  width="50"
                  style={{
                   borderRadius: "50%" }} 
                  src={`${process.env.REACT_APP_API_URL}/community/photo/${message.senderId}?${new Date().getTime()}`}
                  onError={(i) => i.target.src=`${Avatar}`}
                  alt=""
                />
              </div>
            </Col>
            <Col xs="9" xl="10" style={{
              padding: 0
            }}>
              <p style={{ color: "#345b9d" }}>{message.username}</p>
              <p>{message.text}</p>
            </Col>
          </Row>
          <Row>
            <Col xs="9" xl="9"></Col>
            <Col xs="3" xl="3">
              <div style={{ display: "flex"}}>
                {message.like.includes(userId) ? <FontAwesomeIcon onClick={() => onUnlikeChat(message.chatId, message.topicId)} style={{ marginLeft: 5 }} color="#ff0000" icon={faThumbsDown} size="1x" /> : <FontAwesomeIcon onClick={() => onLikeChat(message.chatId, message.topicId)} style={{ marginLeft: 5}} color="blue" icon={faThumbsUp} size="1x" />}
                <span className="fa-layers fa-1x">
                  <FontAwesomeIcon icon={faCircle} />
                  <span className="fa-layers-text" style={{ 
                    fontFamily: "Joystick",
                    fontSize: "12px",
                    color: "white",
                    padding: "2px"
                  }}>{message.like && message.like.length > 0 ? message.like.length : 0}</span>
                </span>
              </div>
            </Col>
          </Row>
        </>
      ))}
    </div>
  );
}

export default MessageList;
