/* Copyright G. Hemingway, 2017 - All rights reserved */
'use strict';

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {
    Form,
    FormGroup,
    Col,
    FormControl,
    ControlLabel,
    Button
} from 'react-bootstrap';
import axios from 'axios';
import qs from 'qs';
/*************************************************************************/

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitClick = this
            .handleSubmitClick
            .bind(this);
    };

    handleSubmitClick = (e) => {
        console.log(e);
        e.preventDefault();
        const data = {
            username: this.userInput.value,
            password: this.passInput.value
        }
        axios
            .post("/v1/session", qs.stringify(data))
            .then((res) => {
                if(res.status==201){
                console.log(res);
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('username', res.data.username);
                sessionStorage.setItem('primary_email', res.data.primary_email);
                console.log(sessionStorage);
                this.props.history.push(`profile/${data.username}`);
                } else {
                    let errorEl = document.getElementById('errorMsg');
                    errorEl.innerHTML = `Error: ${res}`;
                }
            })
            .catch(() => {
                console.log("Error ocurred during ajax call ");
            })
    }
    render() {
        return (
            <div>
                <Col xs={2}/>
                <Col xs={8}>
                    <div className="center-block">
                        <p id="errorMsg" className="bg-danger"></p>
                    </div>
                    <Form horizontal>
                        <FormGroup controlId="username">
                            <Col componentClass={ControlLabel} sm={2}>Username</Col>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    placeholder="Username"
                                    inputRef={input => this.userInput = input}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="password">
                            <Col componentClass={ControlLabel} sm={2}>
                                Password
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type="password"
                                    placeholder="Password"
                                    inputRef={input => this.passInput = input}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button type="submit" onClick={this.handleSubmitClick}>
                                    Log In
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </div>
        )
    }
}

export default withRouter(Login);