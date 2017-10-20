import React, {Component} from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import {Button,Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import { Connect } from 'uport-connect';


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
            this.props.history.push(`/campaignProfile/${credentials.address}`);
        }).catch( ()=>{});
        
    }

    render() {
     return (<h1> this is a campaign page</h1>)
    }


}




export default withRouter(CampaignLogin);