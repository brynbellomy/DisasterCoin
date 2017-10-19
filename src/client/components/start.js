/* Copyright G. Hemingway, 2017 - All rights reserved */
'use strict';

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {
    Row,
    Col,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button,
    Radio,
    option,
    Input
} from 'react-bootstrap';
import qs from 'qs';
import axios from 'axios';
/*************************************************************************/

class Start extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.onSubmit = this.onSubmit.bind(this);
        this.RadioFormChange = this.RadioFormChange.bind(this);
        this.state = {
            game_type: ''
        }

    }
    componentWillMount() {
        if(sessionStorage.getItem('isLoggedIn')=="false") {
            this.props.history.push("/");
         }

    }
    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.color.value);
        console.log(this.draw.value);
        console.log(this.state.game_type);
        const data = {
            game: this.state.game_type,
            color: this.color.value
        }
        axios
            .post('/v1/game', qs.stringify(data))
            .then((res) => {
                if (res.status != 201) {
                    console.error("you screwed something up");
                } else {
                    console.log(res);
                    this.props.history.push(`/game/${res.data.id}`);
                }
            })
            .catch(() => {});

    }

    RadioFormChange = (e) => {
        // e.preventDefault();
        this.setState({game_type: e.target.value});
        console.log(e.target.value);
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={2}/>
                    <Col xs={8}>
                        <div className="center-block">
                            <p id="errorMsg" className="bg-danger"/>
                        </div>
                    </Col>
                    <h4>
                        Create New Game
                    </h4>
                    <Form horizontal onSubmit={this.onSubmit}>
                        <Col xs={3} xsOffset={1}>
                            <FormGroup controlId="type" onChange={this.RadioFormChange}>
                                <Radio name="radioGroup" ref="klondyke" value="klondyke">Klondyke</Radio>
                                <Radio name="radioGroup" ref="pyramid" value="pyramid">Pyramid</Radio>
                                <Radio name="radioGroup" ref="canfield" value="canfield">Canfield</Radio>
                                <Radio name="radioGroup" ref="golf" value="golf">Golf</Radio>
                                <Radio name="radioGroup" ref="yukon" value="yukon">Yukon</Radio>
                            </FormGroup>
                        </Col>
                        <Col xs={8}>
                            <FormGroup controlId="draw">
                                <Col xs={12}>
                                    <Col componentClass={ControlLabel}>Draw:</Col>
                                    <FormControl
                                        componentClass="select"
                                        inputRef={input => this.draw = input}
                                        onChange={this.handleDrawChange}
                                        placeholder="draw">
                                        <option value={1}>Draw 1</option>
                                        <option value={3}>Draw 3</option>
                                    </FormControl>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="color">
                                <Col xs={12}>
                                    <Col componentClass={ControlLabel}>Card Color:</Col>
                                    <FormControl componentClass="select" inputRef={input => this.color = input}>
                                        <option value="red">Red</option>
                                        <option value="green">Green</option>
                                        <option value="blue">Blue</option>
                                        <option value="magical">Magical</option>
                                    </FormControl>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="submit">
                                <Button type="submit">Start</Button>
                            </FormGroup>
                        </Col>
                    </Form>
                </Row>
            </div>
        )
    }

}

export default withRouter(Start);
