import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Spinner, Row, Col, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import SexOptions from "./Options";

class EditProfile extends Component {
  state = {
    phone: "",
    dob: "",
    sex: "",
    city: "",
    state: "",
    street: "",
    nextOfKin: "",
    nextOfKinRel: "",
    nextOfKinAddr: "",
    nextOfKinPhone: "",
    guarantorFName: "",
    guarantorLName: "",
    guarantorAddr: "",
    guarantorOccupation: "",
    guarantorPhone: "",
    updated: false,
    file: "",
    step: 0,
    modal: false,
    errMssg: "",
    errorMsg: "",
  }

  componentDidUpdate(prevProps, nextProps) {
    const { users } = this.props;
    if (this.props.users && this.props.users !== prevProps.users) {
      if (users.error && users.error.length > 0) {
        this.setState({ errMsg: users.error });
      }
      if (users.updateSuccess === true) {
        this.setState({ updated: true });
      }
    }
  }

  handleSubmit = async () => {
    const {
      phone,
      dob,
      sex,
      city,
      state,
      street,
      nextOfKin,
      nextOfKinRel,
      nextOfKinAddr,
      nextOfKinPhone,
      guarantorFName,
      guarantorLName,
      guarantorAddr,
      guarantorOccupation,
      guarantorPhone,
    } = this.state;
    const userId = localStorage.getItem("userId");
    const { profileUpdate } = this.props;
    const data = {
      phone,
      dob,
      sex,
      city,
      state,
      street,
      nextOfKin,
      nextOfKinRel,
      nextOfKinAddr,
      nextOfKinPhone,
      guarantorFName,
      guarantorLName,
      guarantorAddr,
      guarantorOccupation,
      guarantorPhone,
    }

    await profileUpdate(userId, data);
  }

  onChange = (e, name) => {
    this.setState({ 
      errMsg: "",
      errorMsg: ""
    });
    let fields = this.state;
    fields[name] = e.target.value;
    this.setState({ fields });
  }

  onUploadChange = (e) => {
    let fields = this.state;
    fields[e.target.name] = e.target.files[0];
    this.setState({ fields });
  }

  handleUpload = async () => {
    const { uploadPhoto } = this.props;
    const userId = localStorage.getItem("userId");
    let formData = new FormData();
    formData.append("file", this.state.file);
    console.log(this.props, formData, "inside handle upload")
    await uploadPhoto(userId, formData);
  }

