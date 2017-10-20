const _ = require('lodash')
const redis = require('redis')
const client = redis.createClient()
const Promise = require('bluebird')

/**
 * @@TODO:
 * store user types by address
 * - donor (from LogDonate)
 * - campaigner (from LogAddCampaign)
 */

Promise.promisifyAll(client, {suffix: 'Async'})

client.on('error', (err) => {
    console.error('Redis error ' + err)
})

/**
 * Campaigns
 */

async function setCampaign(address, campaignState) {
    await client.hsetAsync('campaign', address, JSON.stringify(campaignState))
    await client.saddAsync('campaigns', address)
    await setUserType(campaignState.campaigner, 'campaigner')
}

async function getAllCampaigns() {
    let campaigns = await client.smembersAsync('campaigns')
    return campaigns
}

async function getCampaign(address) {
    let campaign = await client.hgetAsync('campaign', address)
    return JSON.parse(campaign)
}

/**
 * Vendors
 */

async function addVendor(address, ipfsHash) {
    await client.hsetAsync('vendors', address, JSON.stringify({ ipfsHash, tags: [] }))
}

async function addVendorTag(address, tag) {
    let vendor = JSON.parse(await client.hgetAsync('vendors', address))

    vendor.tags.push(tag)
    vendor.tags = _.uniq(vendor.tags)

    await client.hsetAsync('vendors', address, JSON.stringify(vendor))
}

async function getVendors(address) {
    let vendors = await client.hgetallAsync('vendors')
    return _.mapValues(vendors, JSON.parse)
}

async function getVendor(address) {
    return JSON.parse(await client.hgetAsync('vendors', address))
}

async function addTag(tag) {
    await client.saddAsync('vendor-tags', tag)
}

async function getAllVendorTags() {
    let tags = await client.smembersAsync('vendor-tags')
    return tags
}

/**
 * Users
 */

async function getUserType(user) {
    let type = await client.hgetAsync('user-types', user)
    return type
}

async function setUserType(user, type) {
    await client.hsetAsync('user-types', user, type)
}

/**
 * Log cursor
 */

async function setLogCursor(blockNumber, logIndex) {
    await client.setAsync('logcursor', JSON.stringify({ blockNumber, logIndex }))
}

async function getLogCursor() {
    let reply = await client.getAsync('logcursor')
    if (reply === null) {
        return {blockNumber: -1, logIndex: -1}
    }
    return JSON.parse(reply)
}

module.exports = {
    setCampaign,
    getCampaign,
    getAllCampaigns,
    addVendor,
    addVendorTag,
    getVendor,
    getVendors,
    getAllVendorTags,
    addTag,
    getUserType,
    setUserType,
    setLogCursor,
    getLogCursor,
}