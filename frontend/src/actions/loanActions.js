import { FETCH_LOANS, STORE_LOANS } from '../constants/LoanActionTypes'

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
