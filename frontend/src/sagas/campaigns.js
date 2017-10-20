import { all, put, takeEvery } from 'redux-saga/effects'
import { storeCampaigns } from '../actions/campaignActions'
import { FETCH_CAMPAIGNS, STORE_CAMPAIGNS } from '../constants/CampaignActionTypes'

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

function* campaignSaga () {
  yield all([
    takeEvery(FETCH_CAMPAIGNS, fetchCampaigns)
    // takeEvery(REGISTER_USER, registerUser)
  ])
}

export default campaignSaga
