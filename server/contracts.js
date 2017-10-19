const contract = require('truffle-contract')
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

const campaignHubArtifacts = require('../build/contracts/CampaignHub.json')
const CampaignHub = contract(campaignHubArtifacts)
CampaignHub.setProvider(web3.currentProvider)

module.exports = {
    CampaignHub,
    web3,
}