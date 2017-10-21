import { STORE_LOANS } from '../constants/LoanActionTypes'

const initialState = {
  loans: []
}

export default function campaignsReducer (state = initialState, action) {
  let newState
  switch (action.type) {
    case STORE_LOANS:
      newState = Object.assign({}, state, {loans: action.loans})
      return newState
    default:

  }
  return state
}
