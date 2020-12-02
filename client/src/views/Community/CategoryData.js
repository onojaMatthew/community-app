import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Form, Input, FormGroup, Button, Spinner } from "reactstrap";
import { communityCategory } from "../../store/actions/actions_community_category";

const CategoryData = (props) => {
  const [ name, setName ] = useState("");
  const [errMsg, setErrorMsg] = useState("");
  const [ description, setDescription ] = useState("");
  const categories = useSelector(state => state.topicCategory)
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(communityCategory({ name, description }));
    setName("");
    setDescription("")
  }

  useEffect(() => {
    setErrorMsg(categories.error);
  }, [ categories ])

  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="10" xl="10">
          <h4 className="mb-5">Create new Chat Category</h4>
          {errMsg.length > 0 ? <p style={{ color: "#ff0000" }}>{errMsg}</p> : null}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="10" xl="10">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Input
                    type="text"
                    name="title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Type title here"
                    style={{
                      border: "1px solid grey",
                      borderRadius: 0,
                      color: "#333"
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <textarea
                    name="text"
                    id="exampleCity"
                    rows="4" 
                    cols="93"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Description"
                    style={{ 
                      border: "1px solid grey",
                      borderRadius: 0,
                      color: "#333"
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            {categories.loading === true ? (
              <div className="text-center pt-3">
                <Spinner color="primary" /> <span>Please wait...</span>
              </div> 
            ) : ( 
              <Button color="success">Create a new Category</Button>
            )}
          </Form>
        </Col>
      </Row>
      
    </div>
  )
}

export default CategoryData;