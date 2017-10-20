'use strict';

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Form, FormGroup, Input,Label, Button, Container} from 'reactstrap';
import styled from 'styled-components';
// import axios from 'axios';
import qs    from 'qs';


class Start extends Component {

    constructor(props) {
        super(props);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state= {
            date: new Date().toISOString()
        }
    }

    onDateChange = (value) => {
        this.setState({date: value});
        console.log(value);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log(e);
        console.log(this.name.value);
        console.log(this.deadline.value);
        let d = this.deadline.value;
        let date = d.split("-");
        let f = new Date(date[0], date[1] -1, date[2])
        f = f.getTime();

    }


    render() {
        return(
            <Container>
            <Col xs={2}/>
            <Col xs={8}>
                <Form>
                    <FormGroup row>
                        <Label for="name" sm={2}>Name of Campaign:</Label>
                        <Col sm={10}>
                            <Input innerRef={ (input)=>this.name = input } type="text" name="name" id="name" placeholder="name of campaign"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="description" sm={2}>Description</Label>
                        <Col sm={10}>
                           <Input  innerRef={ (input)=>this.description = input } type="textarea" name="description" id="description" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Label for="deadline" sm={2}>Deadline</Label>
                        <Col sm={10}>
                        <Input innerRef={ (input)=>this.deadline = input } type="date" name="deadline" id="deadline" placeholder="Deadline" />
                        </Col>
                     </FormGroup>
                     <FormGroup row>
                     <Label for="withdraw" sm={2}>Withdraw Limit</Label>
                     <Col sm={9}>
                         <Input  innerRef={ (input)=>this.withdraw = input } type="text" name="withdraw" id="withdraw" placeholder="withdraw limit"/>
                     </Col>
                    <Col sm={1}><div><h6>eth/block</h6></div></Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2}/>
                        <Col sm={10}>
                            <Button onClick={this.handleSubmit} type="submit">
                                    Start Campaign
                                </Button>
                        </Col>
                     </FormGroup>
                        </Form>
                    </Col>
                    </Container>
        );
    }

}

export default Start
