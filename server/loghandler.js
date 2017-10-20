
const contracts = require('./contracts')
const { CampaignHub, Campaign, web3, getContractAddresses, addContractAddress } = contracts
const db = require('./db')
const { decodeLog } = require('./loghandler-utils')


function getAllLogs() {
    return new Promise((resolve, reject) => {
        web3.eth.filter({ fromBlock: 0, toBlock: 'latest', addresses: getContractAddresses() }).get((err, logs) => {
            if (err) {
                console.error('error fetching logs', err)
                return reject(err)
            }
            resolve(logs)
        })
    })
}

async function handleLog(log) {
    log = decodeLog(log)

    let cursor = await db.getLogCursor()
    if (log.blockNumber < cursor.blockNumber ||
        (log.blockNumber == cursor.blockNumber && log.logIndex <= cursor.logIndex)) {
        console.log('skipping log', { blockNumber: log.blockNumber, logIndex: log.logIndex })
        return
    }

    let shouldBreak = false

    if (log.event === 'LogAddCampaign') {
        const campaign = await Campaign.at(log.args.campaign)
        const ipfsHash = await campaign.ipfsHash()
        const weiLimitPerBlock = await campaign.weiLimitPerBlock()
        const goalAmount = await campaign.goalAmount()
        const deadline = await campaign.deadline()

        console.log('DEADLINE ~>', deadline)

        await db.addCampaign(log.args.campaign, { ipfsHash, weiLimitPerBlock, goalAmount, deadline })
        addContractAddress(log.args.campaign, 'Campaign')
        shouldBreak = true

    } else if (log.event === 'LogVendorAdded') {
        await db.addVendor(log.args.vendorAddr, log.args.ipfsHash)
    } else if (log.event === 'LogVendorTagAdded') {
        await db.addVendorTag(log.args.vendorAddr, log.args.tag)
    } else if (log.event === 'LogTagAdded') {
        await db.addTag(log.args.tag)
    } else {
        console.log(`Unhandled log (${log.event})`)
    }

    await db.setLogCursor(log.blockNumber, log.logIndex)

    return shouldBreak
}

module.exports = async () => {
    await contracts.init()

    console.log('netID ~>', contracts.getNetID())
    console.log('contract addrs ~>', getContractAddresses())

    async function getLogs() {
        let logs = await getAllLogs()

        for (let log of logs) {
            let shouldBreak = await handleLog(log)
            if (shouldBreak) {
                break
            }
        }

        setTimeout(getLogs, 5000)
    }

    getLogs()

    /////////////////////////////////////////////////////////////////

    /*
    const campaignHub = await CampaignHub.deployed()

    // event LogAddCampaign(address campaign, bytes32 ipfsHash);
    campaignHub.LogAddCampaign(null, { fromBlock: 0, toBlock: 'latest' }).watch(async (err, log) => {
        if (err) {
            console.error(err)
            return
        }

        let cursor = await db.getLogCursor()
        if (log.blockNumber < cursor.blockNumber ||
            (log.blockNumber == cursor.blockNumber && log.logIndex <= cursor.logIndex)) {
            console.log('skipping log', { blockNumber: log.blockNumber, logIndex: log.logIndex })
            // return
        }

        console.log('LogAddCampaign ~>', log)

        const campaign = await Campaign.at(log.args.campaign)
        const ipfsHash = await campaign.ipfsHash()
        const weiLimitPerBlock = await campaign.weiLimitPerBlock()
        const goalAmount = await campaign.goalAmount()
        const deadline = await campaign.deadline()

        await db.addCampaign(log.args.campaign, { ipfsHash, weiLimitPerBlock, goalAmount, deadline })
        let campaigns = await db.getAllCampaigns()
        for (let c of campaigns) {
            await db.getCampaign(c)
        }

        await db.setLogCursor(log.blockNumber, log.logIndex)

        addContractAddress(log.args.campaign)
    })*/
}
