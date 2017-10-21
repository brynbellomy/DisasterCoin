import { all, put, takeEvery } from 'redux-saga/effects'
import { storeVendors } from '../actions/vendorActions'
import { FETCH_VENDORS, REGISTER_VENDOR } from '../constants/VendorActionTypes'
import * as contracts from '../contracts'

function* fetchVendors () {
  let config = {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
  }
  let vendors = []
  // '/campaigns'
  yield fetch('http://0.0.0.0:8080/vendors', config)
    .then((response) => response.json())
    .then((vendorsArr) => {
        // console.log('yayyyy')
      vendors = vendorsArr
    })
    .catch(err => {
      console.log(err)
    })

  yield put(storeVendors(vendors))
}

function* registerVendor (vendorObj) {
  let vendorsContract, accounts, tx
  yield contracts.Vendors.deployed().then(contract => vendorsContract = contract)
  yield window.web3.eth.getAccountsPromise().then(accountRet => accounts = accountRet)
  const vendor = vendorObj.vendorObj
  // console.log(vendor.user, vendor.name, accounts[0])
  yield vendorsContract.addVendor(accounts[0], vendor.name, {from: accounts[0], gas: 2e6}).then(ret => tx = ret)
  vendor.tags.map(tag => {
    vendorsContract.addVendorTag(accounts[0], tag, {from: accounts[0], gas: 2e6})
  })
  console.log(tx)
  // console.log('tx ~>', tx)
  // yield put(push(`/campaign/${tx.logs[0].args.campaign}`))
}

function* campaignSaga () {
  yield all([
    takeEvery(FETCH_VENDORS, fetchVendors),
    takeEvery(REGISTER_VENDOR, registerVendor)
    // takeEvery(REGISTER_USER, registerUser)
  ])
}

export default campaignSaga
