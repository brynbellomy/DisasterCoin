import { all, put, takeEvery } from 'redux-saga/effects'
import { storeLoans } from '../actions/loanActions'
import { FETCH_LOANS, DEPLOY_LOAN } from '../constants/LoanActionTypes'
import * as contracts from '../contracts'

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

function* deployLoan(loanAction) {
  let loanHub, accounts, tx
  yield contracts.LoanHub.deployed().then((loanHubDeployed) => loanHub = loanHubDeployed)
  yield window.web3.eth.getAccountsPromise().then(blockaccounts => accounts = blockaccounts)
  const loan = loanAction.loan
  console.log('loanAction ~>', loanAction)
  yield loanHub.deployNewLoan(
        loan.loanGoal,
        loan.interestRate,
        loan.fundingDuration,
        loan.repaymentDuration,
        loan.numberOfCoupons,
        loan.activationWindow,
    {from: accounts[0], gas: 2e6}).then(txReturn => tx = txReturn)
  // yield put(push(`/campaign/${tx.logs[0].args.campaign}`))
}

function* campaignSaga () {
  yield all([
    takeEvery(FETCH_LOANS, fetchLoans),
    takeEvery(DEPLOY_LOAN, deployLoan)
    // takeEvery(REGISTER_USER, registerUser)
  ])
}

export default campaignSaga
