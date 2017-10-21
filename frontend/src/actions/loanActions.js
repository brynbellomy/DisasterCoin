import { FETCH_LOANS, STORE_LOANS, DEPLOY_LOAN } from '../constants/LoanActionTypes'

export const deployLoan = (loan) => {
  console.log('deploy loan action ~>', loan)
  return {
    type: DEPLOY_LOAN,
    loan
  }
}

export const fetchLoans = () => {
  return {
    type: FETCH_LOANS
  }
}

export const storeLoans = (loans) => {
  return {
    type: STORE_LOANS,
    loans
  }
}
