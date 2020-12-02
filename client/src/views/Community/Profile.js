import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { Tabs } from "antd";
import { MessageOutlined, BellOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button,Container, Row, Col, Modal, ModalBody, ModalHeader } from "reactstrap";
import ConfirmMessage from "./ConfirmMessage";
import ProfileUpdate from "./ProfileUpdate";
import { 
  faArrowLeft, 
} from '@fortawesome/free-solid-svg-icons';
import ProfileDetail from "./ProfileDetail";
import { localStorageAuth } from "../../helper/authenticate";
import { Avatar } from "antd";
import { getCommunity, deleteCommunity, updateInfo, upload } from "../../store/actions/actions_community";
import Summary from "./profile_contents/summary/Summary";
import Activity from "./profile_contents/activity/Activity";
import Messages from "./profile_contents/message/Messages";
import Notification from "./profile_contents/notification/Notification";
import Preference from "./profile_contents/preferenc/Preference";
import Badge from "./profile_contents/badge/Badge";
const BASE_URL = process.env.REACT_APP_API_URL;

const { TabPane } = Tabs;

const Profile = ({ history }) => {
  const community = useSelector(state => state.community);
  const userId = localStorageAuth().user && localStorageAuth().user._id;
  const [ modal, setModal ] = useState(false);
  const [ photo, setPhoto ] = useState("");
  const [ isUpdate, setIsUpdate ] = useState(false);
  const [ detail, setDetail ] = useState(true);
  const [ phone, setPhone ] = useState("");
  const [ address, setAddress ] = useState("");
  const dispatch = useDispatch();
  const toggle = () => {
    setModal(false);
  }

  const onDelete = () => {
    dispatch(deleteCommunity(userId));
  }

  const displayDetail = (r) => {
    setIsUpdate(false);
    setDetail(r);
  }

  const uploadPhoto = (props) =>{
    let formData = new FormData();
    formData.append("file", photo);
    dispatch(upload(formData, userId));
    setPhoto();
  }

  useEffect(() => {
    if (community.deleteSuccess === true) {
      history.push("/");
    }
  }, [ community, history ]);

  useEffect(() => {
    dispatch(getCommunity(userId));
  }, [ dispatch, userId ]);

  const updateData = (e) => {
    e.preventDefault();
    const data = { address, phone };
    dispatch(updateInfo(data))
  }

  const message = "Are you sure you want to delete your account? Click yes to continue."
  const communityDetail = community.community && community.community;
  console.log(communityDetail, "the detail")
  const callback = (key) => {
    // console.log(key)
  }

  return (
    <div className="profile-page">
      <Header />
      <Container className="mt-5">
        <Row>
          <Col xs="12" xl="6">
            <Row>
              <Col xs="4" xl="1">
                <Avatar 
                  src={`${BASE_URL}/community/photo/${userId}?${new Date().getTime()}`}
                  size={50}      
                  style={{ backgroundColor: "#4dbd74" }}                
                />
              </Col>
              <Col xs="6" xl="6" className="pt-4 ml-1">
                <p>{communityDetail && communityDetail.fullname}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <Row className="mt-2">
          <Col xs="12" xl="12">
            <Tabs onChange={callback}>
              <TabPane tab="Summary" key="1">
                <Summary />
              </TabPane>
              <TabPane tab="Activity" key="2">
                <Activity />
              </TabPane>
              <TabPane tab="Notifications" key="3">
                <Notification />
              </TabPane>
              <TabPane tab={"Messages"} key="4">
                <Messages />
              </TabPane>
              <TabPane tab="Badges" key="5">
                <Badge />
              </TabPane>
              <TabPane tab="Preferences" key="6">
                <Preference />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Container>
      {/* <div className="page-header header-filter"></div> */}
      {/* <div className="main main-raised">
        <div className="profile-content">
          <div className="container">
          <FontAwesomeIcon icon={faArrowLeft} size="1x" style={{ 
              marginTop: 3,
              cursor: "pointer",
              float: "left"
            }}
            onClick={() => window.location.href = "/"}
          />
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="profile">
                  <div>
                    <Avatar 
                      src={`${BASE_URL}/community/photo/${userId}?${new Date().getTime()}`}
                      size={200}                      
                    />
                  </div>
                  <div className="name pt-1">
                    <h3 className="title">{communityDetail && communityDetail.fullname}</h3>
                  </div>
                </div>
              </div>
            </div>
           
            <ConfirmMessage community={community} onDelete={onDelete} message={message} setModal={toggle} modal={modal} />
            <div className="row justify-content-center">
              <div className="col-xs-12 col-md-7">
                <Row className="mb-3">
                  <Col xs="6" xl="6">
                    {detail === true ? (
                      <Button onClick={() => displayDetail(false)} color="warning">Hide Details</Button>
                    ) : (<Button onClick={() => displayDetail(true)} color="success">View Details</Button>)} 
                  </Col>
                  <Col xs="6" xl="6">
                  {isUpdate === false ?<Button color="primary" onClick={() => setModal(true)}>Update Profile</Button> : (
                    <Button color="primary" onClick={() => setIsUpdate(false)}>Hide</Button>
                  )}
                  </Col>
                </Row>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-xs-12 col-md-7">
                <Modal isOpen={modal} toggle={setModal}>
                  <ModalHeader
                    toggle={() => setModal(false)}
                    style={{
                      background: "linear-gradient(to right, #4dbd74 0%, #4dbd74 100%)",
                      color: "#fff"
                    }}
                  >
                    Update your profile
                  </ModalHeader>
                  <ModalBody>
                    <ProfileUpdate 
                      address={address}
                      phone={phone}
                      photo={photo}
                      setModal={setModal}
                      setPhoto={setPhoto}
                      uploadPhoto={uploadPhoto}
                      updateData={updateData}
                      community={community}
                      setAddress={setAddress}
                      setPhone={setPhone}
                    />
                  </ModalBody>
                </Modal>
                {detail === true ? 
                  <ProfileDetail 
                    communityDetail={communityDetail}
                  /> : null}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Profile;