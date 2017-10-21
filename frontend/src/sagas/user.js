import { all, put, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { LOGIN_USER, REGISTER_USER } from '../constants/UserActionTypes'
import { loggedInUser } from '../actions/userActions'
import * as _ from 'lodash'
import * as ethutil from 'ethereumjs-util'

function* loginUser (action) {
  let credentials = action.credentials

  let accounts
  console.log('credentials ~>', credentials)
  sessionStorage.setItem('address', credentials.address)
  sessionStorage.setItem('name', credentials.name)
  sessionStorage.setItem('isLoggedIn', 'true')
  yield window.web3.eth.getAccountsPromise().then(blockaccounts => accounts = blockaccounts)
  sessionStorage.setItem('ethAddress', accounts[0])
  // sessionStorage.setItem('ethAddress', ethutil.publicToAddress(credentials.publicKey))
  credentials.ethAddress = accounts[0]
  yield put(loggedInUser(credentials))
  yield put(push(`/profile/${credentials.address}`))
}


function* userSaga () {
  yield all([
    takeEvery(LOGIN_USER, loginUser),
    // takeEvery(REGISTER_USER, registerUser)
  ])
}

export default userSaga
