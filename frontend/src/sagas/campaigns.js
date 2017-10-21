import { all, put, takeEvery } from 'redux-saga/effects'
import { storeCampaigns, storeCampaign } from '../actions/campaignActions'
import { FETCH_CAMPAIGNS, STORE_CAMPAIGNS, FETCH_CAMPAIGN, STORE_CAMPAIGN } from '../constants/CampaignActionTypes'

function* fetchCampaigns () {
  let config = {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
  }
  let campaigns = []
  // '/campaigns'
  yield fetch('http://0.0.0.0:8080/campaigns', config)
    .then((response) => response.json())
    .then((campaignsArr) => {
        console.log('yayyyy')
      campaigns = campaignsArr
    })
    .catch(err => {
      console.log(err)
    })

  yield put(storeCampaigns(campaigns))
}


function* fetchCampaign (address) {
  let config = {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
  }
  let campaign = []

  yield fetch('http://0.0.0.0:8080/campaign/${address}', config)
    .then((response) => response.json())
    .then((campaignArr) => {
      campaign = campaignArr
    })
    .catch(err => {
      console.log(err)
    })

  yield put(storeCampaign(campaign))
}

function* campaignSaga () {
  yield all([
    takeEvery(FETCH_CAMPAIGNS, fetchCampaigns),
    takeEvery(FETCH_CAMPAIGN, fetchCampaign)
  ])
}

export default campaignSaga
