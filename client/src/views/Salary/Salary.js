import React, { Component } from "react";
import { Form, Button, Card, Col, Row, Input, FormGroup, Spinner } from "reactstrap";
import SalaryList from "./SalaryList";

export default class Salary extends Component{
  state = {
    message: "",
    errMsg: "",
    portfolio: "",
    amount: "",
    toggle: false,
    isUpdate: false,
    salaryId: "",
  }

  async componentDidMount() {
    const { getSalary } = this.props;
    await getSalary();
  }

  componentDidUpdate(prevProps, nextProps) {
    if (this.props.salary && this.props.salary !== prevProps.salary) {
      if (this.props.salary.error && this.props.salary.error.length > 0) {
        this.setState({errMsg: this.props.salary.error })
      } else if (this.props.salary.addSuccess === true) {
        this.setState({ message: "Created successfully" });
      } else if (this.props.updateSuccess) {
        this.setState({ message: "Salary updated" });
      }
    }
  }

  toggleIsUpdate = (id) => {
    this.setState((prevState) =>  ({ 
      isUpdate: !prevState.isUpdate,
      salaryId: id
    }));
  }

  handleChange = (e, name) => {
    this.setState({ 
      errMsg: "",
      message: "",
    });

    let fields = this.state;
    fields[name] = e.target.value;
    this.setState({ fields });
  }

  handleSubmit = async () => {
    const { addSalary } = this.props;
    const { portfolio, amount } = this.state;
    const data = { portfolio, amount };
    await addSalary(data);
  }

  handleDelete = async (id) => {
    const { deleteSalary } = this.props;
    await deleteSalary(id);
  }

  submitUpdate = async (salaryId) => {
    const { updateSalary } = this.props;
    const { amount } = this.state;
    const data = { amount, salaryId };
    await updateSalary(data);
  }

  render() {
    const { salary } = this.props;
    const { message, errMsg, isUpdate, amount, salaryId } = this.state;
    
    return(
      <div>
        <Card style={{ paddingTop: 50, paddingBottom: 15 }}>
          {this.state.toggle === true ? null : <Row className="justify-content-center">
            <Col xs="12" xl="8">
              <h4>Portfolios and their salaries</h4>
            </Col>
          </Row>}
          <Row className="justify-content-center">
            <Col xs="12" xl="6">
              {message.length > 0 ? <p style={{ color: "#00ff00"}}>{message}</p> : null}
              {errMsg.length > 0 ? <p style={{ color: "#ff0000"}}>{errMsg}</p> : null}
            </Col>
          </Row>
          {this.state.toggle === true ? (
            <Form>
              <Row className="justify-content-center">
                <Col xs={12} sm="12" xl="8">
                  <FormGroup>
                    <Input 
                      type="text" 
                      onChange={(e) => this.handleChange(e, "portfolio")} 
                      value={this.state.portfolio}
                      placeholder="Portfolio Name *"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input 
                      type="text" 
                      onChange={(e) => this.handleChange(e, "amount")} 
                      value={this.state.amount}
                      placeholder="Salary Amount *"
                    />
                  </FormGroup>
                  {salary.addLoading === true ? <Spinner color="primary" /> : (
                    <Button 
                      color="success" 
                      style={{ width: "100%" }}
                      onClick={this.handleSubmit}
                    >Add New Salary</Button>
                  )}
                </Col>
              </Row>
            </Form>
          ) : (
            <Row className="justify-content-center">
              <Col xs="12" xl="10">
                <SalaryList 
                  isUpdate={isUpdate} 
                  salary={salary}
                  amount={amount}
                  salaryId={salaryId}
                  handleChange={this.handleChange}
                  toggleIsUpdate={this.toggleIsUpdate}
                  submitUpdate={this.submitUpdate}
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
                  {this.state.toggle === true ? (
                  <p 
                    onClick={() => this.setState({ toggle: false })}
                    style={{ color: "green"}}
                  >CLICK TO VIEW SALARY LIST</p>
                  ) : (
                    <p 
                      onClick={() => this.setState({ toggle: true })}
                      style={{ color: "green" }}
                    >CLICK TO ADD NEW SALARY</p>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}