import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {Button,Row, Col, Table} from 'react-bootstrap';
import styled from 'styled-components';
import { Connect } from 'uport-connect';


class CampaignLanding extends Component {

    constructor(props) {
        super(props);

        this.state={
            campaigns: []
        }
    }

    componentDidMount() {
        axios.get('/v1/campaigns')
            .then( (res)=>{
                this.setState({
                    campaigns: res.data
                });

                console.log(this.state.campaigns)
            })
            .catch( err => {
                console.log(err)
            })
    }



    render() {

        let campaigns = this.state.campaigns.map((campaign, index) => {
            return (
                <tr key={index}>
                    <td><Link to={`/campaignPage/${campaign.id}`}>{campaign.name}</Link> </td>
                    <td>{campaign.limit} </td>
                    <td>{campaign.deadline} </td>
                </tr>
            )
        })
        return (
            <div>
                <Row>
                    <Col xsOffset={1} xs={11}>
                        <h4>Available Campaigns</h4>
                    </Col>
                    <Col xsOffset={1} xs={11}>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Limit</th>
                                    <th>Deadline</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaigns}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </div>
        );
    }

}

export default withRouter(CampaignLanding);