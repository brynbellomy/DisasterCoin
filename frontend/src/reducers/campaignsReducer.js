import { STORE_CAMPAIGNS } from '../constants/CampaignActionTypes'

const initialState = {
  campaigns: []
}

export default function campaignsReducer (state = initialState, action) {
  switch (action.type) {
    case STORE_CAMPAIGNS:
      return Object.assign({}, state, {campaigns: action.campaigns})
    default:

  }
  return state
}
