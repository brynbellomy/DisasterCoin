import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Button,Row, Col} from 'reactstrap';
import styled from 'styled-components';
import { Connect } from 'uport-connect';


class CampaignLogout extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        sessionStorage.clear();
        this.props.history.push("/");

    }

    render() {
     return (<h1> You have been successfully logged out</h1>)
    }


}




export default CampaignLogout
