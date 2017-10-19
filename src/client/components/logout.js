/* Copyright G. Hemingway, 2017 - All rights reserved */
'use strict';


import React, { Component }     from 'react';
import { withRouter }           from 'react-router-dom';

/*************************************************************************/

export class Logout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(<h1>you have successfully logged out</h1>)
    }


}

export default withRouter(Logout);
