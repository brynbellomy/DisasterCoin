import { all, put, takeEvery } from 'redux-saga/effects'
import { createdCampaigns, donatedCampaigns } from '../actions/userCampaignActions'
import { FETCH_CREATEDCAMPAIGNS, FETCH_DONATEDCAMPAIGNS } from '../constants/UserCampaignActionTypes'

function* fetchCreatedCampaigns (user) {
  let config = {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default',

  }

  let createdUserCampaigns = []

  yield fetch(`/campaigns/user/${user.address}`, config)
    .then((response) => response.json())
    .then((createdCampaignsArr) => {
      createdUserCampaigns = createdCampaignsArr
    })
    .catch(err => {
      console.log(err)
    })
  yield put(createdCampaigns(createdUserCampaigns))
}

function* fetchDonatedCampaigns (user) {
  let config = {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default',

  }

  let donatedUserCampaigns = []

  yield fetch(`/campaigns/donator/${user.ethAddress}`, config)
    .then((response) => response.json())
    .then((donatedCampaignsArr) => {
      donatedUserCampaigns = donatedCampaignsArr
    })
    .catch(err => {
      console.log(err)
    })
  yield put(donatedCampaigns(donatedUserCampaigns))
}

function* userCampaignSaga () {
  yield all([
    takeEvery(FETCH_CREATEDCAMPAIGNS, fetchCreatedCampaigns),
    takeEvery(FETCH_DONATEDCAMPAIGNS, fetchDonatedCampaigns)
  ])
}

export default userCampaignSaga

