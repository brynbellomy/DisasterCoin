import React, {Component} from 'react';
import {withRouter} from 'react-router';
// import axios from 'axios';
import {Button,Row, Col} from 'react-bootstrap';
import { Connect } from 'uport-connect';
import Header from './Header'


class CampaignLogout extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        sessionStorage.clear();
        this.props.history.push("/");

    }

    render() {
     return (<div>
       <Header user={{}} />
       <h1> You have been successfully logged out</h1>
     </div>)
    }


}




export default CampaignLogout
