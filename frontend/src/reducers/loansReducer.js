import { STORE_LOANS } from '../constants/LoanActionTypes'

const initialState = {
  loans: []
}

export default function loansReducer (state = initialState, action) {
  switch (action.type) {
    case STORE_LOANS:
      return Object.assign({}, state, {loans: action.loans})
    default:

  }
  return state
}
