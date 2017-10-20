'use strict';

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Button, Form} from 'reactstrap'
// import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import Header from './Header'
// import axios from 'axios';
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
        // axios.post("/v1/campaign", qs.stringify(data))
        //     .then( (res)=> {
        //         console.log(res);
        //         this.props.history.push(`/campaignPage/${res.data.id}`);
        //     });
    }


    render() {
        return(
            <div>
                {/* <Header user={{}} />
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
                </Form> */}
            </div>
        );
    }

}



export default CampaignStart
