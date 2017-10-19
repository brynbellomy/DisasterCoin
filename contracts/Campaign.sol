pragma solidity 0.4.15;

import "./Owned.sol";
import "./Vendors.sol";
import './Bytes32SetLib.sol';

contract Campaign is Owned
{
  using Bytes32SetLib for Bytes32SetLib.Bytes32Set;
  Vendors vendors;

  mapping(address => bool) donatorRegistry;
  uint public currentBalance;
  uint public goalAmount;
  bytes32 public ipfsHash;

  mapping(address => uint) donations;
  mapping(bytes32 => uint) fundsByTag;

  uint public weiLimitPerBlock;
  uint public weiWithdrawnSoFar;
  uint public deadline;

  Bytes32SetLib.Bytes32Set tags;

  event LogDonation(address sender, uint amount);
  event LogWithdrawl(address sender, uint amount);
  event LogPaused(address sender);
  event LogFundsTransfered(address sender, uint amount);
  event LogCampaignTagAdded(bytes32 tag);

  function Campaign(bytes32 _ipfsHash, uint _goalAmount, address _vendors, uint _weiLimitPerBlock, uint _deadline) {
    // TODO support list of owners
    ipfsHash = _ipfsHash;
    goalAmount = _goalAmount;
    vendors = Vendors(_vendors);
    weiLimitPerBlock = _weiLimitPerBlock;
    deadline = _deadline + block.number;
  }

  modifier rateLimit(uint amount) {
    require(weiWithdrawnSoFar + amount <= (block.number - deadline) * weiLimitPerBlock);
    _;
  }

  modifier reachedFundingPeriod() {
    require(deadline > block.number);
    _;
  }

  function returnFunds() {
    require(currentBalance > goalAmount);
    msg.sender.transfer(donations[msg.sender]);
  }

  function getBalance() constant returns (uint) {
    return currentBalance;
  }

  function addTag(bytes32 tag) onlyOwner returns (bool) {
      bool success = tags.add(tag);
      if (success) {
          LogCampaignTagAdded(tag);
      }
      return success;
  }


  function donate(bytes32 tag) payable returns (bool) {
    // require that tag exists if passed in
    require(tag == 0 || vendors.tagExists(tag));

    fundsByTag[tag] += msg.value;
    donations[msg.sender] += msg.value;
    LogDonation(msg.sender, msg.value);
    return true;
  }

  function disburseFunds(address vendor, bytes32 tag, uint amount)
    onlyOwner
    reachedFundingPeriod
    rateLimit(amount)
  {
    require(vendors.tagExists(tag));
    require(vendors.isVendorTagged(vendor, tag));
    require(fundsByTag[tag] >= amount);

    currentBalance -= amount;
    fundsByTag[tag] -= amount;

    vendor.transfer(amount);
    weiWithdrawnSoFar += amount;
  }

  function setNewIpfs(bytes32 newIpfsHash)
    onlyOwner {
    ipfsHash = newIpfsHash;
  }

}
