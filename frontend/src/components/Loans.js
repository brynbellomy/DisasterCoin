import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchLoans } from '../actions/loanActions'

class Loans extends React.Component {
  componentDidMount () {
    this.props.fetchLoans()
  }
  render () {
    return (
      <div>
          Loans
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
