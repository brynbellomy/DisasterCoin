/* Copyright G. Hemingway, 2017 - All rights reserved */
'use strict';


import React, { Component }     from 'react';
import { Link, withRouter }  from 'react-router-dom';
import md5                      from 'md5';


//react bootstrap stuff
import {Navbar, Nav, NavDropdown, NavItem, MenuItem, Image} from 'react-bootstrap';
/*************************************************************************/

export function GravHash(email, size) {
    let hash = email.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    hash = hash.toLowerCase();
    hash = md5(hash);
    return `https://www.gravatar.com/avatar/${hash}?size=${size}`;
}


class Header extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentWillReceiveProps() {
    console.log("sup bitch glad u made it :P");
  }

  componentWillMount() {
    if(this.props.logout) {
      sessionStorage.clear();
    }
  }


  render() {
    
    const NavLinks = () => {
      if(sessionStorage.getItem('isLoggedIn')=='true') {
        const newLogout = { pathname: "/campaignLogout/", logout: true}
        return (<Nav pullRight><NavItem eventKey={1} ><Link to={newLogout.pathname} {...newLogout} >Log Out</Link></NavItem></Nav>);
      } else {
        return (<Nav pullRight><NavItem eventKey={1}><Link to={`/campaignLogin/`} >Log In</Link></NavItem></Nav>);
      }
    } 
  
    return (<Navbar staticTop={true} bsStyle="default" >
      <Navbar.Header>
        <Navbar.Brand>
          Disaster Coin
        </Navbar.Brand>
          <NavLinks />
      </Navbar.Header>
    </Navbar>);

  }
}

export default withRouter(Header);