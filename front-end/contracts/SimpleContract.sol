// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SimpleContract {
    uint256 public value;

    function setValue(uint256 _value) public {
        console.log("Changing value from '%s' to '%s'", value, _value);
        value = _value;
    }

    function addFunds() public payable{

    }

    function getBalance() external view returns (uint){
        return address(this).balance;
    }
}