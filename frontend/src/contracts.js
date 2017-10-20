import { default as contract } from 'truffle-contract'

import campaignHubArtifacts from 'contracts/CampaignHub.json'
import campaignArtifacts from 'contracts/Campaign.json'

const Promise = require('bluebird')
const Web3 = require('web3')

const CampaignHub = contract(campaignHubArtifacts)
const Campaign = contract(campaignArtifacts)

function init() {
    return new Promise((resolve, reject) => {
        window.addEventListener('load', () => {
            // Checking if Web3 has been injected by the browser (Mist/MetaMask)
            if (typeof window.web3 !== 'undefined') {
                // Use Mist/MetaMask's provider
                window.web3 = new Web3(window.web3.currentProvider)
            } else {
                console.log('No web3? You should consider trying MetaMask!')
                // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
                window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
            }

            if (typeof window.web3.eth.getAccountsPromise !== 'function') {
                Promise.promisifyAll(window.web3.eth, { suffix: 'Promise' })
            }

            // init our contracts
            CampaignHub.setProvider(window.web3.currentProvider)
            Campaign.setProvider(window.web3.currentProvider)

            window.contracts = {
                CampaignHub,
                Campaign,
            }

            resolve()
        })
    })
}


export {
    init,
    CampaignHub,
    Campaign,
}
