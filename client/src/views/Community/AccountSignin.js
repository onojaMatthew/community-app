import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { Spinner, Input } from "reactstrap";
import { communityLogin } from "../../store/actions/actions_community";

class AccountSignin extends Component{
  state = {
    email: "",
    password: "",
    errMsg: "",
    message: ""
  }

  componentDidUpdate(prevProps, nextProps) {
    const { community } = this.props;
    if (this.props.community && this.props.community !== prevProps.community) {
      if (community.error) {
        this.setState({
          errMsg: community.error
        });
      } else if (community.success === true) {
        this.setState({
          email: " ",
          password: " ",
          message: "Login success!!!",
        });
      }
    }
  }

  onChange = (e, name) => {
    this.setState({
      errMsg: "",
      message: ""
    });
    let fields = this.state;
    fields[name] = e.target.value;
    this.setState({ fields });
  }

  onLogin = async (e) => {
    e.preventDefault();
    const { communityLogin } = this.props;
    const { email, password } = this.state;
    const data = { email, password };
    
    await communityLogin(data);
  }

  render() {
    const { community, history } = this.props;
    const { errMsg, message } = this.state;
    if (community.success === true) {
      history.push("/");
    }
    return (
      <div className="parent">
        <div className="main-w3layouts wrapper">
          <h1 className='text-center'>Sign In</h1>
          {errMsg.length > 0 ? <p style={{ color: "#ff0000", textAlign: "center" }}>{errMsg}</p> : null}
          {message.length > 0 ? <p style={{ color: "#fff", textAlign: "center" }}>{message}</p> : null}
          <div className="main-agileinfo">
            <div className="agileits-top">
              <form onSubmit={(e) => this.onLogin(e)}>
                <Input onChange={(e) => this.onChange(e, "email")} className="text email" type="email" name="email"
                  placeholder="Email" required="" style={{ color: "#333"}} />
                <Input onChange={(e) => this.onChange(e, "password")} className="text" type="password" name="password" placeholder="Password" style={{ color: "#333"}} required="" />
                {community.loading === true ? (
                  <div className="text-center pt-3">
                    <Spinner color="primary" />
                  </div>
                )
                 : (
                  <input type="submit" value="SIGNIN" />
                )}
              </form>
              <p>Don't have an Account? <Link to="/community_signup"> Signup Now!</Link></p>
            </div>
          </div>
          <ul className="colorlib-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => {
  const dispatchProps = {
    communityLogin: (data) => dispatch(communityLogin(data))
  }

  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSignin);