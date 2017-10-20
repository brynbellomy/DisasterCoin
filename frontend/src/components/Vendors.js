import React from 'react'
import { connect } from 'react-redux'
import { fetchVendors } from '../actions/vendorActions'
import Header from './Header'

const Vendors = (props) => {
  return (
    <div>
      <Header user={props.user} />
      Vendors
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVendors: () => dispatch(fetchVendors())
  }
}
export default connect(mapStatetoProps)(Vendors)
