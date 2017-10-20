
const _ = require('lodash')
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
        let campaignState = await getEntireCampaignState(log.args.campaign)
        await db.setCampaign(log.args.campaign, campaignState)

        addContractAddress(log.args.campaign, 'Campaign')
        shouldBreak = true

    } else if (log.event === 'LogVendorAdded') {
        await db.addVendor(log.args.vendorAddr, log.args.ipfsHash)
    } else if (log.event === 'LogVendorTagAdded') {
        await db.addVendorTag(log.args.vendorAddr, log.args.tag)
    } else if (log.event === 'LogTagAdded') {
        await db.addTag(log.args.tag)
    } else if (['LogDonation', 'LogWithdrawl', 'LogPaused', 'LogFundsTransfered', 'LogCampaignTagAdded', 'LogFlagCampaign', 'LogReturnFunds', 'LogDisburseFunds', 'LogSetNewIpfs', 'LogStopFlaggedCampaign'].indexOf(log.event) >= 0) {
        let campaignState = await getEntireCampaignState(log.address)
        await db.setCampaign(log.address, campaignState)

        if (log.event == 'LogDonation') {
            await db.setUserType(log.args.sender, 'donator')
        }
    } else {
        console.log(`Unhandled log (${log.event})`)
    }

    await db.setLogCursor(log.blockNumber, log.logIndex)

    return shouldBreak
}

async function getEntireCampaignState(address) {
    const campaign = await Campaign.at(address)

    const campaigner = await campaign.owner()
    const currentBalance = await campaign.currentBalance()
    const cumulativeBalance = await campaign.cumulativeBalance()
    const goalAmount = await campaign.goalAmount()
    const ipfsHash = await campaign.ipfsHash()
    const weiLimitPerBlock = await campaign.weiLimitPerBlock()
    const weiWithdrawnSoFar = await campaign.weiWithdrawnSoFar()
    const deadline = await campaign.deadline()
    const campaignFlagged = await campaign.campaignFlagged()
    const flagVotes = await campaign.flagVotes()

    const [ _addresses, _donations ] = await campaign.getDonations()
    const fundsByDonator = _.zipObject(_addresses, _donations)

    const [ _tags, _funds ] = await campaign.getFundsByTag()
    const fundsByTag = _.zipObject(_tags, _funds)

    const tags = await campaign.getTags()
    const flaggers = await campaign.getFlaggers()

    return {
        address,
        campaigner,
        currentBalance,
        cumulativeBalance,
        goalAmount,
        ipfsHash,
        weiLimitPerBlock,
        weiWithdrawnSoFar,
        deadline,
        campaignFlagged,
        flagVotes,
        fundsByDonator,
        fundsByTag,
        tags,
        flaggers,
    }
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
}
