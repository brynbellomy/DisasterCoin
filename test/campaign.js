const Campaign = artifacts.require("./Campaign.sol");
const Vendors = artifacts.require("./Vendors.sol");

contract('Campaign', (accounts) => {

  let campaignContract;
  let vendorContract;
  const owner = accounts[0];
  const vendorOwner = accounts[1];

  beforeEach(() => {
    const ipfsHash = "0x7465737400000000000000000000000000000000000000000000000000000000";
    const goalAmount = 11;
    const weiLimitPerBlock = 1;
    const deadline = 2;


    return Vendors.new({from: vendorOwner})
    .then(instance => {
      vendorContract = instance;
      return Campaign.new(ipfsHash, goalAmount, vendorContract.address, weiLimitPerBlock, deadline, {from: owner})
    })
    .then((instance) => {
      campaignContract = instance;
      return campaignContract.ipfsHash.call();
    });
  });


    it("Should be able to donate funds to campaign", async () => {
      const donation = await campaignContract.donate(0, {value: 1});
      assert.equal(donation.logs[0].event, "LogDonation");
    });

    it("Should be able donate funds to campaign with a tag", async () => {
      await vendorContract.addTag("lumber", { from: vendorOwner });
      await campaignContract.addTag("lumber", { from: owner });
      const donation = await campaignContract.donate("lumber", { from: owner, value: 1});

      assert.equal(donation.logs[0].event, "LogDonation");

    });

});
