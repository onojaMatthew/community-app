import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { newCommunity } from "../../store/actions/actions_community";
import { Spinner, Input } from "reactstrap";

class Account extends Component{
  state = {
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    checked: false,
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
          fullname: " ",
          email: " ",
          phone: " ",
          address: " ",
          password: " ",
          checked: "",
          message: "You have successfully registered",
        });
      }
    }
  }

  onCheck = (e, name) => {
    this.setState({
      errMsg: "",
      message: ""
    });
    let field = this.state;
    field[name] = e.target.checked;
    this.setState({ field });
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

  onRegister = async (e) => {
    e.preventDefault();
    const { newCommunity } = this.props;
    const { fullname, address, phone, email, password, checked } = this.state;
    const data = { fullname, address, phone, email, password };
    
    if (!checked) {
      this.setState({ errMsg: "You must agree to our terms and condition" });
      return;
    }
    await newCommunity(data)
  }

  render() {
    const { community } = this.props;
    const { errMsg, message } = this.state;
    
    return (
      <div className="parent">
        <div className="main-w3layouts wrapper">
          <h1 className="text-center">Create an Account</h1>
          {errMsg.length > 0 ? <p style={{ color: "#ff0000", textAlign: "center" }}>{errMsg}</p> : null}
          {message.length > 0 ? <p style={{ color: "#fff", textAlign: "center" }}>{message}</p> : null}
          <div className="main-agileinfo">
            <div className="agileits-top">
              <form onSubmit={(e) => this.onRegister(e)}>
                <Input 
                  className="text" 
                  type="text" 
                  name="fullname"
                  placeholder="Your Full Name"
                  onChange={(e) => this.onChange(e, "fullname")}
                  style={{ color: "#333" }}
                />
                <Input 
                  className="text email" 
                  type="email" 
                  name="email"
                  placeholder="Email"
                  onChange={(e) => this.onChange(e, "email")}
                  style={{ color: "#333" }}
                />
                <Input 
                  className="text" 
                  type="password"
                  name="password"
                  onChange={(e) => this.onChange(e, "password")} 
                  placeholder="Password"
                  style={{ color: "#333" }}
                />
                
                <Input 
                  className="text w3lpass" 
                  type="text" 
                  name="phone"
                  placeholder="Phone"
                  onChange={(e) => this.onChange(e, "phone")}
                  style={{ color: "#333" }}
                />
                
                <Input 
                  className="text" 
                  type="text" 
                  name="address" 
                  placeholder="Your Address"
                  onChange={(e) => this.onChange(e, "address")}
                  style={{ marginBottom: 10, color: "#333" }}
                />
                
                <div className="wthree-text">
                  <label className="anim">
                    <input type="checkbox" name="checked" onChange={(e) => this.onCheck(e, "checked")} className="checkbox" required="" />  <span>I Agree To The Terms & Conditions</span>
                  </label>
                  <div className="clear"> </div>
                </div>
                {community.loading === true ? (
                  <div className="text-center">
                    <Spinner color="primary" />
                  </div>
                )
                 : (
                  <input type="submit" value="SIGNUP" />
                )}
              </form>
              <p>Don't have an Account? <Link to="/community_login"> Login Now!</Link></p>
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

const mapStateProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => {
  const dispatchProps = {
    newCommunity: (data) => dispatch(newCommunity(data))
  }

  return dispatchProps;
}

export default connect(mapStateProps, mapDispatchToProps)(Account);

