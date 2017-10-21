import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchLoans, deployLoan } from '../actions/loanActions'
import { Button, Form, FormGroup, FormText, Input, Label, Col,Row,Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class Loans extends React.Component {
  constructor () {
    super()
    this.state = {
      modal: false
    }
    this.onClickRequestLoan = this.onClickRequestLoan.bind(this)
  }

  componentDidMount () {
    this.props.fetchLoans()
  }

  render() {
    return (
        <div>
        <Container>
        <Col xs={2}/>
        <Col xs={8}>
            <h2>Deploy new loan</h2>
            <Form>
                <FormGroup row>
                    <Label for="loanGoal" sm={2}>Loan goal</Label>
                    <Col sm={10}>
                        <Input
                        id="loanGoal"
                        getRef={(input) => this.loanGoal = input}
                        type="text"
                        defaultValue={1}
                        placeholder="Loan goal"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="interestRate" sm={2}>Interest rate</Label>
                    <Col sm={10}>
                        <Input
                        getRef={(input) => this.interestRate = input}
                        id="interestRate"
                         type="number"
                         defaultValue={2}
                         />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="fundingDuration" sm={2}>Funding duration</Label>
                    <Col sm={10}>
                       <Input
                       getRef={(input) => this.fundingDuration = input}
                       type="number"
                       defaultValue={3}
                       name="fundingDuration"
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                <Label for="repaymentDuration" sm={2}>Repayment duration</Label>
                    <Col sm={10}>
                    <Input
                    getRef={(input) => this.repaymentDuration = input}
                    type="number"
                    name="repaymentDuration"
                    id="repaymentDuration"
                       defaultValue={30}
                     />
                    </Col>
                 </FormGroup>
                 <FormGroup row>
                 <Label for="numberOfCoupons" sm={2}>Number of coupons</Label>
                 <Col sm={9}>
                     <Input
                     getRef={(input)=> this.numberOfCoupons = input}
                     id="numberOfCoupons"
                     type="number"
                     name="numberOfCoupons"
                     defaultValue={10} />
                 </Col>
                </FormGroup>
                 <FormGroup row>
                 <Label for="activationWindow" sm={2}>Activation window</Label>
                 <Col sm={9}>
                     <Input
                     getRef={(input)=> this.activationWindow = input}
                     id="activationWindow"
                     type="number"
                     name="activationWindow"
                     defaultValue={4} />
                 </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2}/>
                    <Col sm={10}>
                        <Button onClick={this.onClickRequestLoan} color='primary' style={{marginTop: 30}}>Request Loan</Button>
                    </Col>
                </FormGroup>
            </Form>
        </Col>
        </Container>
        </div>
    )
  }

  async onClickRequestLoan() {
    const loanGoal = this.loanGoal.value
    const interestRate = this.interestRate.value
    const fundingDuration = this.fundingDuration.value
    const repaymentDuration = this.repaymentDuration.value
    const numberOfCoupons = this.numberOfCoupons.value
    const activationWindow = this.activationWindow.value
    this.props.deployLoan({
        loanGoal,
        interestRate,
        fundingDuration,
        repaymentDuration,
        numberOfCoupons,
        activationWindow,
    })
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
    deployLoan: (loan) => dispatch(deployLoan(loan)),
    navigateToCampaign: (id) => dispatch(push(`/loans/${id}`))
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Loans)
