pragma solidity 0.4.15;

import "./Owned.sol";
import "./Vendors.sol";
import './Bytes32SetLib.sol';
import './AddressSetLib.sol';

contract Campaign is Owned
{
  using Bytes32SetLib for Bytes32SetLib.Bytes32Set;
  using AddressSetLib for AddressSetLib.AddressSet;
  Vendors vendors;

  mapping(address => bool) donatorRegistry;
  uint public currentBalance;
  uint public cumulativeBalance;
  uint public goalAmount;
  bytes32 public ipfsHash;

  mapping(address => uint) donations;
  AddressSetLib.AddressSet donators;

  mapping(bytes32 => uint) fundsByTag;

  uint public weiLimitPerBlock;
  uint public weiWithdrawnSoFar;
  uint public deadline;

  Bytes32SetLib.Bytes32Set tags;
  AddressSetLib.AddressSet flaggers;
  uint flagVotes;
  bool public campaignFlagged;

  event LogDonation(address sender, uint amount);
  event LogWithdrawl(address sender, uint amount);
  event LogPaused(address sender);
  event LogFundsTransfered(address sender, uint amount);
  event LogCampaignTagAdded(bytes32 tag);
  event LogFlagCampaign(address sender);
  event LogReturnFunds(address sender, uint amount);
  event LogDisburseFunds(address supplier, bytes32 tag, uint amount);
  event LogSetNewIpfs(bytes32 newIpfsHash);
  event LogStopFlaggedCampaign(bool flaggedStatus);

  function Campaign(bytes32 _ipfsHash, uint _goalAmount, address _vendors, uint _weiLimitPerBlock, uint _deadline) {
    // TODO support list of owners
    ipfsHash = _ipfsHash;
    goalAmount = _goalAmount;
    vendors = Vendors(_vendors);
    weiLimitPerBlock = _weiLimitPerBlock;
    deadline = _deadline + block.number;
    campaignFlagged = false;
  }

  modifier haveNotFlagged() {
    require(!flaggers.contains(msg.sender));
    require(donators.contains(msg.sender));
    _;
  }

  modifier rateLimit(uint amount) {
    require(weiWithdrawnSoFar + amount <= (block.number - deadline) * weiLimitPerBlock);
    _;
  }

  modifier reachedFundingPeriod() {
    require(deadline > block.number);
    _;
  }


  modifier campaignNotFlagged() {
    require(!campaignFlagged);
    _;
  }

  function flagCampaign()
    haveNotFlagged
    returns (bool)
  {
      require(!flaggers.contains(msg.sender));
      flagVotes += donations[msg.sender];
      flaggers.add(msg.sender);
      LogFlagCampaign(msg.sender);
      return true;
  }

  function returnFunds()
    reachedFundingPeriod
  {
    uint amountToSend = donations[msg.sender];
    require(amountToSend > 0);
    donations[msg.sender] = 0;
    msg.sender.transfer(amountToSend);
    LogReturnFunds(msg.sender, amountToSend);
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


  function donate(bytes32 tag) payable campaignNotFlagged returns (bool) {
    // require that tag exists if passed in
    require(tag == 0 || vendors.tagExists(tag) && tags.contains(tag));

    fundsByTag[tag] += msg.value;
    donations[msg.sender] += msg.value;
    currentBalance += msg.value;
    cumulativeBalance += msg.value;
    donators.add(msg.sender);
    LogDonation(msg.sender, msg.value);
    return true;
  }

  function disburseFunds(address vendor, bytes32 tag, uint amount)
    onlyOwner
    reachedFundingPeriod
    campaignNotFlagged
    rateLimit(amount)
  {
    require(vendors.tagExists(tag));
    require(vendors.isVendorTagged(vendor, tag));
    require(fundsByTag[tag] >= amount);

    currentBalance -= amount;
    fundsByTag[tag] -= amount;

    vendor.transfer(amount);
    weiWithdrawnSoFar += amount;

    LogDisburseFunds(vendor, tag, amount);
  }

  function setNewIpfs(bytes32 newIpfsHash)
    onlyOwner {
    ipfsHash = newIpfsHash;
    LogSetNewIpfs(newIpfsHash);
  }

  function stopFlaggedCampaign()
  reachedFundingPeriod
  returns (bool)
  {
    require(flagVotes/cumulativeBalance * 100 > 50);
    // TODO +1 to prevent shaddiness
    require(!campaignFlagged);
    campaignFlagged = true;
    LogStopFlaggedCampaign(campaignFlagged);
    return true;
  }

}
