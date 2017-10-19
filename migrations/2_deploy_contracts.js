var AddressSetLib = artifacts.require("./AddressSetLib.sol");
var Bytes32SetLib = artifacts.require("./Bytes32SetLib.sol");
var CampaignHub = artifacts.require("./CampaignHub.sol");
var Vendors = artifacts.require("./Vendors.sol");

module.exports = function(deployer) {
  deployer.deploy(AddressSetLib);
  deployer.deploy(Bytes32SetLib);

  deployer.link(AddressSetLib, CampaignHub);
  deployer.link(Bytes32SetLib, Vendors);

  deployer.deploy(Vendors).then(() => {
    return deployer.deploy(CampaignHub, Vendors.address);
  });
};
