import React from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import moment from "moment";

function onChange() {}

const ProfileForm = ({ user, users }) => {
  return (
    <Form>
      <p className="text-center section-identity">Staff information</p>
      <hr />
      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleEmail">First Name</Label>
            <Input type="text" onChange={() => onChange()} value={ user && user.firstName} name="email" id="exampleEmail" placeholder="First Name" />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="examplePassword">Last Name</Label>
            <Input type="text" value={user && user.lastName} name="password" id="examplePassword" placeholder="Last name" />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="examplePassword">Last Name</Label>
            <Input type="text" value={user && user.email} name="password" id="examplePassword" placeholder="Last name" />
          </FormGroup>
        </Col>
      </Row>
      
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleCity">Street</Label>
            <Input type="text" value={user && user.address && user.address.street} name="city" id="exampleCity"/>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleState">City</Label>
            <Input type="text" value={user && user.address && user.address.city} name="state" id="exampleState"/>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="exampleZip">State</Label>
            <Input type="text" value={user && user.address && user.address.state} name="zip" id="exampleZip"/>
          </FormGroup>  
        </Col>
      </Row>
      
      <Row form>
        <Col md={3}>
          <FormGroup>
            <Label for="exampleCity">Phone Number</Label>
            <Input type="text" value={user && user.phone} name="city" id="exampleCity"/>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="exampleState">Date of Birth</Label>
            <Input type="text" value={`${user && user.dob && moment(user.dob).format("DD/MM/YYYY")}`} name="state" id="exampleState"/>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="exampleZip">Sex</Label>
            <Input type="text" value={user && user.sex} name="zip" id="exampleZip"/>
          </FormGroup>  
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="exampleZip">State</Label>
            <Input type="text" value={user && user.address && user.address.state} name="zip" id="exampleZip"/>
          </FormGroup>  
        </Col>
      </Row>
      <Row form>
        <Col md={3}>
          <FormGroup>
            <Label for="exampleCity">No. of query received</Label>
            <Input type="text" value={user && user.queryCount} name="city" id="exampleCity"/>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="exampleState">Employment Status</Label><br />
            {users.statusLoading === true ? <Spinner color="primary" /> : (
              <Input type="text" value={`${user && user.status}`} name="state" id="exampleState" />
            )}
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleZip">Staff portfolio</Label>
            <Input type="text" value={user && !user.portfolio ? "No portfolio" : user && user.portfolio && user.portfolio.name} name="zip" id="exampleZip"/>
          </FormGroup>  
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="exampleZip">Salary</Label>
            <Input type="text" value={user && user.salaryId && user.salaryId.amount} name="zip" id="exampleZip"/>
          </FormGroup>  
        </Col>
      </Row>
      <hr />
      <p className="text-center section-identity">Next of Kin Information</p>
      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleEmail">Next of Kin Name</Label>
            <Input type="text" onChange={() => onChange()} value={user && user.nextOfKin} name="email" id="exampleEmail" placeholder="First Name" />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="examplePassword">Relationship</Label>
            <Input type="text" value={user && user.nextOfKinRel} name="password" id="examplePassword" placeholder="Last name" />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="examplePassword">Next of Kin Phone</Label>
            <Input type="text" value={user && user.nextOfKinPhone} name="password" id="examplePassword" placeholder="Last name" />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={12}>
          <FormGroup>
            <Label for="examplePassword">Next of Kin Address</Label>
            <Input type="text" value={user && user.nextOfKinAddr} name="password" id="examplePassword" placeholder="Last name" />
          </FormGroup>
        </Col>
      </Row>
      <hr />
      <p className="text-center section-identity">Guarantor Information</p>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Guarantor's Name</Label>
            <Input type="text" value={`${user && user.guarantorFName} ${user && user.guarantorLName}`} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Address</Label>
            <Input type="text" value={user && user.guarantorAddr} name="password" id="examplePassword" placeholder="Last name" />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Phone Number</Label>
            <Input type="text" value={user && user.guarantorPhone} name="password" id="examplePassword" placeholder="Last name" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Guarantor's Occupation</Label>
            <Input type="text" value={`${user && user.guarantorOccupation} ${user && user.guarantorLName}`} />
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
}

export default ProfileForm;
