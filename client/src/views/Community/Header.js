import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from 'reactstrap';
import Logo from "../../assets/img/brand/ojirehprime_logo.png";
// import Avarta from "../../assets/img/user-avatar.png";
import { Avatar } from "antd";
import { logout } from "../../store/actions/actions_account";
import Auth from '../../helper/LocalStorageAuth';
import { localStorageAuth } from '../../helper/authenticate';

const BASE_URL = process.env.REACT_APP_API_URL;

const Header = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  const onLogout = () => {
    Auth.deauthenticateUser();
    dispatch(logout());
    window.location.href = "/";
  }

  const userId = localStorageAuth().user  && localStorageAuth().user._id;
  const token = localStorageAuth().token && localStorageAuth().token;
  const username = localStorageAuth().user && localStorageAuth().user.fullname;
  
  return (
    <div>
      <Navbar color="dark" className="p-0 home-header" dark expand="md">
        <Container>
        <NavbarBrand href="/">
          <img src={Logo} alt="site logo" style={{
            width: 50,
          }}/>
        </NavbarBrand>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/" style={{ color: "#fff"}}>Ojirehprime</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        {token ? `Signed in as ${username}` : (
          <>
            <NavLink
              href="/community_login"
              style={{ color: "#fff", fontSize: 14 }}
            >
              LOGIN
            </NavLink>
            <NavLink
              href="/community_signup"
              style={{ color: "#fff", fontSize: 14 }}
            >
              SIGN UP
            </NavLink>
          </>
        )}
        {!token ? null : (
          <UncontrolledDropdown direction="down">
            <DropdownToggle nav>
              <Avatar src={`${BASE_URL}/community/photo/${userId}`}
                size={40}
              />
            </DropdownToggle>
            <DropdownMenu>
            <NavLink
              href="/community_profile"
            >
              PROFILE
            </NavLink>
              <DropdownItem onClick={() => onLogout()}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )}
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
