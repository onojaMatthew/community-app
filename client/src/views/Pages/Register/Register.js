import React, { Component } from 'react';
import { Spinner } from "reactstrap";

class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    comfirmPassword: "",
    phone: "",
    isEmployer: false,
    isEmployee: true,
    errMsg: "",
    errMssg: "",
    errorMsg: ""
  }

  componentDidUpdate(prevProps, nextProps) {
    const { account } = this.props;
    if (this.props.account && this.props.account !== prevProps.account) {
      if (account.error && account.error.length) {
        this.setState({ errorMsg: account.error });
      }
    }
  }

  onToggleEmployer = () => {
    this.setState({ 
      isEmployer: true,
      isEmployee: false
    });
  }

  onToggleEmployee = () => {
    this.setState({ 
      isEmployer: false,
      isEmployee: true
    });
  }

  onChange = (e, name) => {
    this.setState({ 
      errMsg: "",
      errorMsg: "",
      errMssg: ""
    });
    let fields = this.state;
    fields[name] = e.target.value;
    this.setState({ fields });
  }

  handleChange = (e, name) => {
    this.setState({
      errMsg: "",
      errorMsg: "",
      errMssg: ""
    });
    let fields = this.state;
    fields[name] = e.target.value;
    this.setState({ fields });
  }

  handleSubmit = async (formName) => {
    const { registration } = this.props;
    const { firstName, lastName, email, password, comfirmPassword, phone } = this.state;
    const data = { firstName, lastName, email, password, comfirmPassword, phone }
   
    if (comfirmPassword !== password) {
      if (formName === "employee") {
        this.setState({ errMssg: "Password do not match" });
      } else {
        this.setState({ errMsg: "Password do not match" });
      }

      return;
    }

    await registration(data);
  }

  render() {
    const { 
      isEmployee,
      isEmployer,
      firstName,
      lastName, email,
      password,
      comfirmPassword,
      phone,
      errMssg,
      errorMsg
    } = this.state;
    const { account } = this.props;
    if (account && account.registerSuccess === true) {
      return window.location.href = "/complete_data";
    }
    return (
      <div className="container register">
          <div className="row">
            <div className="col-md-3 register-left">
                <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                <h3>Welcome</h3>
                <p>You are 30 seconds away from earning your own money!</p>
                <a href="/login" className="page-link">Login</a><br/>
            </div>
              <div className="col-md-9 register-right">
                  <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                      <li className="nav-item">
                        <span 
                          className={`nav-link active`} 
                          id="home-tab" data-toggle="tab" 
                          role="tab" aria-controls="home"
                          onClick={this.onToggleEmployee}
                          aria-selected={isEmployee}>Employee</span>
                      </li>
                      <li className="nav-item">
                          <span 
                            className="nav-link" 
                            id="profile-tab" 
                            data-toggle="tab" 
                            role="tab" 
                            // aria-controls="profile"
                            onClick={this.onToggleEmployer}
                            aria-selected={isEmployer}>Hirer</span>
                      </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                      {isEmployer === true ? (
                        <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                          <div className="row">
                            {errMssg.length ? <span className="error text-center">{errMssg}</span>: null}
                            {isEmployee === true && errorMsg.length ? <span className="error">{errorMsg}</span> : null}
                          </div>
                          <h3  className="register-heading">Register as Employer</h3>
                          <div className="row register-form">
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="First Name *" 
                                        value={firstName}
                                        onChange={(e) => this.handleChange(e, "firstName")}
                                      />
                                  </div>
                                  <div className="form-group">
                                      <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Last Name *"
                                        value={lastName}
                                        onChange={(e) => this.handleChange(e, "lastName")}
                                      />
                                  </div>
                                  <div className="form-group">
                                      <input 
                                        type="email" 
                                        className="form-control" 
                                        placeholder="Email *" 
                                        value={email}
                                        onChange={(e) => this.handleChange(e, "email")}
                                      />
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Phone *" 
                                        value={phone}
                                        onChange={(e) => this.handleChange(e, "phone")}
                                      />
                                  </div>
                                  <div className="form-group">
                                    <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Password *" 
                                    value={password}
                                    onChange={(e) => this.handleChange(e, "password")} 
                                  />
                                  </div>
                                  <div className="form-group">
                                    <input 
                                      type="password" 
                                      className="form-control" 
                                      placeholder="Confirm Password *" 
                                      value={comfirmPassword}
                                      onChange={(e) => this.handleChange(e, "comfirmPassword")}
                                    />
                                  </div>
                                  {isEmployee === true && account && account.registerLoading === true ? <Spinner color="primary" /> :<input type="submit" onClick={() => this.handleSubmit("employer")} className="btnRegister"  value="Register Now"/>}
                              </div>
                          </div>
                      </div>
                    ) : isEmployee === true ? (
                      <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                          <h3 className="register-heading">Register as a Employee</h3>
                          
                          <div className="row">
                          {errMssg.length ? <span className="error text-center">{errMssg}</span>: null}
                          {isEmployee === true && errorMsg.length ? <span className="error">{errorMsg}</span> : null}
                          </div>
                          
                          <div className="row register-form">
                              <div className="col-md-6">
                              <div className="form-group">
                                      <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="First Name *" 
                                        value={firstName}
                                        onChange={(e) => this.onChange(e, "firstName")}
                                      />
                                  </div>
                                  <div className="form-group">
                                      <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Last Name *"
                                        value={lastName}
                                        onChange={(e) => this.onChange(e, "lastName")}
                                      />
                                  </div>
                                  <div className="form-group">
                                      <input 
                                        type="email" 
                                        className="form-control" 
                                        placeholder="Email *" 
                                        value={email}
                                        onChange={(e) => this.onChange(e, "email")}
                                      />
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Phone *" 
                                        value={phone}
                                        onChange={(e) => this.onChange(e, "phone")}
                                      />
                                  </div>
                                  <div className="form-group">
                                    <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Password *" 
                                    value={password}
                                    onChange={(e) => this.onChange(e, "password")} 
                                  />
                                  </div>
                                  <div className="form-group">
                                    <input 
                                      type="password" 
                                      className="form-control" 
                                      placeholder="Confirm Password *" 
                                      value={comfirmPassword}
                                      onChange={(e) => this.onChange(e, "comfirmPassword")}
                                    />
                                  </div>
                                 {account && account.registerLoading === true ? <Spinner color="primary" /> : (
                                  <input type="submit" onClick={() => this.handleSubmit("employee")} className="btnRegister"  value="Register Now"/>
                                 )}
                              </div>
                          </div>
                      </div>
                    ) : null}
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default Register;
