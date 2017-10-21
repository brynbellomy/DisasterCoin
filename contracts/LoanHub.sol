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
        address loanContractAddress;
        uint loanGoal;
        uint interestRate;
        uint fundingDuration;
        uint repaymentDuration;
        uint numberOfCoupons;
        uint activationWindow;
    }

    mapping(address => LoanDescription[]) public borrowerAllLoans;
    mapping(address => LoanDescription[]) public borrowerExistingLoans;
    mapping(address => LoanDescription[]) public borrowerCancelledLoans;
    mapping(address => LoanDescription[]) public borrowerPaidLoans;
    mapping(address => LoanDescription[]) public borrowerDefaultedLoans;

    event LogDeployNewLoan(address loanCreator, address loanContractAddress,
        uint loanGoal, uint loanRate, uint loanFundingDuration,
        uint loanRepaymentDuration, uint loanNumberOfCoupons, uint activationWindow);
    event LogDeclareLoanCancelled(address loanCreator, address loanContractAddress,
            uint loanGoal, uint loanRate, uint loanFundingDuration,
            uint loanRepaymentDuration, uint loanNumberOfCoupons, uint activationWindow);
    event LogDeclareLoanPaid(address loanCreator, address loanContractAddress,
            uint loanGoal, uint loanRate, uint loanFundingDuration,
            uint loanRepaymentDuration, uint loanNumberOfCoupons, uint activationWindow);
    event LogDeclareLoanDefaulted(address loanCreator, address loanContractAddress,
            uint loanGoal, uint loanRate, uint loanFundingDuration,
            uint loanRepaymentDuration, uint loanNumberOfCoupons, uint activationWindow);

    function deployNewLoan(
        uint loanGoal_,
        uint interestRate_,
        uint fundingDuration_,
        uint repaymentDuration_,
        uint numberOfCoupons_,
        uint activationWindow_)
        returns(bool isSuccess)
    {
        LoanContract loanContract = new LoanContract(loanGoal_, interestRate_,
            fundingDuration_, repaymentDuration_, numberOfCoupons_, activationWindow_);
        loanContract.changeOwner(msg.sender);
        LoanDescription memory loanDescription = LoanDescription(loanContract,
            loanGoal_, interestRate_, fundingDuration_, repaymentDuration_, numberOfCoupons_,
            activationWindow_);
        borrowerAllLoans[msg.sender].push(loanDescription);
        borrowerExistingLoans[msg.sender].push(loanDescription);
        LogDeployNewLoan(msg.sender, loanContract, loanGoal_, interestRate_,
            fundingDuration_, repaymentDuration_, numberOfCoupons_, activationWindow_);
        return true;
    }

    function declareLoanCancelled(address loanOwner_) public returns(bool) { // security issue if loan owner changes owner
        require(borrowerAllLoans[loanOwner_].length != 0);
        address loanInstanceAddress = msg.sender;
        uint numberOfLoans = borrowerExistingLoans[loanOwner_].length;
        for(uint i = 0; i < numberOfLoans; i++) { // security concern about gas limit
            if(loanInstanceAddress == borrowerExistingLoans[loanOwner_][i].loanContractAddress) {
                LoanDescription storage loanDescriptionStruct = borrowerExistingLoans[loanOwner_][numberOfLoans - 1];
                borrowerExistingLoans[loanOwner_][i] = loanDescriptionStruct;
                borrowerExistingLoans[loanOwner_].length--;
                borrowerCancelledLoans[loanOwner_].push(loanDescriptionStruct);
                LogDeclareLoanCancelled(
                    loanOwner_,
                    loanInstanceAddress,
                    loanDescriptionStruct.loanGoal,
                    loanDescriptionStruct.interestRate,
                    loanDescriptionStruct.fundingDuration,
                    loanDescriptionStruct.repaymentDuration,
                    loanDescriptionStruct.numberOfCoupons,
                    loanDescriptionStruct.activationWindow);
                return true;
            }
        }
        return false; // only happens if owner changes owner;
    }

    function declareLoanPaid(address loanOwner_) public returns(bool) { // security issue if loan owner changes owner
        require(borrowerAllLoans[loanOwner_].length != 0);
        address loanInstanceAddress = msg.sender;
        uint numberOfLoans = borrowerExistingLoans[loanOwner_].length;
        for(uint i = 0; i < numberOfLoans; i++) { // security concern about gas limit
            if(loanInstanceAddress == borrowerExistingLoans[loanOwner_][i].loanContractAddress) {
                LoanDescription storage loanDescriptionStruct = borrowerExistingLoans[loanOwner_][numberOfLoans - 1];
                borrowerExistingLoans[loanOwner_][i] = loanDescriptionStruct;
                borrowerExistingLoans[loanOwner_].length--;
                borrowerPaidLoans[loanOwner_].push(loanDescriptionStruct);
                LogDeclareLoanPaid(
                    loanOwner_,
                    loanInstanceAddress,
                    loanDescriptionStruct.loanGoal,
                    loanDescriptionStruct.interestRate,
                    loanDescriptionStruct.fundingDuration,
                    loanDescriptionStruct.repaymentDuration,
                    loanDescriptionStruct.numberOfCoupons,
                    loanDescriptionStruct.activationWindow);
                return true;
            }
        }
        return false; // only happens if owner changes owner;
    }

    function declareLoanDefaulted(address loanOwner_) public returns(bool) { // security issue if loan owner changes owner
        require(borrowerAllLoans[loanOwner_].length != 0);
        address loanInstanceAddress = msg.sender;
        uint numberOfLoans = borrowerExistingLoans[loanOwner_].length;
        for(uint i = 0; i < numberOfLoans; i++) { // security concern about gas limit
            if(loanInstanceAddress == borrowerExistingLoans[loanOwner_][i].loanContractAddress) {
                LoanDescription storage loanDescriptionStruct = borrowerExistingLoans[loanOwner_][numberOfLoans - 1];
                borrowerExistingLoans[loanOwner_][i] = loanDescriptionStruct;
                borrowerExistingLoans[loanOwner_].length--;
                borrowerDefaultedLoans[loanOwner_].push(loanDescriptionStruct);
                LogDeclareLoanDefaulted(
                    loanOwner_,
                    loanInstanceAddress,
                    loanDescriptionStruct.loanGoal,
                    loanDescriptionStruct.interestRate,
                    loanDescriptionStruct.fundingDuration,
                    loanDescriptionStruct.repaymentDuration,
                    loanDescriptionStruct.numberOfCoupons,
                    loanDescriptionStruct.activationWindow);
                return true;
            }
        }
        return false; // only happens if owner changes owner;
    }


}

// figure out credit score/history
// have loanContract update its score
