/* Copyright G. Hemingway, 2017 - All rights reserved */
'use strict';

import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {GravHash} from './header';
import {Col, Row, Table,Button} from 'react-bootstrap';
import axios from 'axios';
/*************************************************************************/

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            first_name: '',
            last_name: '',
            city: '',
            primary_email: '',
            game_count: null,
            games: []
        }


    }
    componentDidMount() {
        // console.log(this.props.user);
        axios
            .get(`/v1/user/${this.props.user}`)
            .then(res => {
                if(res.status==200){
                console.log(res);
                this.setState((state) => ({
                    username: res.data.username,
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    city: res.data.city,
                    primary_email: res.data.primary_email,
                    game_count: res.data.games.length,
                    games: state.games.concat(res.data.games)
                }));
                console.log(this.state.games);} 
            }).catch(() => {let errorEl = document.getElementById('errorMsg');
            errorEl.innerHTML = `Error: ${res}`;})
    }

    render() {
    const startLink = sessionStorage.getItem('username')==this.state.username && sessionStorage.getItem('isLoggedIn')=='true' ? (<Link to="/start">Start new game</Link>) : (<div></div>);
    const myButton= sessionStorage.getItem('username')==this.state.username ? (<Button onClick={()=>this.props.history.push(`/edit/`)}>Edit Profile</Button>) : (<div></div>);
      const Rows = this.state.games.map((elem, index) => {
                return (
                    <tr key={index}>
                        <td> {elem.active? (<Link to={`/game/${elem.id}`}>Active</Link>): 'No'}</td>
                        <td>{Date(elem.start)}</td>
                        <td>{elem.moves}</td>
                        <td>{elem.score}</td>
                        <td>{elem.game}</td>
                    </tr>
                )
            }); 
        return (
            <div>
                <Row>
                <div className="center-block">
                        <p id="errorMsg" className="bg-danger"></p>
                    </div>
                    <Col xs={2}><h4>Player Profile</h4> </Col>
                    <Col xs={8}>
                        <Row>
                            <Col xs={1}> <img src={ this.props.user == sessionStorage.getItem('username') ? sessionStorage.getItem('gravHash') : 'https://gravatar.com/avatar/008a6815971c21022090fdcc33511165?size=100' }/></Col>
                            <Col xs={11}>
                                <Col xs={6} className="text-right">
                                    <p><b>Username:</b></p>
                                    <p><b>First Name:</b></p>
                                    <p><b>Last Name:</b></p>
                                    <p><b>City:</b></p>
                                    <p><b>Email Address:</b></p>
                                    {myButton}
                                </Col>
                                <Col xs={6}>
                                    <p>{this.state.username}</p>
                                    <p>{this.state.first_name}</p>
                                    <p>{this.state.last_name}</p>
                                    <p>{this.state.city}</p>
                                    <p>{this.state.primary_email}</p>
                                </Col>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <h4>Games Played ({this.state.game_count})</h4>
                                {startLink}
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
                                       {Rows}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>);
    }
}
export default withRouter(Profile);