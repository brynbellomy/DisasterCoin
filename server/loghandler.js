
const { CampaignHub, Campaign, web3 } = require('./contracts')
const db = require('./db')

module.exports = async () => {
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
            return
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
    })
}
