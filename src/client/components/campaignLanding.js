import React, {Component} from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import {Button,Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import { Connect } from 'uport-connect';


class CampaignLanding extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        axios.get('/v1/campaigns')
            .then( (res)=>{
                console.log(res);
            });

    }


    render() {
        return (<h1> this is the landing page</h1>);
    }

}

export default withRouter(CampaignLanding);