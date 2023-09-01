const LendingPlatform = artifacts.require('LendingPlatform'); // Import your contract

contract('LendingPlatform', (accounts) => {
  let lendingPlatformInstance;

  before(async () => {
    lendingPlatformInstance = await LendingPlatform.deployed();
  });

  it('should allow a user to borrow funds', async () => {
    const borrower = accounts[1]; // Replace with the address of a Metamask account
    const amountToBorrow = web3.utils.toWei('1', 'ether'); // Convert 1 Ether to Wei

    await lendingPlatformInstance.borrow({ from: borrower, value: amountToBorrow });

    const borrowerBalance = await lendingPlatformInstance.borrowerBalances(borrower);
    assert.equal(borrowerBalance.toString(), amountToBorrow.toString(), 'Borrowed amount is incorrect');
  });

  it('should allow a user to lend funds', async () => {
    const lender = accounts[2]; // Replace with the address of another Metamask account
    const amountToLend = web3.utils.toWei('2', 'ether'); // Convert 2 Ether to Wei

    await lendingPlatformInstance.lend({ from: lender, value: amountToLend });

    const lenderBalance = await lendingPlatformInstance.lenderBalances(lender);
    assert.equal(lenderBalance.toString(), amountToLend.toString(), 'Lent amount is incorrect');
  });
});
