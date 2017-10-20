
import React, { Component } from 'react'
import md5 from 'md5'
import * as _ from 'lodash'


//react bootstrap stuff
// import {Navbar, Nav, NavDropdown, NavItem, MenuItem, Image} from 'react-bootstrap';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap'
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
  }

  componentWillMount() {
    if(this.props.logout) {
      sessionStorage.clear()
    }
  }


  render() {
    const noUser = !_.isEmpty(this.props.user)
    console.log(this.props.user)
    console.log(_.isEmpty(this.props.user))
    return (
      <Navbar color="faded" light>
        <NavbarBrand href={'/'}><h2>Disaster Coin</h2></NavbarBrand>
        <Nav className='ml-auto' navbar>
          <NavItem>
            <NavLink href={noUser ? '/logout' : '/login'}> {noUser ? 'Logout' : 'Login'}</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

// const NavLinks = () => {
//   if(sessionStorage.getItem('isLoggedIn')=='true') {
//     const newLogout = { pathname: "/campaignLogout/", logout: true}
//     return (<Nav pullRight><NavItem eventKey={1} ><Link to={newLogout}>Log Out</Link></NavItem></Nav>);
//   } else {
//     return (<Nav pullRight><NavItem eventKey={1}><Link to={`/campaignLogin/`} >Log In</Link></NavItem></Nav>);
//   }
// }
// return (<Navbar staticTop={true} bsStyle="default" >
//   <Navbar.Header>
//     <Navbar.Brand>
//       Disaster Coin
//     </Navbar.Brand>
//       <NavLinks />
//   </Navbar.Header>
// </Navbar>);

export default Header
