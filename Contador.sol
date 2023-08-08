// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Contador{

    uint counter = 0;
    address owner;

    modifier onlyOwner {
        require(msg.sender == owner, "This method only callable by owner.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function getCounter() external view returns (uint) {
        return counter;
    }

    function upCounter() external  returns (bool) {
        counter++;
        return true;
    }

    function downCounter() external returns (bool) {
        counter--;
        return true;
    }

    function setCounterToZero() external onlyOwner {
        counter = 0;
    }
}
