// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the ERC20 contract from the OpenZeppelin library
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NFWS is ERC20{

    constructor() ERC20("NFT Wheels", "NFWS") {
        // Mint initial tokens and assign to contract creator
        _mint(msg.sender, 2000*10**18);
    }
}