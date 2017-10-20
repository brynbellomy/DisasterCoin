'use strict';

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Button, Form} from 'reactstrap'
import Header from './Header'
import * as contracts from '../contracts'


class CampaignStart extends Component {

    constructor(props) {
        super(props);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            date: new Date().toISOString()
        }
    }

    onDateChange = (value) => {
        this.setState({date: value});
        console.log(value);
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const goalAmount = parseInt(this._inputGoalAmount.value, 10)
        const weiLimitPerBlock = parseInt(this._inputWeiLimitPerBlock.value, 10)
        const deadline = parseInt(this._inputDeadline.value, 10)
        const owner = sessionStorage.getItem('address')

        const campaignHub = await contracts.CampaignHub.deployed()
        campaignHub.addCampaign('ipfs hash', goalAmount, weiLimitPerBlock, deadline, owner, {from: owner})
    }


    render() {
        return(
            <div>
                <div>Goal amount: <input ref={x => this._inputGoalAmount = x} /></div>
                <div>Wei limit per block: <input ref={x => this._inputWeiLimitPerBlock = x} /></div>
                <div>Deadline: <input ref={x => this._inputDeadline = x} /></div>
                <div>Owner: <input ref={x => this._inputOwner = x} /></div>
                <button onClick={this.handleSubmit}>Create</button>

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
