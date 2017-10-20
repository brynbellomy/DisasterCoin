import { FETCH_CREATEDCAMPAIGNS, FETCH_DONATEDCAMPAIGNS, CREATED_CAMPAIGNS, DONATED_CAMPAIGNS } from '../constants/UserCampaignActionTypes'

export const fetchCreatedCampaigns = (user) => {
  return {
    type: FETCH_CREATEDCAMPAIGNS
  }
}

export const fetchDonatedCampaigns = (user) => {
  return {
    type: FETCH_DONATEDCAMPAIGNS
  }
}

export const createdCampaigns = (campaigns) => {
  return {
    type: CREATED_CAMPAIGNS,
    campaigns
  }
}

export const donatedCampaigns = (campaigns) => {
  return {
    type: DONATED_CAMPAIGNS,
    campaigns
  }
}

