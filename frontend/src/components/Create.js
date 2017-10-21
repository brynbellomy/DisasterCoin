
'use strict';

import React, {Component} from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import {Row, Col, Button, Form, Container, Input, FormGroup, Label} from 'reactstrap'
import Header from './Header'
import { createCampaign } from '../actions/campaignActions'



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
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit (e) {
        e.preventDefault()
        console.log(this.state)
        console.log(this.deadline.value)
        console.log(this.withdraw.value)

        const name = this.name.value
        const deadline = this.deadline.value
        const goalAmount = this.goal.value
        console.log('name ~>', name)
        const weiLimitPerBlock = this.withdraw.value
        const txParams = {
          name: name,
          goalAmount: goalAmount,
          weiLimitPerBlock: weiLimitPerBlock,
          deadline: deadline,
        }
        //`/campaign/${tx.logs[0].args.campaign}`
        this.props.createCampaign(txParams)
    }

    render() {
            return(

                <Container style={{marginTop: 30}}>
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
                            type="number"
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
                                {<Button onClick={this.handleSubmit} color="primary">Create New Campaign</Button>}
                            </Col>
                         </FormGroup>
                    </Form>
                </Container>
            );
        }

}

const mapDispatchToProps = (dispatch) => {
  return {
      //navigateToCampaign
    createCampaign: (campaign) => dispatch(createCampaign(campaign))
  }
}

export default connect(null, mapDispatchToProps)(CampaignStart)
