import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getTopic, likeTopic, unlikeTopic } from "../../store/actions/actions_topic";
import { Row, Col, Spinner, Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Image } from "antd";
import { 
  faThumbsUp, 
  faThumbsDown, 
  faCircle,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
// import Avatar from "../../assets/img/user-avatar.png";
import Header from "./Header";
import Reply from "./Reply";
import io from "socket.io-client";
import { localStorageAuth } from "../../helper/authenticate";
import { getChats, likeChat, unlikeChat } from "../../store/actions/actions_chat";
import MessageList from "./MessageList";
import PreviousMsg from "./PreviousMsg";
  
let socket;
const TopicView = (props) => {
  const topic_id = window.location.pathname.slice(17);
  
  const topic = useSelector(state => state);
  const dispatch = useDispatch();
  const username = localStorageAuth() && localStorageAuth().user && localStorageAuth().user.fullname;
  const userId = localStorageAuth() && localStorageAuth().user && localStorageAuth().user._id;
  
  
  const [ topicId, setTopicId ] = useState(topic_id);
  const [ isOpen, setIsOpen ] = useState(false);
  const url = process.env.REACT_APP_API // "https://ojirehprime-community-api.herokuapp.com";
  const [ message, setMessage ] = useState("");
  const [ messages, setMessages ] = useState([]);
  const msg = useSelector(state => state.chat);
  
  useEffect(() => {
    setTopicId(topic_id)
  }, [ topic_id ]);

  useEffect(() => {
    dispatch(getTopic(topicId));
  }, [ topicId, dispatch ])

  useEffect(() => {
    socket = io(url);
    const data = { username, topicId, userId }
    socket.emit("join", data, () => {})

    return () => {
      socket.emit("disconnect", data);
      socket.off();
    }
  }, [username, topicId, userId]);

  useEffect(() => {
    dispatch(getChats(topicId));
  }, [ topicId, dispatch]);

  const onSendMessage = (e) => {
    e.preventDefault();
    const data = { userId, topicId, message };
    if (message) {
      socket.emit("sendMessage", data, () => setMessage(""));
    }
  }

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    })
  }, [ messages ]);

  const toggleOpen = () => {
    setIsOpen(true);
  }

  const closeMessageBox = () => {
    if (!userId) {
      return window.location.href = "/community_login";
    }
    setIsOpen(false);
  }

  const onLikeChat = (chatId, topicId) => {
    if (!userId) {
      return window.location.href = "/community_login";
    }
    dispatch(likeChat(chatId,userId, topicId));
  }

  const onUnlikeChat = (chatId, topicId) => {
    if (!userId) {
      return window.location.href = "/community_login";
    }

    dispatch(unlikeChat(chatId, userId, topicId));
  }

  const onLikeTopic = (topicId) => {
    if (!userId) {
      return window.location.href = "/community_login";
    }

    dispatch(likeTopic(topicId, userId));
  }

  const onUnlikeTopic = (topicId) => {
    if (!userId) {
      return window.location.href = "/community_login";
    }
    dispatch(unlikeTopic(topicId, userId));
  }

  const topicState = topic.topic && topic.topic;
  const currentTopic = topic.topic && topic.topic && topic.topic.topic;
  const chats = msg.chats;

  return (
    <div>
      <Header />
      <Container>
        <FontAwesomeIcon onClick={() => props.history.goBack()} icon={faArrowLeft} size="1x" style={{ marginTop: 3, cursor: "pointer" }} />
        { topicState.loading === true ? (
          <div className="text-center pt-3">
          <Spinner color="primary" /> <span>Please wait...</span>
        </div>
        ) : (
          <Row>
            <Col xs="12" xl="9">
              <h1
                style={{
                  color: "#14233C",
                  fontSize: "1.7511em",
                  fontFamily: "Helvetica,Arial,sans-serif",
                  marginTop: "30px"
                }}
              >
                {currentTopic && currentTopic.title}
              </h1>
              <Row>
                <Col>
                  <p style={{ display: "flex" }}>
                    <div style={{
                      height: 10,
                      width:10,
                      marginTop: 2,
                      marginRight: 5,
                      background: currentTopic.category && currentTopic.category.name === "Help" ? 
                        "green": currentTopic.category && currentTopic.category.name === "Our Mobile App" ?
                        "#ED5656" : currentTopic.category && currentTopic.category.name === "News and Updates" ?
                        "#08c" : currentTopic.category && currentTopic.category.name === "Feedback and Ideas" ?
                        "#345b9d" : currentTopic.category && currentTopic.category.name === "What are we working On?" ?
                        "#99BDA9" : currentTopic.category && currentTopic.category.name === "Gereral Views" ?
                        "#E9D09A" : currentTopic.category && currentTopic.category.name === "Financial Chats" ?
                        "#ff0000" : "violet"
                    }}></div>
                    <Link to="/cat/"
                    style={{ 
                      color: "#345b9d",  
                      fontWeight: "bolder",
                      fontSize: 12 
                    }}>{currentTopic && currentTopic.category && currentTopic.category.name}</Link>
                  </p>
                </Col>
              </Row>
              <hr/>
              
              <Row key={message._id}>
                <Col xs="3" xl="2">
                  <div style={{
                    display: "flex"
                  }}>
                    <Avatar 
                      src={`${process.env.REACT_APP_API_URL}/community/photo/${message.senderId}`}
                      size={50}
                    />
                  </div>
                </Col>
                <Col xs="9" xl="11" style={{
                  padding: 0
                }}>
                  <p style={{ color: "#345b9d" }}>{currentTopic.username}</p>
                  <p style={{ paddingRight: 10 }}>{currentTopic.text}</p>
                </Col>
              </Row>
              <Row>
                <Col xs="9" xl="9"></Col>
                <Col xs="3" xl="3">
                  <div style={{ display: "flex"}}>
                  <span className="fa-layers fa-1x">
                    <FontAwesomeIcon icon={faCircle} />
                    <span className="fa-layers-text" style={{ 
                      fontFamily: "Joystick", 
                      fontSize: "12px", 
                      color: "white", 
                      padding: "2px"
                    }}>{currentTopic.like && currentTopic.like.length > 0 ? currentTopic.like.length : 0}</span>
                  </span> 
                  {currentTopic.liked === true ? <FontAwesomeIcon onClick={() => onUnlikeTopic(currentTopic._id,  userId)} style={{ marginLeft: 5}} color="#ff0000" icon={faThumbsDown} size="1x" /> : <FontAwesomeIcon onClick={() => onLikeTopic(currentTopic._id, userId)} style={{ marginLeft: 5}} color="blue" icon={faThumbsUp} size="1x" />}
                  </div>
                </Col>
              </Row>
              <PreviousMsg 
                onLikeChat={onLikeChat}
                onUnlikeChat={onUnlikeChat}
                onUnlikeTopic={onUnlikeTopic}  
                onLikeTopic={onLikeTopic}
                messages={chats}
              />
              <MessageList 
                onLikeChat={onLikeChat} 
                onUnlikeChat={onUnlikeChat} 
                onUnlikeTopic={onUnlikeTopic}
                onLikeTopic={onLikeTopic}
                messages={messages}
                chats={chats}
              />
              <hr/>
              <Row className="mt-5 mb-3">
                <Col xs="8" xl="8">
                  
                </Col>
                <Col xs="4" xl="4">
                  <Row>
                    <Col xs="4" xl="4">
                      
                    </Col>
                    <Col xs="5" xl="6">
                      {isOpen === true ? (
                        <span 
                        onClick={() => closeMessageBox()}
                        style={{
                          cursor: "pointer"
                        }}
                        className="btn btn-danger"
                      >
                        Close
                      </span>
                      ) : (<span 
                        onClick={() => localStorageAuth().token ? toggleOpen() : window.location.href='/community_login'}
                        style={{
                          cursor: "pointer"
                        }}
                        className="btn btn-primary"
                      >
                        Reply
                      </span>)}
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="justify-content-center mb-3">
                <Col xs="11">
                  {isOpen === true ?
                   <Reply
                    closeMessageBox={closeMessageBox}
                    onSendMessage={onSendMessage}
                    setMessage={setMessage}
                    topic={topicState}
                    message={message}
                  /> : null}
                </Col>
              </Row>
            </Col>
            <Col xl="3">
              
            </Col>
            
          </Row>
        )} 
      </Container>
    </div>
  );
}
export default TopicView;