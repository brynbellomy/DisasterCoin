import { STORE_VENDORS } from '../constants/VendorActionTypes'

const initialState = {
  vendors: []
}

export default function campaignsReducer (state = initialState, action) {
  switch (action.type) {
    case STORE_VENDORS:
      return Object.assign({}, state, {vendors: action.vendors})
    default:

  }
  return state
}
