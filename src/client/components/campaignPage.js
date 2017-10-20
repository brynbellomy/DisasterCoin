'use strict';

import React, {Component} from 'react';
import {withRouter} from 'react-router';
// import axios from 'axios';
import {Button,Row, Col, Table, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';


class CampaignPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
           id: this.props.id,
           name: '',
           description: '',
           deadline: '',
           limit: '',
           totalAmount: 10,
           owner: '',
           withdrawAmount: '',
           withdrawAddress: '',

       }
    //    this.refHandler = this.refHandler.bind(this)
    }
    // refHandler (input, key) {
    //     this.setState({[key]: input})
    // }
    componentWillMount() {
        // axios.get(`/v1/campaign/${this.state.id}`)
        //     .then( res => {
        //         console.log(res);
        //         this.setState({
        //             name: res.data.name,
        //             description: res.data.description,
        //             deadline: res.data.deadline,
        //             limit: res.data.limit,
        //             owner: res.data.owner
        //         });
        //         console.log(this.state);
        //         //TODO-eth
        //         //get account balance from address for totalAmount
        //     }).catch( ()=> {});
    }
    componentWillReceiveProps(props) {
        console.log('nextprops', props)
    }

    handleWithdrawSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    }

    handleContributeSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    }


    render() {
        console.log('owner', this.state.owner)
        console.log('session', sessionStorage.getItem('address'))
        console.log(this.state.owner === sessionStorage.getItem('address'))
        let wProps = {}
        const WithdrawButton = (<div><Form horizontal>
            <Row>
            <ControlLabel>Withdraw Funds</ControlLabel></Row>
            <FormGroup controlId="withdraw">
                <Col componentClass={ControlLabel} sm={2}>Address</Col>
                <Col xs={4}>
                <FormControl
                    type="text"
                    placeholder="0xF4D8e706CfB25c0DECBbDd4D2E2Cc10C66376a3F"
                    inputRef={input => this.withdrawAddress = input }
                />
                </Col>
            </FormGroup>
            <FormGroup controlId="amount">
                <Col componentClass={ControlLabel} sm={2}>Amount</Col>
                <Col xs={4}>
                <FormControl
                    type="text"
                    placeholder="ether"
                    inputRef={input => this.withdrawAmount = input}
                />
                </Col>
            </FormGroup>
            <FormGroup controlId="submit">
                <Col smOffset={2} sm={10}>
                    <Button onClick={()=> console.log(true)}>Withdraw!</Button>
                </Col>
            </FormGroup>
        </Form></div>)

        const ContributeButton = (<div><Form horizontal>
            <Row><ControlLabel>Contribute Funds</ControlLabel></Row>
            <FormGroup controlId="amount">
                <Col componentClass={ControlLabel} sm={2}>Amount</Col>
                <Col xs={4}>
                <FormControl
                    type="text"
                    placeholder="ether"
                    inputRef={ input=> this.contributeAmount = input}
                />
                </Col>
            </FormGroup>
            <FormGroup controlId="submit">
                <Col smOffset={2} sm={10}>
                    <Button onClick={this.handleContributeSubmit}>Contribute!</Button>
                </Col>
            </FormGroup>
        </Form></div>)
        return(<div>
            <Row>
            <Col xs={2}><h3>{this.state.name}</h3></Col>
            <Col xs={10}/></Row>
            <Row>
                <Col xs={3} >
                    <p><b> Description: </b></p>
                    <p><b> Deadline: </b></p>
                    <p><b> Total Amount Fundraised: </b></p>
                    <p><b> Withdraw Limit: </b></p>
                </Col>
                <Col xs={4}>
                    <p>{this.state.description}</p>
                    <p>{this.state.deadline}</p>
                    <p>{this.state.totalAmount}</p>
                    <p>{this.state.limit}</p>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                <Table striped>
                    <thead>
                        <tr>
                            <th>txHash</th>
                            <th>from</th>
                            <th> amount </th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                    </Table>
                    </Col>
                <Col xs={6}>
                   <WithdrawButton {...wProps} />
                </Col>
                </Row>
            </div>);
    }
}


export default withRouter(CampaignPage);
