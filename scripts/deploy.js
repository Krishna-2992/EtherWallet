const hre = require("hardhat");

async function main() {
  const EtherWallet = await hre.ethers.getContractFactory("EtherWallet")
  const etherWallet = await EtherWallet.deploy()
  etherWallet.deployed()

  console.  log("ether wallet deployed at address:", etherWallet.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
