'use strict';

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import {Row, Col, Grid} from 'react-bootstrap';
import styled from 'styled-components';


class CampaignPage extends Component {

    constructor(props) {
        super(props);
    }
    

    render() {
        return(<h1>this is the campaign page</h1>);
    }

}



export default withRouter(CampaignPage);