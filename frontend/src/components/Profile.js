'use strict';

import React, {Component} from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import {Row,Col, Table, Button, Container} from 'reactstrap';
import { fetchCreatedCampaigns, fetchDonatedCampaigns } from '../actions/userCampaignActions'
import Header from './Header'


class CampaignProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            createdCampaigns: [],
            donatedCampaigns: []
        }
    }
    // need to pass user info to fetchCreatedCampaigns & fetchDonatedCampaigns
    componentDidMount () {
        this.props.fetchCreatedCampaigns(sessionStorage.getItem('address'))
        //this.props.fetchCreatedCampaigns(sessionStorage.getItem('ethAddress'))
    }

    render() {

        return(
            <Container style={{marginTop: 30}}>
                <Row>
                    <Col xs={12}><h4>User Profile</h4> </Col>
                </Row>

                <Row>
                    <Col xs={2}>
                        <p><b>Address</b></p>
                        <p><b>Name</b></p>

                    </Col>
                    <Col xs={10}>
                        <p>{sessionStorage.getItem('address')}</p>
                        <p>{sessionStorage.getItem('name')}</p>
                    </Col>

                </Row>

                <Row style={{marginTop: 30}}>
                    <Col xs={12}>
                        {<Button onClick={() => this.props.navigateToCreate()} color="primary">Start New Campaign</Button>}
                        {<Button onClick={() => true} color='info' style={{marginLeft: 30}}>Request Loan</Button>}
                    </Col>
                </Row>

                <Row style={{marginTop: 30}}>
                    <Col xs={6}>
                        <h4>Campaigns Created</h4>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Amount Fundraised</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </Table>
                    </Col>

                    <Col xs={6}>
                        <h4>Campaigns Donated</h4>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Amount Donated</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row style={{marginTop: 30}}>
                    <Col xs={6}>
                        <h4>Loans Taken</h4>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Amount Borrowed</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </Table>
                    </Col>

                    <Col xs={6}>
                        <h4>Loans Funded</h4>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Amount Credited</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

        )
    }

}

const mapStatetoProps = (state) => {
  return {
    createdCampaigns: state.createdCampaigns.createdCampaigns,
    donatedCampaigns: state.donatedCampaigns.donatedCampaigns
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCreatedCampaigns: (address) => dispatch(fetchCreatedCampaigns(address)),
    fetchDonatedCampaigns: (ethAddress) => dispatch(fetchDonatedCampaigns(ethAddress)),
    navigateToCreate: () => dispatch(push('/create'))
  }
}

export default connect(null, mapDispatchToProps)(CampaignProfile)
