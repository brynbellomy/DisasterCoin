import { all, put, takeEvery } from 'redux-saga/effects'
import { storeLoans } from '../actions/loanActions'
import { FETCH_LOANS } from '../constants/LoanActionTypes'

function* fetchLoans () {
  let config = {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
  }
  let loans = []
  // '/campaigns'
  yield fetch('http://0.0.0.0:8080/vendors', config)
    .then((response) => response.json())
    .then((loansArr) => {
        console.log('yayyyy')
      loans = loansArr
    })
    .catch(err => {
      console.log(err)
    })

  yield put(storeLoans(loans))
}

function* campaignSaga () {
  yield all([
    takeEvery(FETCH_LOANS, fetchLoans)
    // takeEvery(REGISTER_USER, registerUser)
  ])
}

export default campaignSaga
