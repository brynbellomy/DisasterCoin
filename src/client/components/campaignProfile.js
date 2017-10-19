'use strict';

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import {Row, Col, Table, Button} from 'react-bootstrap';
import styled from 'styled-components';


class CampaignProfile extends Component {

    constructor(props) {
        super(props);
        this.state= {
            address: this.props.address
        }
    }
    //componentDidMount
    //takes in information about the user

    render() {
        const startCampaignButton =
        (<Button onClick={()=>{this.props.history.push("/campaignStart")}}bsStyle="primary" bsSize="small">Start New Campaign</Button>);

        return(
            <div>
                <Row>
                    <Col xs={2} xsOffset={1}><h4> CampaignProfile</h4> </Col>
                    <Col xs={8}>
                        <Row>
                            <Col xs={1}> </Col>
                            <Col xs={11}>
                                <Col xs={6} className="text-right">
                                    <p><b>Address</b></p>
                                    <p><b>Name</b></p>
                                   
                                </Col>
                                <Col xs={6}>
                                    <p>{this.state.address}</p>
                                    <p>{sessionStorage.getItem('name')}</p>
                                </Col>
                            </Col>
                        </Row>
                        <Row>
                            <Col xsOffset={4} xs={12}>
                                {startCampaignButton}
                                    </Col>
                            </Row>
                        <Row>
                            <Col xs={12}>
                                <h4>Campaigns Started (0)</h4>
                            </Col>
                            <Col xs={12}>
                                <Table striped>
                                    <thead>
                                        <tr><th>Status</th>
                                        <th>Start Date</th>
                                        <th># of moves</th>
                                        <th>Score</th>
                                        <th>Game Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

        )
    }

}



export default withRouter(CampaignProfile);