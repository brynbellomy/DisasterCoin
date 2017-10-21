import { FETCH_CREATED_CAMPAIGNS, FETCH_DONATED_CAMPAIGNS, CREATED_CAMPAIGNS, DONATED_CAMPAIGNS } from '../constants/UserCampaignActionTypes'

export const fetchCreatedCampaigns = (user) => {
  return {
    type: FETCH_CREATED_CAMPAIGNS
  }
}

export const fetchDonatedCampaigns = (user) => {
  return {
    type: FETCH_DONATED_CAMPAIGNS
  }
}

export const createdCampaigns = (createdCampaigns) => {
  return {
    type: CREATED_CAMPAIGNS,
    createdCampaigns
  }
}

export const donatedCampaigns = (donatedCampaigns) => {
  return {
    type: DONATED_CAMPAIGNS,
    donatedCampaigns
  }
}
