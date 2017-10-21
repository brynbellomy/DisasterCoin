'use strict';

import React, {Component} from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import {Row,Col, Table, Button, Container} from 'reactstrap';
import { fetchCampaign } from '../actions/campaignActions'
import Header from './Header'

class Campaign extends Component {

    constructor(props) {
        super(props);

        this.state = {
            campaign: {},

        }
    }

    componentWillMount () {
        this.props.fetchCampaign(this.props.match.params.id)
    }

    render() {

        console.log(this.props.user)
        return (
            <div>
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
                </Row>
            </div>
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
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Campaign)
