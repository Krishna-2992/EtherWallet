const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("EtherWallet", () => {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const EtherWallet = await ethers.getContractFactory("EtherWallet");
    const etherWallet = await EtherWallet.deploy();
    etherWallet.deployed();
    return { etherWallet, owner, otherAccount };
  }

  describe("deployment", () => {
    it("should deploy the contract and set the owner to be deployer", async function () {
      const { etherWallet, owner } = await loadFixture(deployFixture);
      expect(await etherWallet.owner()).to.equal(owner.address);
    });
  });

  describe("deposit", () => {
    it("should deposit ether to the contract", async () => {
      const { etherWallet } = await loadFixture(deployFixture);
      const tx = await etherWallet.deposit({
        value: ethers.utils.parseEther("1"),
      });
      await tx.wait();
      const balance = await ethers.provider.getBalance(etherWallet.address);
      expect(balance).to.equal(ethers.utils.parseEther("1"));
    });
  });
  
  describe("withdraw", () => {
    it("should be able to withdraw ethers", async () => {
      const { etherWallet, owner } = await loadFixture(deployFixture);
      const depositTx = await etherWallet.deposit({
        value: ethers.utils.parseEther("100"),
      });
      await depositTx.wait();
      const withdrawTx = await etherWallet.withdraw(
        owner.address,
        ethers.utils.parseEther("50")
      );
      await withdrawTx.wait();
      let balance = await ethers.provider.getBalance(etherWallet.address);
      console.log("balance is ", balance);
      expect(balance).to.equal(ethers.utils.parseEther("50"));
    });
    it("should revert if called by someone other than owner", async ()=> {
        const { etherWallet, owner, otherAccount } = await loadFixture(deployFixture);
        await expect(
            etherWallet
            .connect(otherAccount)
            .withdraw(otherAccount.address, ethers.utils.parseEther('0'))
        ).to.be.revertedWith('sender is not the owner')
    })
  });
  describe("balanceOf", () => {
    it("should give the proper balance of the contract", async () => {
      const { etherWallet, owner } = await loadFixture(deployFixture);
      const depositTx = await etherWallet.deposit({
        value: ethers.utils.parseEther("100"),
      });
      await depositTx.wait();
      const balance = await etherWallet.balanceOf();
      expect(balance).to.equal(ethers.utils.parseEther("100"));
    });
  });
});

