var AddressSetLib = artifacts.require("./AddressSetLib.sol");
var Bytes32SetLib = artifacts.require("./Bytes32SetLib.sol");
var Campaign = artifacts.require("./Campaign.sol");
var CampaignHub = artifacts.require("./CampaignHub.sol");
var Vendors = artifacts.require("./Vendors.sol");
var LoanHub = artifacts.require("./LoanHub.sol");
var LoanContract = artifacts.require("./LoanContract.sol");


module.exports = function(deployer) {
  deployer.deploy(AddressSetLib);
  deployer.deploy(Bytes32SetLib);

  deployer.link(AddressSetLib, [Campaign, CampaignHub, LoanHub]);
  deployer.link(Bytes32SetLib, [Campaign, CampaignHub, Vendors]);

  deployer.deploy(LoanHub)
  deployer.deploy(Vendors).then(() => {
    return deployer.deploy(CampaignHub, Vendors.address);
  });

  deployer.deploy(LoanContract, 100, 6, 10, 10, 2, 4);

};
