import React, {Component} from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import {Row, Col, Table} from 'reactstrap'
import { fetchCampaigns } from '../actions/campaignActions'
// import styled from 'styled-components'

class CampaignLanding extends Component {

  constructor (props) {
    super(props)

    this.state = {
      campaigns: []
    }
  }

  componentDidMount () {
    this.props.fetchCampaigns()
  }
  render () {
      let campaigns = this.props.campaigns.map((campaign, index) => {
          console.log(campaign)
          return (
              <tr key={index}>
                  <td><h3 onClick={() => this.props.navigateToCampaign(campaign.address)}>{campaign.name}</h3></td>
                  <td>{campaign.limit} </td>
                  <td>{campaign.deadline} </td>
              </tr>
          )
      })
    return (
      <div style={{width: '100%'}}>
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
          <Row>
            <h4>Available Campaigns</h4>
          </Row>
          <Row>
            <Col>
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
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    campaigns: state.campaigns.campaigns,
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampaigns: () => dispatch(fetchCampaigns()),
    navigateToCampaign: (id) => dispatch(push(`/campaign/${id}`))
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(CampaignLanding)
