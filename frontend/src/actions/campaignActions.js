import { FETCH_CAMPAIGNS, STORE_CAMPAIGNS, FETCH_CAMPAIGN, STORE_CAMPAIGN } from '../constants/CampaignActionTypes'

export const fetchCampaigns = () => {
  return {
    type: FETCH_CAMPAIGNS
  }
}

export const storeCampaigns = (campaigns) => {
  return {
    type: STORE_CAMPAIGNS,
    campaigns
  }
}

export const fetchCampaign = (address) => {
  return {
    type: FETCH_CAMPAIGNS,
    address
  }
}

export const storeCampaign = (campaign) => {
  return {
    type: STORE_CAMPAIGN,
    campaign
  }
}