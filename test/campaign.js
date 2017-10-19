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
//      console.log('hiiiiii' + vendorContract.address);
      return Campaign.new(ipfsHash, goalAmount, vendorContract.address, weiLimitPerBlock, deadline, {from: owner})
    })
    .then((instance) => {
      campaignContract = instance;
      return campaignContract.ipfsHash.call();
    });
//    .then(ipfsHash_ => console.log("hello" + campaignContract.address));
/*
    return Campaign.new(ipfsHash, goalAmount, vendor, weiLimitPerBlock, deadline, {from: owner})
    .then((instance) => {
      campaignContract = instance;
      return campaignContract.ipfsHash.call();
    })
    .then(ipfsHash_ => console.log("hello" + campaignContract.address))
    .then(() => Vendors.new({from: vendorOwner}))
    .then((instance) => {
      vendorContract = instance;
    });
*/
  });


    it("Should be able to donate funds to campaign", async () => {
      const donation = await campaignContract.donate(0, {value: 1});
      assert.equal(donation.logs[0].event, "LogDonation");
    });

    it("Should be able donate funds to campaign with a tag", async () => {
      console.log(vendorOwner);
      console.log(await vendorContract.owner.call());
      assert.equal(await vendorContract.owner.call(), vendorOwner, "something weird with owner");
      console.log('enddddddd');
      const temp = await vendorContract.addTag("lumber", { from: vendorOwner, gas: 1000000 });
      console.log('aaaaaaa');
      const donation = await campaignContract.donate(0, { from: owner, value: 1});

      assert.equal(donation.logs[0].event, "LogDonation");

      // const campaign = await campaginHubContract.addCampaign(ipfsHash, goalAmount, weiLimitPerBlock, deadline);
      //
      // assert.equal(campaign.logs[0].event, "LogAddCampaign");
      // console.log(campaign.logs[0].args.campaign);
      // const donation = await Campaign.at(campaign.logs[0].args.campaign).donate(0, {value: 1});
      // assert.equal(donation.logs[0].event, "LogDonation");
    });

  it("Should be able to donate funds to campaign", () => {
  });

  it("Should be able to donate to a specific tag", () => {
  });

  it("Should be able create new tag", () => {
  });

});
