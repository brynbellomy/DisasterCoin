import { STORE_CAMPAIGNS, STORE_CAMPAIGN } from '../constants/CampaignActionTypes'

const initialState = {
  campaigns: [],
  campaign: {}
}

export default function campaignsReducer (state = initialState, action) {
  switch (action.type) {
    case STORE_CAMPAIGNS:
      return Object.assign({}, state, {campaigns: action.campaigns})
    case STORE_CAMPAIGN:
      return Object.assign({}, state, {campaign: action.campaign})
    default:

  }
  return state
}

