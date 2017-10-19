'use strict';

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import {Row, Col, Table} from 'react-bootstrap';
import styled from 'styled-components';


class CampaignProfile extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>
                <Row>
                    <Col xs={2} xsOffset={1}><h4> CampaignProfile</h4> </Col>
                    <Col xs={8}>
                        <Row>
                            <Col xs={1}> </Col>
                            <Col xs={11}>
                                <Col xs={6} className="text-right">
                                    <p><b>Username:</b></p>
                                    <p><b>First Name:</b></p>
                                    <p><b>Last Name:</b></p>
                                    <p><b>City:</b></p>
                                    <p><b>Email Address:</b></p>
                                   
                                </Col>
                                <Col xs={6}>
                                    <p>hey</p>
                                    <p>phil</p>
                                    <p>is</p>
                                    <p>super</p>
                                    <p>cool</p>
                                </Col>
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