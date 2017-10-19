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

  it("Should be able to donate funds to campagin", () => {
  });

  it("Should able to create a new campaign", () => {
  });
});
