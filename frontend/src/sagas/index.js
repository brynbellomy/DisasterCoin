import { all } from 'redux-saga/effects'
import campaignSaga from './campaigns'
import userSaga from './user'
// import profileSaga from './profiles'
export default function* rootSaga () {
  yield all([
    campaignSaga(),
    // profileSaga(),
    userSaga()
  ])
}
