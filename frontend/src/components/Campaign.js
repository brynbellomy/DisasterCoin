'use strict';

import React, {Component} from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Row, Col, Table, Button, Container, Input, FormGroup, Label, Form} from 'reactstrap';
import { fetchCampaign, donateCampaign, withdrawCampaign } from '../actions/campaignActions'
import Header from './Header'

class Campaign extends Component {

    constructor(props) {
        super(props);

        this.state = {
            campaign: props.campaign,
        }

        this.handleDonate = this.handleDonate.bind(this)
        this.handleWithdraw = this.handleWithdraw.bind(this)
    }

    componentWillMount () {
        this.props.fetchCampaign(this.props.match.params.id)
    }

    handleDonate (e) {
        // e.preventDefault()
        console.log('address', this.props.campaign.address)
        console.log('value', this.amount.value)
        this.props.donateCampaign({address: this.props.campaign.address, amount: this.amount.value})
    }

    handleWithdraw (e) {
        // e.preventDefault()
        // console.log('hello')
        this.props.withdrawCampaign({address: this.props.campaign.address, withdrawAddress: this.address.value, amount: this.amount.value, tag: this.tag.value})
    }

    render() {
      console.log(this.props.campaign)
        const DonateButton = () => (
            <div>
                <Form>
                    <FormGroup row>
                        <Label for="amount" sm={3}>Amount (wei):</Label>
                        <Col sm={4}>
                        <Input
                            getRef={(input)=>this.amount= input}
                            type="text"
                            placeholder="wei"
                        />
                        </Col>
                    </FormGroup>
                <Row>
                    <Col sm={2}>
                        <Button onClick={this.handleDonate}>Contribute Funds!</Button>
                    </Col>
                </Row>
                </Form>
            </div>
        )

        const WithdrawButton = () => (
            <div>
                <Form>
                    <FormGroup row>
                        <Label for="address" sm={3}>Address:</Label>
                        <Col sm={4}>
                        <Input
                            getRef={(input)=>this.address= input}
                            type="text"
                            placeholder="0x339FDb91708eDD47D92E847206aEd92f1C275699"
                        />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="amount" sm={3}>Tag:</Label>
                        <Col sm={4}>
                        <Input
                            getRef={(input)=>this.tag= input}
                            type="text"
                            placeholder="wei"
                        />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="amount" sm={3}>Amount (wei):</Label>
                        <Col sm={4}>
                        <Input
                            getRef={(input)=>this.amount= input}
                            type="text"
                            placeholder="wei"
                        />
                        </Col>
                    </FormGroup>
                    <Row>
                        <Col sm={2}>
                            <Button onClick={this.handleWithdraw}>Withdraw Funds!</Button>
                        </Col>
                    </Row>
                    </Form>
            </div>
        )
        return (
            <Container style={{marginTop: 30}}>
                <Row>
                    <Col xs={3} >
                        <p><b> Address: </b></p>
                        <p><b> Campaigner: </b></p>
                        <p><b> Cumulative Balance: </b></p>
                        <p><b> Current Balance: </b></p>
                        <p><b> Deadline: </b></p>
                    </Col>
                    <Col xs={4}>
                        <p>{this.props.campaign ? this.props.campaign.address : null}</p>
                        <p>{this.props.campaign ? this.props.campaign.campaigner: null}</p>
                        <p>{this.props.campaign ? this.props.campaign.cumulativeBalance: null}</p>
                        <p>{this.props.campaign ? this.props.campaign.currentBalance: null}</p>
                        <p>{this.props.campaign ? this.props.campaign.deadline : null}</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={10}>
                    {this.props.campaign ? (this.props.user.ethAddress===this.props.campaign.campaigner ? <WithdrawButton />  : <DonateButton />) : null}
                    </Col>
                </Row>
            </Container>
        )
    }
}
const mapStatetoProps = (state) => {
  return {
    user: state.user.user,
    campaign: state.campaign.campaign,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampaign: (address) => dispatch(fetchCampaign(address)),
    donateCampaign: (donate) => dispatch(donateCampaign(donate)),
    withdrawCampaign: (withdraw) => dispatch(withdrawCampaign(withdraw)),
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Campaign)
