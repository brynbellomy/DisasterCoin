pragma solidity ^0.4.15;

contract Loan {
    address public owner;
    uint public loanAmount;
    uint public interestRate;
    uint public fundingPeriod;
    uint public repaymentPeriod;
    uint public numberOfCoupons;
//events
// mappings
//modifiers
    modifier duringFundingPeriod {

    }

    function Loan(uint loanAmount_, uint interestRate_, uint fundingPeriod_, uint repaymentPeriod_, uint numberOfCoupons_) {
        owner = msg.sender;
        loanAmount = loanAmount_;
        interestRate = interestRate_;
        fundingPeriod = fundingPeriod_;
        repaymentPeriod = repaymentPeriod_;
        numberOfCoupons = numberOfCoupons_;
        startBlock = block.number;
    }

    function fundLoan() payable returns (uint currentBalance) { // by funders

        }


}
