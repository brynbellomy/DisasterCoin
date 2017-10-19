const Vendors = artifacts.require("./Vendors.sol");

contract('Vendors', (accounts) => {

  let vendorsContract;
  const owner = accounts[0];

  beforeEach(() => {
    return Vendors.new({from: owner})
    .then((instance) => {
      vendorsContract = instance;
    });
  });

  it("Should be able to add a tag", () => {
  });

  it("Should be able to add a tag to a vendor", () => {
  });

  it("Should be able to add vendors", () => {
  });

  it("Should not be able to add a tag to a vendor that does not exist", () => {
  });

  it("Should able to create a new campaign", () => {
  });
});
