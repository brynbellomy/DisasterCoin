pragma solidity 0.4.15;

import "./Owned.sol";
import "./LoanHub.sol";

contract LoanContract is Owned {
    address public loanHubInstanceAddress;
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

    uint public obligationRepaid;
    uint public obligationOwed;

    address[] public bondSellerAddresses;

    event LogFundLoan(address sender, uint amount);
    event LogFullyFunded(bool isFunded);
    event LogActivateLoan(address owner_, uint blockNumber);
    event LogLoanFailedToGetFunded(bool loanStatus);
    event LogCancelLoan(address owner_, uint blockNumber);
    event LogGetRefund(address sender, uint amount);
    event LogLoanFullyPaidOff(address owner_, uint blockNumber);
    event LogReceiveCouponPayment(address sender, uint amountOfCouponPaid);
    event LogReceivePrincipalPayment(address sender, uint amountOfPrincipalPaid);
    event LogDeclareLoanCancelled(address sender, uint blockNumber);
    event LogDeclareLoanPaid(address sender, uint blockNumber);
    event LogDeclareLoanDefaulted(address sender, uint blockNumber);
    event LogSellBondFirstTime(address sender, uint sellPrice, uint blockNumber);
    event LogSellBondChangePrice(address sender, uint sellPrice, uint blockNumber);
    event LogSellBondStopSelling(address sender, uint blockNumber);

    struct SellerInfo {
        bool sellingOrNot;
        uint sellPrice;
        uint arrayIndex;
    }

    mapping(address => uint) public funderContribution;
    mapping(address => uint) public funderCouponReceived;
    mapping(address => bool) public funderPrincipalReceived;
    mapping(address => uint) public bondholderSellPrice;
    mapping(address => SellerInfo) public bondholderPrice;

    modifier duringFundingPeriod { require(block.number <= fundingDeadlineBlock); _; }
    modifier stillFundable { require(currentBalance < loanGoal); _; }
    modifier notExceedingLoanGoal(uint fundingAmount) { require(currentBalance + fundingAmount <= loanGoal); _; }
    modifier goalNotReached { require(currentBalance != loanGoal); _; }
    modifier deadlineNotReached { require(block.number < fundingDeadlineBlock); _; }
    modifier deadlineExceed { require(block.number > fundingDeadlineBlock); _; }
    modifier refundable { require(loanCancelledStatus); _; }
    modifier paymentPeriod { require(block.number > loanStartBlock); _; }


    function LoanContract(
        uint loanGoal_,
        uint interestRate_,
        uint fundingDuration_,
        uint repaymentDuration_,
        uint numberOfCoupons_,
        uint activationWindow_)
    {
        require((loanGoal_ != 0) && (interestRate_ != 0) && (fundingDuration_ != 0)
            && (repaymentDuration_ !=0) && (numberOfCoupons_ != 0));
        require(repaymentDuration_ % numberOfCoupons_ == 0);

        loanHubInstanceAddress = msg.sender; // implies deployment from loanHubContract
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
            obligationOwed = loanGoal * (100 + interestRate) / 100;
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
        LoanHub loanHubInstance = LoanHub(loanHubInstanceAddress);
        loanHubInstance.declareLoanCancelled(owner);
        LogDeclareLoanCancelled(msg.sender, block.number);
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

    function payLoan() payable onlyOwner paymentPeriod returns(uint obligationRemaining_) {
        require(msg.value != 0);
        obligationRepaid += msg.value;
        if(obligationRepaid >= obligationOwed) LogLoanFullyPaidOff(msg.sender, block.number);
        return int(obligationOwed - obligationRepaid) > 0 ? obligationOwed - obligationRepaid : 0;
    }

    function refundExcessLoanPayment() onlyOwner paymentPeriod returns(bool isSuccess) {
        require(obligationRepaid > obligationOwed);
        uint refundAmount = obligationRepaid - obligationOwed;
        msg.sender.transfer(refundAmount);
        return true;
    }

    function receiveCouponPayment() paymentPeriod returns(bool isSuccess) {
        require(funderContribution[msg.sender] != 0);
        uint numberOfCouponsElapsed = (block.number - loanStartBlock) / (repaymentDuration / numberOfCoupons);
        uint amountOfCouponsPaid = funderCouponReceived[msg.sender];
        uint amountOfCouponsDeserved = funderContribution[msg.sender] * numberOfCouponsElapsed / numberOfCoupons;
        uint amountPaid = amountOfCouponsDeserved - amountOfCouponsPaid;
        funderCouponReceived[msg.sender] += amountPaid;
        msg.sender.transfer(amountPaid);
        LogReceiveCouponPayment(msg.sender, amountPaid);
        return true;
    }

    function receivePrincipalPayment() paymentPeriod returns(bool isSuccess) {
        require(funderContribution[msg.sender] != 0);
        require(!funderPrincipalReceived[msg.sender]);
        funderPrincipalReceived[msg.sender] = true;
        msg.sender.transfer(funderContribution[msg.sender]);
        LogReceivePrincipalPayment(msg.sender, funderContribution[msg.sender]);
        return true;
    }

    function declareLoanPaid() public returns(bool) {
        require(obligationRepaid >= obligationOwed);
        LoanHub loanHubInstance = LoanHub(loanHubInstanceAddress);
        loanHubInstance.declareLoanPaid(owner);
        LogDeclareLoanPaid(msg.sender, block.number);
        return true;
    }

    function declareLoanDefaulted() public returns(bool) {
        // only callable after the loan repayment end date has finished, not callable for defaulted coupon payments
        require((obligationRepaid < obligationOwed) &&
            (block.number > loanStartBlock + fundingDuration));
        LoanHub loanHubInstance = LoanHub(loanHubInstanceAddress);
        loanHubInstance.declareLoanDefaulted(owner);
        LogDeclareLoanDefaulted(msg.sender, block.number);
        return true;
    }

    function sellBond(uint sellPrice) public returns(bool sellingStatus) {
        SellerInfo storage seller = bondholderPrice[msg.sender];
        if(!seller.sellingOrNot) { // if not already selling selling
            require(sellPrice != 0);
            // selling for first time
            seller.sellingOrNot = true;
            seller.sellPrice = sellPrice;
            seller.arrayIndex = bondSellerAddresses.push(msg.sender) - 1;
            LogSellBondFirstTime(msg.sender, sellPrice, block.number);
        } else { // already selling
            if(sellPrice != 0) { // change price
                seller.sellPrice = sellPrice;
                LogSellBondChangePrice(msg.sender,sellPrice, block.number);
            } else { // stop selling
                uint arrayIndex = seller.arrayIndex;
                delete bondholderPrice[msg.sender];
                address movedSellerAddress = bondSellerAddresses[bondSellerAddresses.length - 1];
                SellerInfo storage updatedSeller = bondholderPrice[movedSellerAddress];
                updatedSeller.arrayIndex = arrayIndex;
                bondSellerAddresses[arrayIndex] = movedSellerAddress;
                bondSellerAddresses.length--;
                LogSellBondStopSelling(msg.sender, block.number);
            }
        }
        return seller.sellingOrNot;
    }

    function getIthBonderSeller(uint _arrayIndex) constant returns(address ithAddress){
        return bondSellerAddresses[_arrayIndex];
    }


}

/*
    function getIthBonderSeller();// constant // return address of the ith

    function getBondSellerPrice(address bondSellerAddress); //constant
    // return seller price, value left bond (coupon + principal)

    function buyBond(address bondSellerAddress); //payable
    // called by bond purchaser
    // if payment is equal to selling price, then update everything
    */
