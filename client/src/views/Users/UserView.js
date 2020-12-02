import React, { Component } from "react";
import moment from "moment";
import { 
  Row,
  Col,
  Card,
  Form,
  Button,
  Label,
  Input,
  FormGroup,
  Spinner,
  Table,
  CardBody
} from "reactstrap";
import ProfileForm from "./ProfileForm";

export default class UserView extends Component{
  state = {
    queryStatement: "",
    portfolioId: "",
    errMessage: "",
    statusUpdate: "",
    message: "",
    salaryId: "",
    isOpen: false,
    errMsg: ""
  }

  async componentWillMount() {
    const userId = window.location.pathname.slice(17);
    const { getUser, getPortfolio, getSalary } = this.props;
    await getUser(userId);
    await getPortfolio();
    await getSalary();
  }

  componentDidMount() {
    this.getQuery()
  }

  getQuery = async () => {
    const { getSingleQuery } = this.props;
    const userId = window.location.pathname.slice(17);
    await getSingleQuery(userId);
  }

  onChange = (e, name) => {
    this.setState({ errMessage: "" });
    let field = this.state;
    field[name] = e.target.value;
    this.setState({ field });
  }

  onQuery = async (e, receiverId) => {
    e.preventDefault();
    const { issueQuery } = this.props;
    const { queryStatement } = this.state;
    const data = { queryStatement, receiverId };
    await issueQuery(data);
  }

  onSack = async (userId) => {
    this.setState({ statusUpdate: "sack"});
    const { updateStatus } = this.props;
    const status = "sacked";
    const data = { status, userId };
    await updateStatus(data);
  }

  onLeave = async (userId) => {
    this.setState({ statusUpdate: "leave"});
    const { updateStatus } = this.props;
    const status = "on leave";
    const data = { status, userId };
    await updateStatus(data);
  }

  onAssignPortfolio = async (e, userId) => {
    e.preventDefault()
    const { assignPortfolio } = this.props;
    const { portfolioId } = this.state;
    const data = { portfolioId, userId };
    await assignPortfolio(data);
  }

  onSuspension = async (userId) => {
    this.setState({ statusUpdate: "suspension" });
    const { updateStatus } = this.props;
    const status = "suspended";
    const data = { status, userId };
    await updateStatus(data);
  }

  onDeath = async (userId) => {
    this.setState({ statusUpdate: "death" })
    const { updateStatus } = this.props;
    const status = "died";
    const data = { status, userId };
    await updateStatus(data);
  }

  onHospitalized = async (userId) => {
    this.setState({ statusUpdate: "hospitalized" });
    const { updateStatus } = this.props;
    const status = "hospitalized";
    const data = { status, userId };
    await updateStatus(data);
  }

  onResign = async (userId) => {
    this.setState({ statusUpdate: "resigned" });
    const { updateStatus } = this.props;
    const status = "resigned";
    const data = { status, userId };
    await updateStatus(data);
  }

  onAllocateSalary = async (e, userId) => {
    e.preventDefault();
    const { allocateSalary } = this.props;
    const { salaryId } = this.state;
    const data = { salaryId, userId };
    await allocateSalary(data);
  }

  toggleIsOpen = () => {
    this.setState((prevState) => {
      return {
        isOpen: !prevState.isOpen
      }
    });
  }

