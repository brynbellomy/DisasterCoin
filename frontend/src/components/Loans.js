import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchLoans } from '../actions/loanActions'
import { Button, Form, FormGroup, FormText, Input, Label, Col,Row,Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class Loans extends React.Component {
  constructor () {
    super()
    this.state = {
      modal: false
    }
    this.toggle = this.toggle.bind(this)
  }
  componentDidMount () {
    this.props.fetchLoans()
  }
  toggle () {
    this.setState({modal: !this.state.modal})
  }
  render () {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Modal isOpen={this.state.modal} toggle={this.toggle} autoFocus={false}>
          <ModalHeader toggle={this.toggle}>Request Loan</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="goal" sm={3}>Goal:</Label>
                <Col sm={4}>
                  <Input
                    getRef={(input)=> this.goal = input}
                    type="number"
                    defaultValue={100000000}
                    />
                  </Col>
                  <Col sm={1}><div><h3>wei</h3></div></Col>
                </FormGroup>
                <FormGroup row>
                <Label for="interest" sm={3}>Interest Rate:</Label>
                <Col sm={4}>
                  <Input
                    getRef={(input)=> this.interest = input}
                    type="number"
                    defaultValue={6}
                    />
                  </Col>
                  <Col sm={1}><div><h2>%</h2></div></Col>
                </FormGroup>
                <FormGroup row>
                <Label for="fduration" sm={3}>FundingDuration:</Label>
                <Col sm={4}>
                  <Input
                    getRef={(input)=> this.fduration = input}
                    type="number"
                    defaultValue={100}
                    />
                  </Col>
                  <Col sm={1}><div><h3>blocks</h3></div></Col>
                </FormGroup>
                <FormGroup row>
                <Label for="pduration" sm={3}>Bond Payout Duration:</Label>
                <Col sm={4}>
                  <Input
                    getRef={(input)=> this.pduration= input}
                    type="number"
                    defaultValue={1000}
                    />
                  </Col>
                  <Col sm={1}><div><h3>blocks</h3></div></Col>
                </FormGroup>
                <FormGroup row>
                <Label for="freq" sm={3}>Frequency of Payout(per year)</Label>
                <Col sm={4}>
                  <Input
                    getRef={(input)=> this.pduration= input}
                    type="number"
                    defaultValue={4}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                <Label for="bond" sm={3}>Activation Window for Bond</Label>
                <Col sm={4}>
                  <Input
                    getRef={(input)=> this.pduration= input}
                    type="number"
                    defaultValue={4}
                    />
                  </Col>
                  <Col sm={1}><div><h3>blocks</h3></div></Col>
                </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.toggle}>Do Something</Button>{' '}
            <Button color='secondary' onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
          {<Button onClick={this.toggle} color='primary' style={{marginTop: 30}}>Request Loan</Button>}
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    loans: state.loans.loans,
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLoans: () => dispatch(fetchLoans()),
    navigateToCampaign: (id) => dispatch(push(`/loans/${id}`))
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Loans)
