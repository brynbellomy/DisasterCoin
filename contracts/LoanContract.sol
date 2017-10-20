pragma solidity 0.4.15;

import "./Owned.sol";

contract Loan is Owned {
    uint public loanGoal;
    uint public interestRate;
    uint public fundingDuration;
    uint public repaymentDuration;
    uint public numberOfCoupons;
    uint public fundingDeadlineBlock;
    uint public activationDeadlineBlock;

    uint public currentBalance;
    bool public fullyFunded;

    uint public loanStartBlock;
    bool public returnFunds;
    bool public loanActivated;
    bool public loanCancelledStatus;


    event LogFundLoan(address sender, uint amount);
    event LogFullyFunded(bool isFunded);
    event LogActivateLoan(address owner_, uint blockNumber);
    event LogLoanFailedToGetFunded(bool loanStatus);
    event LogCancelLoan(address owner_, uint blockNumber);
    event LogGetRefund(address sender, uint amount);


    mapping(address => uint) public funderContribution;

    modifier duringFundingPeriod {
        require(block.number <= fundingDeadlineBlock);
        _;
    }

    modifier stillFundable {
        require(currentBalance < loanGoal);
        _;
    }

    modifier notExceedingLoanGoal(uint fundingAmount) {
        require(currentBalance + fundingAmount <= loanGoal);
        _;
    }

    modifier goalNotReached {
        require(currentBalance != loanGoal);
        _;
    }

    modifier deadlineNotReached {
        require(block.number < fundingDeadlineBlock);
        _;
    }

    modifier deadlineExceed {
        require(block.number > fundingDeadlineBlock);
        _;
    }

    modifier refundable {
        require(loanCancelledStatus);
        _;
    }


    function Loan(
        uint loanGoal_,
        uint interestRate_,
        uint fundingDuration_,
        uint repaymentDuration_,
        uint numberOfCoupons_,
        uint activationWindow_)
    {
        loanGoal = loanGoal_;
        interestRate = interestRate_;
        fundingDuration = fundingDuration_;
        repaymentDuration = repaymentDuration_;
        numberOfCoupons = numberOfCoupons_;
        fundingDeadlineBlock = block.number + fundingDuration_;
        activationDeadlineBlock = block.number + fundingDuration_ + activationWindow_;
    }

    function fundLoan()
        duringFundingPeriod
        stillFundable
        notExceedingLoanGoal(msg.value)
        payable
        returns (uint currentBalance_)
    {
        currentBalance += msg.value;
        funderContribution[msg.sender] += msg.value;

        if(currentBalance + msg.value == loanGoal) {
            fullyFunded = true;
            LogFullyFunded(fullyFunded);
        }
        LogFundLoan(msg.sender, msg.value);
        return currentBalance;
    }

    function activateLoan() onlyOwner returns(bool isSuccess) {
        require(block.number <= activationDeadlineBlock);
        if(fullyFunded) {
            loanStartBlock = block.number;
            loanActivated = true;
            LogActivateLoan(msg.sender, block.number);
            return true;
        }
    }

    function loanNotActivatedWantRefund() public returns(bool isSuccess) {
        require(block.number > activationDeadlineBlock);
        returnFunds = true;
        LogCancelLoan(msg.sender, block.number);
        return true;
    }

    function loanFailedToGetFunded()
        public
        goalNotReached
        deadlineExceed
        returns(bool isSuccess)
    {
        returnFunds = true;
        LogLoanFailedToGetFunded(true);
        return true;
    }

    function cancelLoan()
        onlyOwner
        deadlineNotReached
        returns (bool isSuccess)
    {
        require(!loanActivated);
        loanCancelledStatus = true;
        LogCancelLoan(msg.sender, block.number);
        returnFunds = true;
        return true;
    }

    function getRefund() refundable {
        uint refundAmount = funderContribution[msg.sender];
        require(refundAmount != 0);
        funderContribution[msg.sender] = 0;
        msg.sender.transfer(refundAmount);
        LogGetRefund(msg.sender, refundAmount);
    }



// need number of coupons to be non-zero, numCoupons a multiple of repyamentDuration;
    function payIntoContract
    function getCouponPayment mapping
    function




}
