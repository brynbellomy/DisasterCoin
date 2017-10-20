import { FETCH_CAMPAIGNS, STORE_CAMPAIGNS } from '../constants/CampaignActionTypes'

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
