import React from 'react'
import { connect } from 'react-redux'
import { fetchVendors } from '../actions/vendorActions'
import Header from './Header'

const Vendors = (props) => {
  return (
    <div>
      Vendors
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    user: state.user.user,
    vendors: state.vendors.vendors
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVendors: () => dispatch(fetchVendors())
  }
}
export default connect(mapStatetoProps)(Vendors)
