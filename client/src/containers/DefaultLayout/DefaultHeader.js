import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import {isAuthenticated } from "../../helper/authenticate";
import PropTypes from 'prop-types';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/ojirehprime_logo.png';
import sygnet from '../../assets/img/brand/ojirehprime_logo.png';
import Auth from "../../helper/Auth";
import { logout } from "../../store/actions/actions_account";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const DefaultHeader = ()=> {
  const dispatch = useDispatch();
  const handleLogout = () => {
    Auth.deauthenticateUser();
    dispatch(logout());
    window.location.href = "/";
  }

  const userId = isAuthenticated().user && isAuthenticated().user._id;
  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{ src: logo, width: 40, height: 25, alt: 'CoreUI Logo' }}
        minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />

      <Nav className="d-md-down-none" navbar>
        <NavItem className="px-3">
          <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
        </NavItem>
        <NavItem className="px-3">
          <Link to="/users" className="nav-link">Users</Link>
        </NavItem>
        <NavItem className="px-3">
          <NavLink to="#" className="nav-link">Settings</NavLink>
        </NavItem>
      </Nav>
      <Nav className="ml-auto" navbar>
        <NavItem className="d-md-down-none">
          <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
        </NavItem>
        <NavItem className="d-md-down-none">
        </NavItem>
        <NavItem className="d-md-down-none">
          <span>{isAuthenticated().user && isAuthenticated().user.firstName}</span>
        </NavItem>
        <UncontrolledDropdown nav direction="down">
          <DropdownToggle nav>
            <img src={`/api/v1/profile/photo/${userId}`} className="img-avatar" alt="user avatar" />
          </DropdownToggle>
          <DropdownMenu left="true">
            <DropdownItem onClick={() => handleLogout()}><i className="fa fa-lock"></i> Logout</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <NavItem className="d-md-down-none">
        </NavItem>
      </Nav>
    </React.Fragment>
  );

}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
