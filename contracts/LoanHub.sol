pragma solidity ^0.4.15;

import "./Owned.sol";
import "./LoanContract.sol";

contract LoanHub is Owned {
    event LogDeployNewLoan(
        address loanCreator,
        address loanContractAddress,
        uint loanGoal,
        uint interestRate,
        uint fundingDuration,
        uint repaymentDuration,
        uint numberOfCoupons,
        uint activationWindow);

    struct LoanDescription {
        uint loanGoal;
        uint interestRate;
        uint fundingDuration;
        uint repaymentDuration;
        uint numberOfCoupons;
        uint activationWindow;
    }

    mapping(address => LoanDescription[]) public borrowerAllLoans;
    mapping(address => LoanDescription[]) public borrowerExistingLoans;
    mapping(address => LoanDescription[]) public borrowerPaidLoans;
    mapping(address => LoanDescription[]) public borrowerDefaultedLoans;

    function deployNewLoan(
        uint loanGoal_,
        uint interestRate_,
        uint fundingDuration_,
        uint repaymentDuration_,
        uint numberOfCoupons_,
        uint activationWindow_)
        //returns()
    {
        LoanContract loanContract = new LoanContract(loanGoal_, interestRate_,
            fundingDuration_, repaymentDuration_, numberOfCoupons_, activationWindow_);
        loanContract.changeOwner(msg.sender);
        LogDeployNewLoan(msg.sender, loanContract, loanGoal_, interestRate_,
            fundingDuration_, repaymentDuration_, numberOfCoupons_, activationWindow_);

        // update data and then log it
    }




}
// figure out credit score/history
// have loanContract update its score
