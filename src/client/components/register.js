/* Copyright G. Hemingway, 2017 - All rights reserved */
'use strict';

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {
    Form,
    Col,
    FormGroup,
    Button,
    FormControl,
    ControlLabel
} from 'react-bootstrap';
import axios from 'axios';
import qs from 'qs';
/*************************************************************************/

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleSubmitClick = this
            .handleSubmitClick
            .bind(this);
    }

    handleSubmitClick = (e) => {
        e.preventDefault();
        console.log(this.user.value);
        console.log(this.password.value);
        const data = {
            username: this.user.value,
            password: this.password.value,
            first_name: this.first_name.value,
            last_name: this.last_name.value,
            city: this.city.value,
            primary_email: this.primary_email.value
        }
        axios.post(`/v1/user`, qs.stringify(data))
        .then((res) => {
                if(res.status==201){
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('username', res.data.username);
                sessionStorage.setItem('primary_email', res.data.primary_email);
                console.log(sessionStorage);
                this.props.history.push(`profile/${data.username}`);
                } else {
                        let errorEl = document.getElementById('errorMsg');
                        errorEl.innerHTML = `Error: ${res}`;
                }
        }).catch( ()=>{
            console.log("an error occured");
        });
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
                                    inputRef={input => this.user = input}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="first_name">
                            <Col componentClass={ControlLabel} sm={2}>First Name</Col>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    placeholder="First Name"
                                    inputRef={input => this.first_name = input}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="last_name">
                            <Col componentClass={ControlLabel} sm={2}>Last Name</Col>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    placeholder="Last Name"
                                    inputRef={input => this.last_name = input}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="city">
                            <Col componentClass={ControlLabel} sm={2}>City</Col>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    placeholder="City"
                                    inputRef={input => this.city = input}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="primary_email">
                            <Col componentClass={ControlLabel} sm={2}>Primary Email</Col>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    placeholder="Primary Email"
                                    inputRef={input => this.primary_email = input}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="password">
                            <Col componentClass={ControlLabel} sm={2}>Password</Col>
                            <Col sm={10}>
                                <FormControl
                                    type="password"
                                    placeholder="Password"
                                    inputRef={input => this.password = input}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="submit">
                            <Col smOffset={2} sm={10}>
                                <Button onClick={this.handleSubmitClick} type="submit">
                                    Register
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>

            </div>
        )
    }
}

export default withRouter(Register);
