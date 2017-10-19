pragma solidity 0.4.15;

import "./Owned.sol";
import "./Vendors.sol";

contract Campaign is Owned {
  Vendors vendors;
  mapping(address => bool) donatorRegistry;
  uint currentBalance;
  uint goalAmount;
  bytes32 ipfsHash;
  mapping(address => uint) donations;
  mapping(bytes32 => uint) donationsByTag;


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

    donationsByTag[tag] += msg.value;
    donations[msg.sender] += msg.value;
    return true;
  }

  function transferFunds(address supplier, uint amount)
           onlyOwner {
             currentBalance - amount;
             supplier.transfer(amount);
           }

  function setNewIpfs(bytes32 newIpfsHash)
    onlyOwner {
    ipfsHash = newIpfsHash;
  }

}
