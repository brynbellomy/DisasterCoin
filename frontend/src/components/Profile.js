'use strict';

import React, {Component} from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import {Row,Col, Table, Button, Container} from 'reactstrap';
import { fetchCreatedCampaigns, fetchDonatedCampaigns } from '../actions/userCampaignActions'
import Header from './Header'
import * as _ from 'lodash'


class CampaignProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            createdCampaigns: [],
            donatedCampaigns: [],
            balance: ''
        }
    }
    // need to pass user info to fetchCreatedCampaigns & fetchDonatedCampaigns
    componentDidMount () {
       // this.props.fetchCreatedCampaigns(sessionStorage.getItem('address'))
        //this.props.fetchCreatedCampaigns(sessionStorage.getItem('ethAddress'))
    }

    componentWillMount() {
        // address is this.params.match.id
        let userArr = JSON.parse(sessionStorage.getItem('users'))
        let user = _.find(userArr.users, {uAddr: this.props.match.params.address})
        
        let eAddr = user.eAddr
        let campaignArr = JSON.parse(sessionStorage.getItem('campaigns'))
        const createdCampaigns = campaignArr.campaigns.filter(
            campaign => campaign.eAddr === eAddr
        ) 
        this.setState({ createdCampaigns: [...this.state.createdCampaigns, ...createdCampaigns],
                        balance: user.balance})
    }

    render() {
        let createdCampaigns = this.state.createdCampaigns.map( (campaign,index)=>{
             return(  <tr key={index}>
                    <td> {campaign.name} </td>
                    <td> {campaign.balance} </td>
                </tr>)
            })
        

        return(
            <Container style={{marginTop: 30}}>
                <Row>
                    <Col xs={12}><h4>User Profile</h4> </Col>
                </Row>

                <Row>
                    <Col xs={2}>
                        <p><b>Address</b></p>
                        <p><b>Name</b></p>
                        <p><b>Balance</b></p>

                    </Col>
                    <Col xs={10}>
                        <p>{sessionStorage.getItem('address')}</p>
                        <p>{sessionStorage.getItem('name')}</p>
                        <p>{this.state.balance}</p>
                    </Col>

                </Row>

                <Row style={{marginTop: 30}}>
                    <Col xs={12}>
                        {<Button onClick={() => this.props.navigateToCreate()} color="primary">Start New Campaign</Button>}
                        {<Button onClick={() => this.props.navigateToLoans()} color='info' style={{marginLeft: 30}}>Request Loan</Button>}
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
                                {createdCampaigns}
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
    navigateToCreate: () => dispatch(push('/create')),
    navigateToLoans: () => dispatch(push('/loans'))
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(CampaignProfile)
