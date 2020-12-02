import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from "reactstrap";

class Login extends Component {
  state = {
    email: "",
    password: "",
    isEmployer: false,
    isEmployee: true,
    errMsg: "",
  }

  componentDidUpdate(prevProps, nextProps) {
    const { account } = this.props;
    if (this.props.account && this.props.account !== prevProps.account) {
      if (account.error && account.error.length > 0) {
        this.setState({ errMsg: account.error });
      }
    }
  }

  handleChange = (e, name) => {
    this.setState({ errMsg: "" });
    let fields = this.state;
    fields[name] = e.target.value;
    this.setState({ fields });
  }

  handleSubmit = async () => {
    const { login } = this.props;
    const { email, password} = this.state;
    const data = { email, password };
    await login(data);
  }

  handleInputChange = (e, name) => {
    this.setState({ errMsg: "" });
    if (this.state.isEmployer === true) {
      let fields = this.state;
      fields[name] = e.target.value;
      this.setState({ fields });
    }
    
  }

  handleEmployerSubmit = async () => {
    const { login } = this.props;
    const { email, password} = this.state;
    const data = { email, password };
    if (this.state.isEmployer === true) {
      await login(data);
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

  render() {
    const { isEmployee, isEmployer, errMsg, email, password } = this.state;
    const { account } = this.props;
    if (account && account.loginSuccess === true ) {
      return window.location.href = "/dashboard";
    }

    return (
      <div className="container register">
          <div className="row">
            <div className="col-md-3 register-left">
                <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                <h3>Welcome</h3>
                <p>You are 30 seconds away from your work space dashboard!</p>
                <Link to="/register" className="page-link">Register</Link><br/>
            </div>
              <div className="col-md-9 register-right">
                  <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                      <li className="nav-item">
                        <span 
                          className="nav-link active" 
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
                            {isEmployer === true && errMsg.length > 0? <span className="error text-center">{errMsg}</span>: null}
                          </div>
                          <h3  className="register-heading">Login as Employer</h3>
                          <div className="row register-form">
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <input 
                                        type="email" 
                                        className="form-control" 
                                        placeholder="Email *"
                                        onChange={(e) => this.handleInputChange(e, "email")}
                                        value={email}
                                      />
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                    <input 
                                      type="password" 
                                      className="form-control" 
                                      placeholder="Password *"
                                      onChange={(e) => this.handleInputChange(e, "password")}
                                      value={password} />
                                  </div>
                                  {account && account.loginLoading === true ? <Spinner color="primary" /> : (
                                    <input type="submit" onClick={() => this.handleEmployerSubmit()} className="btnRegister"  value="Login Now"/>
                                  )}
                              </div>
                          </div>
                      </div>
                    ) : isEmployee === true ? (
                      <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="row">
                          {isEmployee === true && errMsg.length > 0 ? <span className="error text-center">{errMsg}</span>: null}
                        </div>
                        <h3 className="register-heading">Login as Employee</h3>
                        <div className="row register-form">
                          <div className="col-md-6">
                            <div className="form-group">
                                <input 
                                  type="email" 
                                  className="form-control" 
                                  placeholder="Email *"
                                  onChange={(e) => this.handleChange(e, "email")}
                                  value={email} 
                                />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Password *"
                                onChange={(e) => this.handleChange(e, "password")}
                                value={password} />
                            </div>
                            {account && account.loginLoading === true ? <Spinner color="primary" /> : (
                              <input type="submit" onClick={() => this.handleSubmit()} className="btnRegister"  value="Login Now"/>
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

export default Login;
