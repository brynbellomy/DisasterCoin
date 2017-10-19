pragma solidity 0.4.15;

import "./Owned.sol";
import "./Vendors.sol";

contract Campaign is Owned {
  //mapping(bytes32 => address => uint) public tagDonatorBalance; // tagName => userAddress => donationsToThatTag

  Vendors vendors;
  mapping(address => bool) donatorRegistry;
  uint currentBalance;
  uint goalAmount;
  bytes32 ipfsHash;
  mapping(address => uint) donations;
  mapping(bytes32 => uint) fundsByTag;


  event LogDonation(address sender, uint amount);
  event LogWithdrawl(address sender, uint amount);
  event LogPaused(address sender);
  event LogFundsTransfered(address sender, uint amount);

  function Campaign(bytes32 _ipfsHash, uint _goalAmount, address _vendors) {
    // TODO support list of owners
    ipfsHash = _ipfsHash;
    goalAmount = _goalAmount;
    vendors = Vendors(_vendors);
  }

  /*modifier rateLimit();*/

  function returnFunds() {
    require(currentBalance > goalAmount);
    msg.sender.transfer(donations[msg.sender]);
  }

  function getBalance() constant returns (uint) {
    return currentBalance;
  }

  function donate(bytes32 tag) payable returns (bool) {
    // require that tag exists if passed in
    require(tag == 0 || vendors.tagExists(tag));

    fundsByTag[tag] += msg.value;
    donations[msg.sender] += msg.value;
    return true;
  }

  function disburseFunds(address vendor, bytes32 tag, uint amount)
    onlyOwner
  {
    require(vendors.tagExists(tag));
    require(vendors.isVendorTagged(vendor, tag));
    require(fundsByTag[tag] >= amount);

    currentBalance -= amount;
    fundsByTag[tag] -= amount;

    vendor.transfer(amount);
  }

  function setNewIpfs(bytes32 newIpfsHash)
    onlyOwner {
    ipfsHash = newIpfsHash;
  }

}
