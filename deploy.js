const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const TimeLockWallet = await hre.ethers.getContractFactory("TimeLockWallet");

  const contract = await TimeLockWallet.deploy(5, { value: hre.ethers.parseEther("0.1") }); // 5 minutes lock, 0.1 ETH

  await contract.deployed();
  console.log(`TimeLockWallet deployed to: ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
