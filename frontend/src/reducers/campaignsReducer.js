import { STORE_CAMPAIGNS, STORE_CAMPAIGN } from '../constants/CampaignActionTypes'

const initialState = {
  campaigns: [],
  campaign: {}
}

export default function campaignsReducer (state = initialState, action) {
  let newState = null
  switch (action.type) {
    case STORE_CAMPAIGNS:
      newState = Object.assign({}, state, {campaigns: action.campaigns})
      return newState
    case STORE_CAMPAIGN:
      if (typeof action.campaign === 'null') return true
      newState = Object.assign({}, state, {campaign: action.campaign})
      return newState
    default:

  }
  return state
}

