'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {Row,Col, Table, Button, Container} from 'reactstrap';
import { loggedInUser } from '../actions/userActions'
import Header from './Header'


class CampaignProfile extends Component {

    constructor(props) {
        super(props);
        
        this.state= {
            user: []
        }
    }

    componentDidMount () {
      this.props.loggedInUser()
    }

    render() {
      console.log('hello')
        const startCampaignButton =
        (<Button onClick={this.props.navigateToCreate} color="primary">Start New Campaign</Button>);

        return(
            <Container>
                <Header user={{}} />
                <Row>
                    <Col xs={12}><h4>User Profile</h4> </Col>
                </Row>

                <Row>
                    <Col xs={2}>
                        <p><b>Address</b></p>
                        <p><b>Name</b></p>

                    </Col>
                    <Col xs={10}>
                        <p>{this.state.address}</p>
                        <p>{sessionStorage.getItem('name')}</p>
                    </Col>

                </Row>

                <Row>
                    <Col xs={12}>
                        {startCampaignButton}
                    </Col>
                </Row>

                <Row>
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
            </Container>

        )
    }

}


const mapStatetoProps = (state) => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loggedInUser: () => dispatch(loggedInUser()),
    navigateToCreate: () => dispatch(push('/create'))
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(CampaignProfile)
