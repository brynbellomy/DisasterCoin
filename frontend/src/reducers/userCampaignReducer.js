import { CREATED_CAMPAIGNS, DONATED_CAMPAIGNS } from '../constants/UserCampaignActionTypes'

const initialState = {
  createdCampaigns: [],
  donatedCampaigns: []
}

export default function userCampaignReducer (state = initialState, action) {
  // For now, don't handle any actions
  // and just return the state given to us.
  let newState
  switch (action.type) {
    case CREATED_CAMPAIGNS:
      newState = Object.assign({}, state, {createdCampaigns: action.createdCampaigns})
      return newState
    case DONATED_CAMPAIGNS:
      newState = Object.assign({}, state, {donatedCampaigns: action.donatedCampaigns})
      return newState
    default:

  }
  return state
}
