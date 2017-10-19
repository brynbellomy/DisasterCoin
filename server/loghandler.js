
const { CampaignHub, web3 } = require('./contracts')

module.exports = async () => {
    const campaignHub = await CampaignHub.deployed()

    // event LogAddCampaign(address campaign, bytes32 ipfsHash);
    campaignHub.LogAddCampaign(null, { fromBlock: 0, toBlock: 'latest' }).watch((err, log) => {
        if (err) {
            console.error(err)
            return
        }

        console.log('LogAddCampaign ~>', log)
    })
}
