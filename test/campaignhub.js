const Campaign = artifacts.require("./Campaign.sol");
const CampaignHub = artifacts.require("./CampaignHub.sol");

contract('CampaignHub', (accounts) => {

  let campaginHubContract;
  const owner = accounts[0];
  const campaignOwner = accounts[1];

  beforeEach(() => {
    return CampaignHub.new({from: owner})
    .then((instance) => {
      campaginHubContract = instance;
    });
  });

  it("Should able to create a new campaign", async () => {
    const ipfsHash = "0x7465737400000000000000000000000000000000000000000000000000000000";
    const goalAmount = 11;
    const weiLimitPerBlock = 1;
    const deadline = 2;
    const campaign = await campaginHubContract.addCampaign(ipfsHash, goalAmount, weiLimitPerBlock, deadline, campaignOwner);

    assert.equal(campaign.logs[0].event, "LogNewOwner")
    assert.equal(campaign.logs[1].event, "LogAddCampaign")
    assert.equal(campaign.logs[1].args.ipfsHash, ipfsHash);
  });

});
