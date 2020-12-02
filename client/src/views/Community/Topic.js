import React from "react";
import { Modal, Spinner, ModalBody, Col, Row, Form, FormGroup, Input, ModalHeader, Button } from "reactstrap";

const Topic = ({
    modal, 
    toggleModal,
    onCreateTopic,
    handleChange,
    errMsg,
    message,
    topic,
    title,
    category,
    text,
    topicCategories
  }) => {
  return (
    <div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader 
          toggle={toggleModal}
          style={{
            background: "linear-gradient(to right, #0e6b0e 0%, #0e6b0e 100%)",
            color: "#fff"
          }}
        >
          Create new Topic
          {errMsg.length > 0 ? <p style={{ color: "#ff0000" }}>{errMsg}</p> : null}
          {message.length > 0 ? <p style={{ color: "#fff" }}>{message}</p> : null}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => onCreateTopic(e)}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Input 
                    type="text" 
                    name="title"
                    value={title}
                    onChange={(e) => handleChange(e, "title")}
                    placeholder="Type title here"
                    style={{ 
                      border: "1px solid grey",
                      borderRadius: 0,
                      color: "#333"
                    }}
                  />
                    
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Input 
                    type="select" 
                    name="category" 
                    id="examplePassword"
                    value={category}
                    onChange={(e) => handleChange(e, "category")}
                    style={{ 
                      border: "1px solid grey",
                      borderRadius: 0
                    }}
                  >
                    <option value="Category...">Category...</option>
                    {topicCategories.map(category => (
                      <option value={category._id}>{category.name}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Input 
                    type="textarea" 
                    name="text" 
                    id="exampleCity"
                    onChange={(e) => handleChange(e, "text")}
                    value={text}
                    placeholder="Please select a category before typing here"
                    style={{ 
                      border: "1px solid grey",
                      borderRadius: 0
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            {topic.loading === true ? (
              <div className="text-center pt-3">
                <Spinner color="primary" /> <span>Please wait...</span>
              </div>
            ) : (
              <Button color="success">Create a new Topic</Button>
            )}
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Topic;