  renderView = () => {
    const { users } = this.props;
    const sexOptions = [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' }
    ]
    const { 
      dob,
      sex,
      city,
      state,
      street,
      nextOfKin,
      nextOfKinRel,
      nextOfKinAddr,
      nextOfKinPhone,
      guarantorFName,
      guarantorLName,
      guarantorAddr,
      guarantorOccupation,
      guarantorPhone,
      step,
      modal,
      errMsg,
    } = this.state;
    if (step === 1) {
      return (
        <Modal isOpen={modal} toggle={this.toggleModal}>
          <ModalHeader 
            toggle={this.toggleModal}
            style={{
              background: "linear-gradient(to right, #f0a10f 0%, #f0a10f 100%)",
              color: "#fff"
            }}
          >
            Upload profile photo
            {errMsg.length > 0 ? <p style={{ color: "#ff0000" }}>{errMsg}</p> : null}
          </ModalHeader>
          <ModalBody>
            <div className="custom-file">
              <input 
                type="file"  
                className="custom-file-input"
                name={"file"}
                accept="image/*"
                onChange={(e) => this.onUploadChange(e)}
                id="customFile" />
              <label className="custom-file-label" htmlFor="customFile">Choose file</label>
            </div>
          </ModalBody>
          <ModalFooter>
            {users.uploadLoading === true ? <Spinner color="primary" /> : (
              <Button
                color="primary"
                style={{
                  background: "linear-gradient(to right, #f0a10f 0%, #f0a10f 100%)",
                  color: "#fff"
                }}
                onClick={() => this.handleUpload()}
             >Upload photo</Button>
            )}
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      )
    } else {
      return (
      <div className="container register">
        <div className="row">
          <div className="col-md-3 register-left">
              <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
              <h3>Welcome</h3>
              <p>You are 30 seconds away from completing your information with us</p>
              <Link to="/" className="page-link">Login</Link><br/>
          </div>
            <div className="col-md-9 register-right">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div className="row">
                    {errMsg && errMsg.length ? <span className="error text-center">{errMsg}</span>: null}
                  </div>
                  <h3 className="register-heading">Update your data to continue</h3>
                  <div className="row register-form">
                  
                    <div className="col-md-6">
                      <div className="form-group">
                              <input 
                                type="text" 
                                className="form-control" 
                                placeholder="State *" 
                                value={state}
                                onChange={(e) => this.onChange(e, "state")}
                              />
                          </div>
                          <div className="form-group">
                              <input 
                                type="text" 
                                className="form-control" 
                                placeholder="City *"
                                value={city}
                                onChange={(e) => this.onChange(e, "city")}
                              />
                          </div>
                          <div className="form-group">
                              <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Street *" 
                                value={street}
                                onChange={(e) => this.onChange(e, "street")}
                              />
                          </div>
                          <div className="form-group">
                              <input 
                                type="date" 
                                className="form-control" 
                                placeholder="Date of birth *" 
                                value={dob}
                                onChange={(e) => this.onChange(e, "dob")}
                              />
                          </div>
                          <div className="form-group">
                              <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Next of kin name *" 
                                value={nextOfKin}
                                onChange={(e) => this.onChange(e, "nextOfKin")}
                              />
                          </div>
                          <div className="form-group">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Next of kin relationship *" 
                              value={nextOfKinRel}
                              onChange={(e) => this.onChange(e, "nextOfKinRel")}
                            />
                          </div>
                          <div className="form-group">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Next of kin address *" 
                              value={nextOfKinAddr}
                              onChange={(e) => this.onChange(e, "nextOfKinAddr")}
                            />
                          </div>
                          
                      </div>
                      <div className="col-md-6">
                          <div className="form-group">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Next of kin phone *" 
                              value={nextOfKinPhone}
                              onChange={(e) => this.onChange(e, "nextOfKinPhone")}
                            />
                          </div>
                          <div className="form-group">
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="guarantor First Name *" 
                            value={guarantorFName}
                            onChange={(e) => this.onChange(e, "guarantorFName")} 
                          />
                          </div>
                          <div className="form-group">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Guarantor last name *" 
                              value={guarantorLName}
                              onChange={(e) => this.onChange(e, "guarantorLName")}
                            />
                          </div>
                          <div className="form-group">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Guarantor occupation *" 
                              value={guarantorOccupation}
                              onChange={(e) => this.onChange(e, "guarantorOccupation")}
                            />
                          </div>
                          <div className="form-group">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Guarantor Address *" 
                              value={guarantorAddr}
                              onChange={(e) => this.onChange(e, "guarantorAddr")}
                            />
                          </div>
                          <div className="form-group">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Gurantor Phone *" 
                              value={guarantorPhone}
                              onChange={(e) => this.onChange(e, "guarantorPhone")}
                            />
                          </div>
                          <div className="form-group">
                              <SexOptions options={sexOptions} selected={sex} onChange={this.onChange} />
                          </div>
                          {users.updateLoading === true ? <Spinner color="primary" /> : (
                            <input type="submit" onClick={() => this.handleSubmit()} className="btnRegister"  value="Register Now"/>
                          )}
                      </div>
                  </div>
                  <hr />
                  {this.state.updated === true ? (
                     <Row className="justify-content-center">
                     <Col xs={12} xl="3">
                       <Button onClick={() => this.setState({ step: +1, modal: true })} color="primary">Next</Button>
                     </Col>
                   </Row>
                  ) : null}
                </div>
              </div>
            </div>
        </div>
      </div>
      );
    }
  }

  render() {
    
    const { users } = this.props;
   
    if (users.uploadSuccess === true) {
      return <Redirect to="/" />;
    }
    
    return (
      <div>
        {this.renderView()}
      </div>
    );
  }
}

export default EditProfile;