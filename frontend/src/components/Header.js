import React, { Component } from 'react'
import md5 from 'md5'
import * as _ from 'lodash'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
//react bootstrap stuff
// import {Navbar, Nav, NavDropdown, NavItem, MenuItem, Image} from 'react-bootstrap';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap'
import { Connect } from 'uport-connect'
import { loginUser } from '../actions/userActions'
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
    this.loginHandler = this.loginHandler.bind(this)
  }

  componentWillMount() {
    if(this.props.logout) {
      sessionStorage.clear()
    }
  }
  loginHandler () {
    const uport = new Connect(`Phil's Campaign Dapp`);

    uport.requestCredentials(

    ).then((credentials)=>{
        // console.log(credentials)
        // console.log(sessionStorage.getItem('address'))
        this.props.loginUser(credentials)
    }).catch(() => {})
  }

  render() {
    const noUser = !_.isEmpty(this.props.user)
    return (
      <Navbar color="faded" style={{backgroundColor: 'black'}} light>
        <NavbarBrand href={'/'}><h2 style={{color: 'white'}}>Re:Cover</h2></NavbarBrand>
        <Nav className='ml-auto' navbar style={{display: 'flex', flexDirection: 'row'}}>
          <NavItem>
            <NavLink style={{color: 'white', paddingRight: 6, paddingLeft: 6}} href={'/campaigns'}>Campaigns</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.loginHandler} style={{paddingRight: 6, paddingLeft: 6, color: 'white'}}> {noUser ? 'Logout' : 'Login'}</NavLink>
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
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (credentials) => dispatch(loginUser(credentials))
  }
}

export default connect(null, mapDispatchToProps)(Header)
