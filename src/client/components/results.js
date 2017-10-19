/* Copyright G. Hemingway, 2017 - All rights reserved */
'use strict';

import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Row, Col, Table} from 'react-bootstrap';
import axios from 'axios';
/*************************************************************************/

class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            duration: '',
            num_moves: '',
            points: 0,
            cards_remaining: '',
            able: null
        }
    }

    componentDidMount() {
        axios
            .get(`/v1/game/${this.props.id}`)
            .then(res => {
                if(res.status==200){
                let dur = Date.now() - res.data.startTime;
                this.setState({duration: dur, num_moves: res.data.moves.length, cards_remaining: res.data.cards_remaining, points: res.data.score, able: res.data.active});
                } else {
                    let errorEl = document.getElementById('errorMsg');
                    errorEl.innerHTML = `Error: ${res}`;
                }
            })
            .catch(() => {});
    }
    render() {

        return (
            <div>
                <Row>
                    <div className="center-block">
                        <p id="errorMsg" className="bg-danger"></p>
                    </div>
                    <Col xs={2}>
                        <h4>Game Detail</h4>
                    </Col>
                    <Col xs={10}>
                        <Row>
                            <Col xs={3} className="text-right">
                                <p>
                                    <b>Duration:</b>
                                </p>
                                <p>
                                    <b>Number of Moves:</b>
                                </p>
                                <p>
                                    <b>Points:</b>
                                </p>
                                <p>
                                    <b>Cards Remaining:</b>
                                </p>
                                <p>
                                    <b>Able to Move:</b>
                                </p>
                            </Col>
                            <Col xs={6}>
                                <p>{this.state.duration}</p>
                                <p>{this.state.num_moves}
                                </p>
                                <p>{this.state.points}
                                </p>
                                <p>{this.state.cards_remaining}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Duration</th>
                                            <th>Player</th>
                                            <th>Move Details</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

        )
    }

}

export default withRouter(Results);
