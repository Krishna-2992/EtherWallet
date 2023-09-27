require("@nomicfoundation/hardhat-toolbox");

task(
  'accounts', 
  'prints the list of accounts and their balances',
  async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()
    for(const account of accounts) {
      const balance = await account.getBalance();
      console.log(account.address, ": ", balance);
    }
  }
)

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 1337
    },
    // sepolia: {
    //   // url: 'http/'

    // }
  }
};
