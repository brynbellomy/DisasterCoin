const Vendors = artifacts.require("./Vendors.sol");

contract('Vendors', (accounts) => {

  let vendorContract;
  const venderOwner = accounts[0];
  const verifiedSupplier = accounts[1];

  beforeEach(() => {
    return Vendors.new({from: venderOwner })
    .then(instance => {
      vendorContract = instance
    });
  });

  it("Should be able to add a tag", async () => {
    const lumberHex = "0x6c756d6265720000000000000000000000000000000000000000000000000000";
    const txAddTag = await vendorContract.addTag("lumber", { from: venderOwner });
    assert.equal(txAddTag.logs[0].event, "LogTagAdded");
    assert.equal(txAddTag.logs[0].args.tag, lumberHex);
  });

  it("Should be able to add a tag to a vendor", async () => {
    const lumberHex = "0x6c756d6265720000000000000000000000000000000000000000000000000000";
    const ipfsHash = "0x6861736800000000000000000000000000000000000000000000000000000000";
    const txAddTag = await vendorContract.addTag("lumber", { from: venderOwner });
    const txAddHash = await vendorContract.addVendor(verifiedSupplier, ipfsHash, { from: venderOwner });
    assert.equal(txAddHash.logs[0].event, "LogVendorAdded");
    assert.equal(txAddHash.logs[0].args.ipfsHash, ipfsHash);
  });

  it("Should be able to add vendors", async () => {
  });

  it("Should not be able to add a tag to a vendor that does not exist", async () => {
  });

  it("Should able to create a new campaign", async () => {
  });
});
