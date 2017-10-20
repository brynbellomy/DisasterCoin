const Campaign = artifacts.require("./Campaign.sol");
const Vendors = artifacts.require("./Vendors.sol");
const { expectThrow } = require("./helpers.js");

contract('Campaign', (accounts) => {

  let campaignContract;
  let vendorContract;
  const owner = accounts[0];
  const vendorOwner = accounts[1];
  const vendorOne = accounts[2];
  const vendorTwo = accounts[3];
  const donatorOne = accounts[4];

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

    it("should only be able to withdraw a certain amount each day", async () => {
      const ipfsHash = "0x6861736800000000000000000000000000000000000000000000000000000000";
      const tag = "lumber";

      await vendorContract.addTag(tag, { from: vendorOwner });
      await vendorContract.addVendor(vendorOne, ipfsHash, {from: vendorOwner});
      await vendorContract.addVendorTag(vendorOne, tag, { from: vendorOwner });
      await campaignContract.addTag(tag, {from: owner});

      for (let i of [1, 2, 3, 4]) {
        await campaignContract.donate(tag, {from: donatorOne, value: 1000});
      }
      await campaignContract.disburseFunds(vendorOne, tag, 1, {from: owner});
      await expectThrow(campaignContract.disburseFunds(vendorOne, tag, 999, {from: owner}));
      await expectThrow(campaignContract.disburseFunds(vendorOne, tag, 10000000, {from: owner}));

      // Not a verified vendor should throw
      await expectThrow(campaignContract.disburseFunds(vendorTwo, tag, 1, {from: owner}));
    });

    it("should be able to flag campaign and recieve funds", async () => {
    });

    it("should not be able to manipulate flagging with one account", async () => {
    });

    it("should not be able to vote twice", async () => {
    });

});
