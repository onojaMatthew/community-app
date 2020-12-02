import React, { Component } from "react";
import { Form, Button, Card, Col, Row, Input, FormGroup, Spinner, CardBody } from "reactstrap";
import CategoryList from "./CategoryList";

export default class PartnerCategory extends Component{
  state = {
    name: "",
    message: "",
    errMsg: "",
    isOpen: false,
  }

  async componentDidMount() {
    const { getCategory } = this.props;
    await getCategory();
  }

  componentDidUpdate(prevProps, nextProps) {
    const { category } = this.props;
    if (this.props.category && this.props.category !== prevProps.category) {
      if (category.error && category.error.length > 0) {
        this.setState({ errMsg: category.error });
      } else if (category.createCategorySuccess === true) {
        this.setState({ message: "Category added successfully" });
      }
    }
  }

  toggleOpen = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  }

  handleSubmit = async () => {
    const { createCategory } = this.props;
    const { name } = this.state;
    const data = { name };
    await createCategory(data);
  }

  handleChange = (e, name) => {
    this.setState({
      errMsg: "",
      message: ""
    });

    let fields = this.state;
    fields[name] = e.target.value;
    this.setState({ fields });
  }

  handleDelete = async (id) => {
    const { deleteCategory } = this.props;
    await deleteCategory(id);
  }

  render() {
    const { category } = this.props;
    const { message, errMsg } = this.state;
    const categories = category.categories && category.categories;
    return (
      <Card style={{ height: "400px", paddingTop: 100 }}>
        <CardBody>
        {this.state.isOpen === false ? (
          <Form>
            <Row className="justify-content-center">
              <Col xs="12" xl="8">
                <h4>Add new partnership category</h4>
                {errMsg.length > 0 ? <p style={{ color: "red" }}>{errMsg}</p> : null}
                {message.length > 0 ? <p style={{ color: "green" }}>{message}</p> : null}
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs={12} sm="12" xl="8">
                <FormGroup>
                  <Input 
                    type="text" 
                    onChange={(e) => this.handleChange(e, "name")} 
                    value={this.state.name}
                    placeholder="Category *"
                  />
                </FormGroup>
                
                {category.createCategoryLoading === true ? <Spinner color="primary" /> : (
                  <Button 
                    color="success" 
                    style={{ width: "100%" }}
                    onClick={this.handleSubmit}
                  >Create New Category</Button>
                )}
              </Col>
            </Row>
          </Form>
        ) : (
          <Row className="justify-content-center">
            <Col xs="12" xl="10">
              <CategoryList 
                categories={categories}
                category={category}
                handleDelete={this.handleDelete}
              />
            </Col>
          </Row>
        )}
        <hr />
        <Row className="justify-content-left">
            <Col xs="12" xl="12">
              <Row>
                <Col xs="12" xl="9"></Col>
                <Col xs="12" xl="3">
                  <p 
                    onClick={() => this.toggleOpen()}
                    style={{ color: "green"}}
                  >{this.state.isOpen ? "CLICK TO ADD NEW CATEGORY" : "CLICK TO VIEW ALL CATEGORIES"}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}