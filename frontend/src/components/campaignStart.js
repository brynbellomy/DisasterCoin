'use strict';

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Form, FormGroup, Input,Label, Button, Container} from 'reactstrap';
import styled from 'styled-components';
import axios from 'axios';
import qs    from 'qs';


class CampaignStart extends Component {

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
        console.log(sessionStorage.getItem('address'));
        const data = {
            name: this.name.value,
            description: this.description.value,
            deadline: Date.parse(this.state.date),
            limit: this.limit.value,
            owner: sessionStorage.getItem('address')
        }
        axios.post("/v1/campaign", qs.stringify(data))
            .then( (res)=> {
                console.log(res);
                this.props.history.push(`/campaignPage/${res.data.id}`);
            });
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
                            <Input type="text" name="name" id="name" placeholder="name of campaign"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="description" sm={2}>Description</Label>
                        <Col sm={10}>
                           <Input type="textarea" name="description" id="description" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Label for="deadline" sm={2}>Deadline</Label>
                        <Col sm={10}>
                        <Input type="date" name="deadline" id="deadline" placeholder="Deadline" />
                        </Col>
                     </FormGroup>
                     <FormGroup row>
                     <Label for="withdraw" sm={2}>Withdraw Limit</Label>
                     <Col sm={9}>
                         <Input type="text" name="withdraw" id="withdraw" placeholder="name of campaign"/>
                     </Col>
                    <Col sm={1}><div><h6>eth/block</h6></div></Col>
                    </FormGroup>
                            <FormGroup controlId="submit">
                                <Col smOffset={2} sm={10}>
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

/*
            <div>
                <Col xs={2}/>
                <Col xs={8}>
                    <Form horizontal>
                        <FormGroup controlId="name">
                            <Col componentClass={ControlLabel} sm={2}>Name of Campaign:</Col>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    placeholder="Name of Campaign"
                                    inputRef={input => this.name = input}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="description">
                            <Col componentClass={ControlLabel} sm={2}>Description</Col>
                            <Col sm={10}>
                                <FormControl
                                    componentClass="textarea"
                                    placeholder="Description"
                                    inputRef={input => this.description = input}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="deadline">
                        <Col componentClass={ControlLabel} sm={2}> Choose Deadline</Col>
                            <Col sm={10}>
                            
                                </Col>
                                </FormGroup>
                                <FormGroup controlId="withdraw_limit">
                                    <Col componentClass={ControlLabel} sm={2}> Withdraw Limit</Col>
                                    <Col sm={9}>
                                        <FormControl
                                            type="text"
                                            placeholder="max withdraw limit per block"
                                            inputRef={input => this.limit = input}
                                            />
                                    </Col>
                                    <Col sm={1} componentClass={ControlLabel}>eth/block</Col>
                                </FormGroup>
                                <FormGroup controlId="submit">
                                    <Col smOffset={2} sm={10}>
                                        <Button onClick={this.handleSubmit} type="submit">
                                            Start Campaign
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Col>
                        </div>
    */

export default CampaignStart
