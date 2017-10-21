const Promise = require('bluebird')
const contract = require('truffle-contract')
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

Promise.promisifyAll(web3.version, { suffix: 'Async' })
Promise.promisifyAll(web3.eth, { suffix: 'Async' })

const campaignHubArtifacts = require('../build/contracts/CampaignHub.json')
const CampaignHub = contract(campaignHubArtifacts)
CampaignHub.setProvider(web3.currentProvider)

const campaignArtifacts = require('../build/contracts/Campaign.json')
const Campaign = contract(campaignArtifacts)
Campaign.setProvider(web3.currentProvider)

const vendorsArtifacts = require('../build/contracts/Vendors.json')
const Vendors = contract(vendorsArtifacts)
Vendors.setProvider(web3.currentProvider)

let contractAddresses = []
let netID
let abiForAddress = {}

async function init() {
    netID = await web3.version.getNetworkAsync()
    addContractAddress( campaignHubArtifacts.networks[`${netID}`].address, 'CampaignHub' )
    addContractAddress( vendorsArtifacts.networks[`${netID}`].address, 'Vendors' )
}

function getContractAddresses() {
    return contractAddresses
}

function addContractAddress(address, type) {
    console.log('addContractAddress', address, type)
    contractAddresses.push(address)

    if (type === 'CampaignHub') {
        abiForAddress[address] = campaignHubArtifacts.abi
    } else if (type === 'Vendors') {
        abiForAddress[address] = vendorsArtifacts.abi
    } else if (type === 'Campaign') {
        abiForAddress[address] = campaignArtifacts.abi
    } else {
        throw new Error('BAD TYPE ' + type)
    }
}

function getNetID() {
    return netID
}

function abiFromAddress(address) {
    return abiForAddress[address]
}

module.exports = {
    init,
    CampaignHub,
    Campaign,
    Vendors,
    web3,
    netID,
    getContractAddresses,
    addContractAddress,
    getNetID,
    abiFromAddress,
}