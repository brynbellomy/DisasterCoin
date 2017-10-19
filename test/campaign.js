const Campaign = artifacts.require("./Campaign.sol");

contract('Campaign', (accounts) => {

  let campaginContract;
  const owner = accounts[0];

  beforeEach(() => {
    return Campaign.new({from: owner})
    .then((instance) => {
      campaginContract = instance;
    });
  });

  it("Should be able to donate funds to campagin", () => {
  });

  it("Should be able to donate to a specific tag", () => {
  });

  it("Should be able create new tag", () => {
  });

});
