import { CREATED_CAMPAIGNS, DONATED_CAMPAIGNS } from '../constants/UserCampaignActionTypes'

const initialState = {
  createdCampaigns: [],
  donatedCampaigns: []
}

export default function userCampaignReducer (state = initialState, action) {
  // For now, don't handle any actions
  // and just return the state given to us.
  switch (action.type) {
    case CREATED_CAMPAIGNS:
      return Object.assign({}, state, {createdCampaigns: action.createdCampaigns})
    case DONATED_CAMPAIGNS:
      return Object.assign({}, state, {donatedCampaigns: action.donatedCampaigns})
    default:

  }
  return state
}