  render() {
    const { queryStatement, statusUpdate, isOpen } = this.state;
    const { users, query, portfolio, salary } = this.props;
    const user = users.user && users.user;
    const portfolios = portfolio.portfolios && portfolio.portfolios;
    const salaries = salary.salaries && salary.salaries;
    const queries = query.query && query.query;
    console.log(queries, " this is the query list")
    return(
      <div>
        <div className="profile-banner"></div>
          <Row className="justify-content-center">
            <Col sm="11" xs="12" xl="11">
              <Card>
                <CardBody>
                  <div className="profile-content">
                    <img src={`https://ojirehprime-community-api.herokuapp.com/v1/profile/photo/${user ? user._id : null}`} alt="user profile"/>
                  </div>
                  <Row>
                    <Col xs="12" sm="12" xl="9" style={{
                      borderRight: "1px solid #cce",
                      height: "100%"
                    }}>
                      <ProfileForm user={user} users={users} query={query} />
                    </Col>
                    <Col xs="12" sm="12" xl="3">
                      <Row>
                        <Form style={{ paddingLeft: 10 }} onSubmit={(e) => this.onAssignPortfolio(e, user._id)}>
                          <FormGroup>
                            <Label for="exampleEmail">Choose Portfolio</Label>
                            <select 
                              onChange={(e) => this.onChange(e, "portfolioId")} 
                              className="form-control"
                            >
                              <option value="">Select a portfolio</option>
                              {portfolios && portfolios.map(port => (
                                <option key={port._id} value={port._id}>{port.name}</option>
                              ))}
                            </select>
                          </FormGroup>
                          {users.portfolioLoading === true ? <Spinner color="primary" /> : (
                            <Button color="primary">Assign Portfolio</Button>
                          )}
                        </Form>
                      </Row>
                      
                      <hr />
                      <Row>
                        <Col>
                          <Form onSubmit={(e) => this.onQuery(e, user._id)}>
                            <FormGroup>
                              <Label for="exampleEmail"></Label>
                              <Input 
                                type="text"
                                placeholder="Why issuing this query"
                                onChange={(e) => this.onChange(e, "queryStatement")} 
                                value={queryStatement} 
                                name={queryStatement}
                              />
                            </FormGroup>
                            {query.loading === true ? <Spinner color="primary" /> : 
                            (<Button color="warning">Issue Query</Button>)}
                            
                          </Form>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                          <Form onSubmit={(e) => this.onAllocateSalary(e, user._id)}>
                            <FormGroup>
                              <Label for="exampleEmail"></Label>
                              <select
                                className="form-control"
                                onChange={(e) => this.onChange(e, "salaryId")} 
                              >
                                <option value="">Choose a salary</option>
                                {salaries && salaries.map(salary => (
                                  <option value={salary._id}>{salary.amount}</option>
                                ))}
                              </select>
                            </FormGroup>
                            {users.salaryLoading === true ? <Spinner color="primary" /> : 
                            (<Button color="success">Allocate salary</Button>)}
                          </Form>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                          {users.statusLoading === true && statusUpdate === "leave" ? <Spinner color="primary" /> : (
                            <Button onClick={() => this.onLeave(user._id)} color="success">Give Leave</Button>
                          )}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                        {users.statusLoading === true && statusUpdate === "sack" ? <Spinner color="primary" /> : (
                          <Button onClick={() => this.onSack(user._id)} color="danger">Sack Staff</Button>
                        )}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                        {users.statusLoading === true && statusUpdate === "hospitalized" ? <Spinner color="primary" /> : (
                          <Button onClick={() => this.onHospitalized(user._id)} color="primary">Staff Hospitalized</Button>
                        )}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                        {users.statusLoading === true && statusUpdate === "death" ? <Spinner color="primary" /> : (
                          <Button onClick={() => this.onDeath(user._id)} color="danger">Staff Died</Button>
                        )}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                        {users.statusLoading === true && statusUpdate === "resigned" ? <Spinner color="primary" /> : (
                          <Button onClick={() => this.onResign(user._id)} color="success">Resign</Button>
                        )}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                        {users.statusLoading === true && statusUpdate === "suspension" ? <Spinner color="primary" /> : (
                          <Button onClick={() => this.onSuspension(user._id)} color="warning">Suspend Staff</Button>
                        )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div 
                        onClick={() => this.toggleIsOpen()}
                        style={{
                          color: "skyblue",
                          float: "right",
                          fontSize: 18,
                          border: "2px solid skyblue",
                          padding: "3px",
                          cursor: "pointer",
                          marginBottom: 15
                        }}
                      >{isOpen === true ? "Hide queries" : "View queries"}</div>
                      {isOpen ? (
                        <Table dark>
                          <thead>
                            <tr>
                              <th>S/N</th>
                              <th>Query Statement</th>
                              <th>Queried By</th>
                              <th>Date Queried</th>
                              <th>Response</th>
                            </tr>
                          </thead>
                          <tbody>
                            {queries && queries.length > 0 ? queries.map((query, i) => (
                              <tr key={query._id}>
                                <td>{i + 1}</td>
                                <td>{query.queryStatement}</td>
                                <td>{query.issuerId && query.issuerId.firstName} {query.issuerId && query.issuerId.lastName}</td>
                                <td>{moment(query.issuedDate).format("DD/MM/YYYY")}</td>
                                <td>{query.queryResponse ? query.requeryResponse : "No response yet"}</td>
                              </tr>
                            )) : <tr>
                              </tr>}
                          </tbody>
                        </Table>
                      ) : null}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
      </div>
    );
  }
}