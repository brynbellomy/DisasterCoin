const Campaign = artifacts.require("./Campaign.sol");
const CampaignHub = artifacts.require("./CampaignHub.sol");

contract('CampaignHub', (accounts) => {

  let campaginHubContract;
  const owner = accounts[0];

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
    const campaign = await campaginHubContract.addCampaign(ipfsHash, goalAmount, weiLimitPerBlock, deadline);

    assert.equal(campaign.logs[0].event, "LogAddCampaign")
    assert(campaign.logs[0].args.campaign);
    assert.equal(campaign.logs[0].args.ipfsHash, ipfsHash);
  });


  it("Should be able to donate funds to campagin", async () => {
    const ipfsHash = "0x7465737400000000000000000000000000000000000000000000000000000000";
    const goalAmount = 11;
    const weiLimitPerBlock = 1;
    const deadline = 2;
    const campaign = await campaginHubContract.addCampaign(ipfsHash, goalAmount, weiLimitPerBlock, deadline);

    assert.equal(campaign.logs[0].event, "LogAddCampaign");
    console.log(campaign.logs[0].args.campaign);
    const donation = await Campaign.at(campaign.logs[0].args.campaign).donate(0, {value: 1});
    assert.equal(donation.logs[0].event, "LogDonation");
  });

  it("Should be able to donate funds to campagin", async () => {
    const campaign = await campaginHubContract.addCampaign(ipfsHash, goalAmount, weiLimitPerBlock, deadline);

    assert.equal(campaign.logs[0].event, "LogAddCampaign");
    console.log(campaign.logs[0].args.campaign);
    const donation = await Campaign.at(campaign.logs[0].args.campaign).donate(0, {value: 1});
    assert.equal(donation.logs[0].event, "LogDonation");
  });


});
