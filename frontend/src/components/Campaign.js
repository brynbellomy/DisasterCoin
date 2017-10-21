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
            campaign: {}
        }
    }

    componentDidMount() {
        this.props.fetchCampaign('123')
    }


    render() {
        return (
            <div>
                <Row>
                    <Col xs={3} >
                        <p><b> Name: </b></p>
                        <p><b> Description: </b></p>
                        <p><b> Deadline: </b></p>
                        <p><b> Withdraw Limit: </b></p>
                    </Col>
                    <Col xs={4}>
                        <p>{this.state.campaign.name}</p>
                        <p>{this.state.campaign.description}</p>
                        <p>{this.state.campaign.deadline}</p>
                        <p>{this.state.campaign.withdraw}</p>
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
                </Row>
            </div>
        )
    }
}
const mapStatetoProps = (state) => {
  return {
    campaign: state.campaign.campaign,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampaign: (address) => dispatch(fetchCampaign(address)),
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Campaign)
