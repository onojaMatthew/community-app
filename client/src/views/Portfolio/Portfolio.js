import React, { Component } from "react";
import { Form, Button, Card, Col, Row, Input, FormGroup, Spinner } from "reactstrap";
import PortfolioList from "./PortfolioList";
// import Card from "../Support/Card";


export default class Portfolio extends Component{
  state = {
    name: "",
    toggle: false,
    errMsg: "",
    message: "",
  }

  async componentDidMount() {
    const { getPortfolio } = this.props;
    await getPortfolio();
  }

  componentDidUpdate(prevProps, nextProps) {
    if (this.props.portfolio && this.props.portfolio !== prevProps.portfolio) {
      if (this.props.portfolio.error && this.props.portfolio.error.length > 0) {
        this.setState({errMsg: this.props.portfolio.error })
      } else if (this.props.portfolio.createSuccess === true) {
        this.setState({ message: "Created successfully" });
      }
    }
  }

  onChange = (e, name) => {
    this.setState({ message: "", errMsg: "" });
    let fields = this.state;
    fields[name] = e.target.value;
    this.setState({ fields });
  }

  handleSubmit = async () => {
    const { createPortfolio } = this.props;
    const { name } = this.state;
    const data = { name };
    await createPortfolio(data);
  }

  render() {
    const { portfolio } = this.props;
    const { errMsg, message } = this.state;
    return(
      <div>
        <Card style={{ paddingTop: 50, paddingBottom: 15 }}>
          {this.state.toggle === true ? null : <Row className="justify-content-center">
            <Col xs="12" xl="8">
              <h4>Portfolio List</h4>
            </Col>
          </Row>}
          
          {this.state.toggle === true ? (
            <Form>
              <Row className="justify-content-center">
                <Col xs="12" xl="6">
                  {message.length > 0 ? <p style={{ color: "#00ff00"}}>{message}</p> : null}
                  {errMsg.length > 0 ? <p style={{ color: "#ff0000"}}>{errMsg}</p> : null}
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs={12} sm="12" xl="8">
                  <FormGroup>
                    <h3 for="exampleCity">Create New Portfolio</h3>
                    <Input 
                      type="text" 
                      onChange={(e) => this.onChange(e, "name")} 
                      value={this.state.name}
                      placeholder="Portfolio Name *"
                    />
                  </FormGroup>
                  {portfolio.createLoading === true ? <Spinner color="primary" /> : (
                    <Button 
                      color="success" 
                      style={{ width: "100%" }}
                      onClick={this.handleSubmit}
                    >Create new Portfolio</Button>
                  )}
                </Col>
              </Row>
            </Form>
          ) : (
            <Row className="justify-content-center">
              <Col xs="12" xl="8">
                <PortfolioList portfolio={portfolio} />
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
                  >View portfolio list</p>
                  ) : (
                    <p 
                      onClick={() => this.setState({ toggle: true })}
                      style={{ color: "green" }}
                    >create new portfolio</p>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}