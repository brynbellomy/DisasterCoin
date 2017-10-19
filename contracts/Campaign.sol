pragma solidity 0.4.15;

import "./Owned.sol";

contract Campaign is Owned {

  mapping(address => bool) donatorRegistry;
  uint currentBalance;
  uint goalAmount;
  bytes32 ipfsHash;
  mapping(address => uint) donations;


  event LogDonation(address sender, uint amount);
  event LogWithdrawl(address sender, uint amount);
  event LogPaused(address sender);
  event LogFundsTransfered(address sender, uint amount);

  function Campaign(bytes32 _ipfsHash, uint _goalAmount) {
    // TODO support list of owners
    ipfsHash = _ipfsHash;
    goalAmount = _goalAmount;
  }

  /*modifier rateLimit();*/

  function returnFunds() {
    require(currentBalance > goalAmount);
    msg.sender.transfer(donations[msg.sender]);
  }

  function getBalance() constant returns (uint) {
    return currentBalance;
  }

  function donate(bytes tagToDonate) payable returns (bool) {
    // require that tag exists if passed in

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
