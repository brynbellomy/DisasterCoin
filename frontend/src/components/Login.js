import React, {Component} from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import axios from 'axios';
import {Button, Row, Col} from 'react-bootstrap'
import { Connect } from 'uport-connect'


class CampaignLogin extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        const uport = new Connect(`Phil's Campaign Dapp`);

        uport.requestCredentials().then( (credentials)=>{
            console.log(credentials);
            sessionStorage.setItem('address',credentials.address);
            sessionStorage.setItem('name', credentials.name);
            sessionStorage.setItem('isLoggedIn','true');
            console.log(sessionStorage.getItem('address'));
            this.props.navigateToProfile(credentials.address)
        }).catch( ()=>{})

    }

    render() {
     return (<div></div>);
    }


}

const mapDispatchToProps = (dispatch) => {
  return {
    navigateToProfile: (address) => dispatch(push(`/profile/${address}`))
  }
}

export default connect(null, mapDispatchToProps)(CampaignLogin)
