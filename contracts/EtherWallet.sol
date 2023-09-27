//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract EtherWallet {
    address payable public owner;
    constructor() {
        owner = payable(msg.sender);
    }
    function deposit() public payable {}
    
    function withdraw(address payable receiver, uint amount) public {
        require(msg.sender==owner, "sender is not the owner");
        receiver.transfer(amount);
    } 
    function balanceOf() public view returns(uint){
        return address(this).balance;
    }
}