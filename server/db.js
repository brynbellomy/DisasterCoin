const redis = require('redis')
const client = redis.createClient()
const Promise = require('bluebird')

Promise.promisifyAll(client, {suffix: 'Async'})

client.on('error', (err) => {
    console.error('Redis error ' + err)
})

async function addCampaign(address, data) {
    await client.hsetAsync('campaign', address, JSON.stringify(data))
    await client.saddAsync('campaigns', address)
}

async function getAllCampaigns() {
    let campaigns = await client.smembersAsync('campaigns')
    console.log('getAllCampaigns ~>', campaigns)
    return campaigns
}

async function getCampaign(address) {
    let campaign = await client.hgetAsync('campaign', address)
    console.log(campaign)
    return JSON.parse(campaign)
}

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
    addCampaign,
    getCampaign,
    getAllCampaigns,
    setLogCursor,
    getLogCursor,
}