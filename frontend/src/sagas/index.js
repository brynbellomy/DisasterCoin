import { all } from 'redux-saga/effects'
import campaignSaga from './campaigns'
import userSaga from './user'
import vendorSaga from './vendors'
// import profileSaga from './profiles'
export default function* rootSaga () {
  yield all([
    campaignSaga(),
    // profileSaga(),
    userSaga(),
    vendorSaga()
  ])
}
