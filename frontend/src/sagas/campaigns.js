import { all, put, takeEvery } from 'redux-saga/effects'
import { storeCampaigns, storeCampaign } from '../actions/campaignActions'
import { FETCH_CAMPAIGNS, FETCH_CAMPAIGN, CREATE_CAMPAIGN, DONATE_CAMPAIGN, WITHDRAW_CAMPAIGN } from '../constants/CampaignActionTypes'
import { push } from 'react-router-redux'
import * as contracts from '../contracts'

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


function* fetchCampaign (id) {
  let config = {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
  }
  let campaign = {}

  yield fetch(`http://0.0.0.0:8080/campaign/${id.address}`, config)
    .then((response) => response.json())
    .then((campaignArr) => {
      campaign = campaignArr
    })
    .catch(err => {
      console.log(err)
    })
  yield put(storeCampaign(campaign))
}

function* createCampaign (campaignAction) {
  console.log(window.contracts)
  let campaignHub, accounts, tx
  yield contracts.CampaignHub.deployed().then((campaignHubDeployed) => campaignHub = campaignHubDeployed)
  yield window.web3.eth.getAccountsPromise().then(blockaccounts => accounts = blockaccounts)
  yield console.log('accounts', accounts[0])
  const campaign = campaignAction.campaign
  yield campaignHub.addCampaign(campaign.name, campaign.goalAmount, campaign.weiLimitPerBlock, campaign.deadline, {from: accounts[0], gas: 2e6}).then(txReturn => tx = txReturn)
  yield put(push(`/campaign/${tx.logs[0].args.campaign}`))
}
//donate(bytes32 tag) payable campaignNotFlagged returns (bool) 
function* donateCampaign (donateInput) {
  console.log(donateInput)
  let campaign, accounts
  yield contracts.Campaign.at(donateInput.donate.address).then(res => campaign = res)
  yield window.web3.eth.getAccountsPromise().then(blockaccounts => accounts = blockaccounts)
  console.log(donateInput.donate.value)
  yield campaign.donate('tagexample', {from: accounts[0], value: donateInput.donate.value}).then(txReturn => console.log(txReturn))
  
}
// disburseFunds(address vendor, bytes32 tag, uint amount)
function* withdrawCampaign (campaignAddress) {
  let campaign, accounts
  yield contracts.Campaign.at(campaignAddress.withdraw).then(res => campaign = res)
  yield window.web3.eth.getAccountsPromise().then(blockaccounts => accounts = blockaccounts)
  yield campaign.disburseFunds(accounts[1], 'tagexample', 1000, {from: accounts[0], value: 100000, gas: 2e6}).then(txReturn => console.log(txReturn))
}

function* campaignSaga () {
  yield all([
    takeEvery(FETCH_CAMPAIGNS, fetchCampaigns),
    takeEvery(FETCH_CAMPAIGN, fetchCampaign),
    takeEvery(CREATE_CAMPAIGN, createCampaign),
    takeEvery(DONATE_CAMPAIGN, donateCampaign),
    takeEvery(WITHDRAW_CAMPAIGN, withdrawCampaign),
  ])
}

export default campaignSaga
