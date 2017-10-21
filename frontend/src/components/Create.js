'use strict';

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Button, Form, Container, Input, FormGroup, Label} from 'reactstrap'
import Header from './Header'
import * as contracts from '../contracts'
import {LoginHandler} from './Header'



class CampaignStart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            goal: '',
            description: '',
            deadline: '',
            withdraw: ''
        }
    }


    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state)
        console.log(this.deadline.value)
        console.log(this.withdraw.value)
       
        let date = this.deadline.value.split("-");
        const deadline = new Date(date[0], date[1]-1,date[2]).getTime()
        const goalAmount = this.goal.value
        const weiLimitPerBlock = this.withdraw.value
        const owner = sessionStorage.getItem('address')
        console.log(LoginHandler)
       // const deadline = parseInt(this._inputDeadline.value, 10)
        //const owner = sessionStorage.getItem('address')
       // const campaignHub = await contracts.CampaignHub.deployed()
         //campaignHub.addCampaign('ipfs hash', goalAmount, weiLimitPerBlock, deadline, owner, {from: owner})*/
        }



    render() {
            return(
                <div>
                    <Header user={{}}/>
                <Container>
                <Col xs={2}/>
                <Col xs={8}>
                    <Form>
                        <FormGroup row>
                            <Label for="name" sm={2}>Name of Campaign:</Label>
                            <Col sm={10}>
                                <Input
                                getRef={(input) => this.name = input}
                                type="text" 
                                 defaultValue="Name"
                                 placeholder="name of campaign"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="goal" sm={2}> Goal Amount</Label>
                            <Col sm={10}>
                                <Input 
                                getRef={(input) => this.goal = input}
                                id="goal"
                                 type="number" 
                                 defaultValue={10}
                                 />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="description" sm={2}>Description</Label>
                            <Col sm={10}>
                               <Input 
                               getRef={(input) => this.description = input}
                               type="textarea" 
                               defaultValue="hi"
                               name="description" 
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                        <Label for="deadline" sm={2}>Deadline</Label>
                            <Col sm={10}>
                            <Input 
                            getRef={(input) => this.deadline = input}
                            type="date" 
                            name="deadline" 
                            id="deadline" 
                            placeholder="Deadline" 
                             />
                            </Col>
                         </FormGroup>
                         <FormGroup row>
                         <Label for="withdraw" sm={2}>Wei Limit Per Block</Label>
                         <Col sm={9}>
                             <Input 
                             getRef={(input)=> this.withdraw = input}
                             id="withdraw" 
                             type="number"
                             name="withdraw"
                             defaultValue={12}
                             placeholder="withdraw limit"/>
                         </Col>
                        <Col sm={1}><div><h6>eth/block</h6></div></Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2}/>
                            <Col sm={10}>
                                <Button onClick={this.handleSubmit} type="submit">
                                        Start Campaign
                                    </Button>
                            </Col>
                         </FormGroup>
                            </Form>
                        </Col>
                        </Container>
                </div>
            );
        }
    
}



export default CampaignStart