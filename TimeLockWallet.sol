// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TimeLockWallet {
    address public owner;
    uint public unlockTime;

    constructor(uint _durationInMinutes) payable {
        require(msg.value > 0, "Deposit required");
        owner = msg.sender;
        unlockTime = block.timestamp + (_durationInMinutes * 1 minutes);
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        require(block.timestamp >= unlockTime, "Assets are still locked");
        payable(owner).transfer(address(this).balance);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }

    function timeRemaining() external view returns (uint) {
        if (block.timestamp >= unlockTime) {
            return 0;
        }
        return unlockTime - block.timestamp;
    }
}
