import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Row, Col  } from "reactstrap";
import ChatContent from "./ChatContent";
import ChatHome from "./ChatHOme";
import { getUsers } from "../../store/actions/actions_user";
import Message from "./Message";

class Chat extends Component{
  state = {
    name: "",
    errMsg: "",
    message: "",
  }

  async componentDidMount() {
    const { getUsers } = this.props;
    await getUsers();
  }

  winLocation  = (id) => {
    return this.props.history.push(`/dashboard/chat/${id}`);
  }

  render() {
    const { match } = this.props;
    return(
      <div style={{ 
          height: "100%"
        }}
      >
        <Row>
          <Col xs="9" sm="9" xl="12" style={{
            position: "relative",
            float: "left",
            height:"100%",
            overflowY: "auto",
          }}>
            <Switch>
              <Route exact path={`${match.url}/`}  render={(props) => 
                <ChatHome {...props} />} />
              <Route path={`${match.url}/messages`} render={(props) => <Message {...props} />} />
              <Route path={`${match.url}/:chatId`} render={(props) => <ChatContent {...props} />} />
            </Switch>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = (dispatch) => {
  const dispatchToProps = {
    getUsers: () => dispatch(getUsers()),
  }

  return dispatchToProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
