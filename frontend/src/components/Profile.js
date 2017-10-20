'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
// import axios from 'axios';
//import {Row, Col, Table, Button} from 'react-bootstrap';
import {Row,Col, Table, Button, Container} from 'reactstrap';
import Header from './Header'


class CampaignProfile extends Component {

    constructor(props) {
        super(props);
        this.state= {
            address: this.props.match.params.address
        }
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

const mapDispatchToProps = (dispatch) => {
  return {
    navigateToCreate: () => dispatch(push('/create'))
  }
}

export default connect(null, mapDispatchToProps)(CampaignProfile)
