const { expect } = require("chai");

describe("TimeLockWallet", function () {
  let contract;
  let owner;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    const TimeLockWallet = await ethers.getContractFactory("TimeLockWallet");
    contract = await TimeLockWallet.deploy(1, { value: ethers.parseEther("0.01") }); // 1 minute lock
    await contract.deployed();
  });

  it("Should not allow withdrawal before unlock time", async function () {
    await expect(contract.withdraw()).to.be.revertedWith("Assets are still locked");
  });

  it("Should allow withdrawal after unlock time", async function () {
    await new Promise(resolve => setTimeout(resolve, 61000)); // wait 61 seconds
    await expect(contract.withdraw()).to.changeEtherBalances(
      [contract, owner],
      [ethers.parseEther("-0.01"), ethers.parseEther("0.01")]
    );
  });
});
