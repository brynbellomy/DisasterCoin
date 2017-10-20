const LoanContract = artifacts.require("./LoanContract.sol");
const { expectThrow } = require("./helpers.js");
const campaignHubContract =

contract('LoanContract', (accounts) => {

  let loanContract;
  const loanOwner = accounts[0];

  const loanGoal = 100;
  const interestRate = 6;
  const fundingDuration = 10;
  const repaymentDuration = 10;
  const numberOfCoupons = 2;
  const activationWindow = 4;


  beforeEach(async () => {
    loanContract = await LoanContract.new(loanGoal, interestRate, fundingDuration,
        repaymentDuration, numberOfCoupons, activationWindow, {from: loanOwner });
  });

  it("Should be able to create a loan constract instance with desired specifications", async () => {
      var loanGoal_ = await loanContract.loanGoal()
      assert.equal(loanGoal_, loanGoal);
      var interestRate_ =  await loanContract.interestRate();
      assert.equal(interestRate_, interestRate);
      var fundingDuration_ = await loanContract.fundingDuration();
      assert.equal(fundingDuration_, fundingDuration);
      var repaymentDuration_ = await loanContract.repaymentDuration();
      assert.equal(repaymentDuration_, repaymentDuration);
      var numberOfCoupons_ = await loanContract.numberOfCoupons();
      assert.equal(numberOfCoupons_, numberOfCoupons);
  });

});
