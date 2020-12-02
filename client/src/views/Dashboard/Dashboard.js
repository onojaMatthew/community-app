import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Card,
  Col,
  Row,
  CardBody
} from 'reactstrap';
import { Link } from "react-router-dom";
import { getUser } from '../../store/actions/actions_user';
import { isAuthenticated } from '../../helper/authenticate';

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}



class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  async componentDidMount() {
    const { getUser } = this.props;
    const userId = isAuthenticated().user && isAuthenticated().user._id;
    await getUser(userId);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const { users } = this.props;
    let timeResumed;
    let averageTime;
    let averageResumptionTime;
    let averageResumptionMin;
    let currentUser = users.user && users.user.resumeTime && users.user.resumeTime.length > 0 ? users.user.resumeTime : null;
    if (currentUser) {
      let totalHrs = 0;
      let totalMin = 0;
      let currentMonth = [];
      const today = new Date().getDate();
      for (let i = 0; i < currentUser.length; i++) {
        const resumeData = currentUser[i];
        if (resumeData.day === today) {
          timeResumed = `${resumeData.hour}:${resumeData.min}:${resumeData.sec}am`;
        }
      }
      for (let i = 0; i < currentUser.length; i++) {
        const resumeMonth = currentUser[i];
        if (resumeMonth.month === new Date().getMonth()) {
          totalHrs += resumeMonth.hour;
          totalMin += resumeMonth.min;
          currentMonth.push(resumeMonth);
          averageResumptionTime = (totalHrs/currentMonth.length);
          averageResumptionMin = totalMin/currentMonth.length;
          averageTime = Math.ceil(averageResumptionTime) + ":" + Math.ceil(averageResumptionMin) + "am"
        }
      }
    }

    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <Row>
              <Col xs="12" sm="6" xl="8"></Col>
              <Col xs="12" sm="6" lg="4">
                <Card className="text-white bg-light">
                  <p style={{
                    color: "#000",
                    padding: 5
                  }}>You resumed work today at <span
                    style={{ color: "green" }}
                  >{timeResumed}</span> and your average resumption time this month is <span
                  style={{ color: "green" }}
                  >{averageTime}</span></p>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6" lg="4">
                <Card className="text-white bg-danger">
                  <CardBody className="pb-0">
                    <Link to="/dashboard/business" style={{ textDecoration: "none", color: "#fff"}}>
                      <div style={{ textAlign: "center", padding: 15 }}>
                        <h2 style={{
                          fontSize: 28,
                          fontWeight: "bold"
                        }}>Business Development</h2>
                      </div>
                    </Link>
                  </CardBody>
                </Card>
              </Col>

              <Col xs="12" sm="6" lg="4">
                <Card className="text-white bg-success">
                  <CardBody className="pb-0">
                    <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                      <div style={{ textAlign: "center", padding: 15 }}>
                        <h2 style={{
                          fontSize: 28,
                          fontWeight: "bold"
                        }}>HR/Product development</h2>
                      </div>
                    </Link>
                  </CardBody>
                </Card>
              </Col>

              <Col xs="12" sm="6" lg="4">
                <Card className="text-white bg-primary">
                  <CardBody className="pb-0">
                    <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                      <div style={{ textAlign: "center", padding: 15 }}>
                        <h2 style={{
                          fontSize: 28,
                          fontWeight: "bold"
                        }}>Digital Marketing/PR</h2>
                      </div>
                    </Link>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6" lg="4">
                <Card className="text-white bg-info">
                  <CardBody className="pb-0">
                    <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                      <div style={{ textAlign: "center", padding: 15 }}>
                        <h2 style={{
                          fontSize: 28,
                          fontWeight: "bold"
                        }}>Admin/finance</h2>
                      </div>
                    </Link>
                  </CardBody>
                </Card>
              </Col>

              <Col xs="12" sm="6" lg="4">
                <Card className="text-white bg-warning">
                  <CardBody className="pb-0">
                    <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                      <div style={{ textAlign: "center", padding: 15 }}>
                        <h2 style={{
                          fontSize: 28,
                          fontWeight: "bold"
                        }}>Technology</h2>
                      </div>
                    </Link>
                  </CardBody>
                </Card>
              </Col>

              <Col xs="12" sm="6" lg="4">
                <Card className="text-white bg-danger">
                  <CardBody className="pb-0">
                    <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                      <div style={{ textAlign: "center", padding: 15 }}>
                        <h2 style={{
                          fontSize: 28,
                          fontWeight: "bold"
                        }}>Internal Control/Audit</h2>
                      </div>
                    </Link>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  const dispatchProps = {
    getUser: (userId) => dispatch(getUser(userId))
  }

  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
