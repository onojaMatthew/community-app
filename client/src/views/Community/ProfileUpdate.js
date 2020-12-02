import React from "react";
import { FormGroup, Input, Button, Row, Col, Spinner } from "reactstrap";

const ProfileUpdate = ({
  setAddress,
  setPhone,
  community,
  setPhoto,
  photo,
  phone,
  address,
  updateData,
  uploadPhoto,
  setModal,
}) => {
  return (
    <div>
      {community.uploadLoading === true ? 
        (
          <div className="text-center">
            <Spinner color="primary" />
          </div>
        ) : (
        <>
          <div className="custom-file mb-3">
            <input 
              type="file"  
              className="custom-file-input"
              name={"file"}
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              id="customFile" />
            <label className="custom-file-label" htmlFor="customFile">Choose photo</label>
          </div>
          <span>{photo && photo.name ? photo.name : null}</span> <br/>
          {photo ? <Button onClick={(e) => uploadPhoto(e)} className="mb-3" color="primary">Upload</Button> : null}
        </>
      )}
      <FormGroup>
        <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Your Address" />
      </FormGroup>
      <FormGroup>
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your Phone" />
      </FormGroup>
      <Row>
        <Col xs="6" xl="2">
          {community.loading === true ? (
            <div className="text-center pt-3">
              <Spinner color="primary" /> <span>Please wait...</span>
            </div>
          ) : (
            <Button color="success" onClick={(e) => updateData(e)}>Send</Button>
          )}
        </Col>
        <Col xs="6" xl="2">
          <Button onClick={() => setModal(false)} color="warning">Cancil</Button>
        </Col>
      </Row>
    </div>
  );
}

export default ProfileUpdate;