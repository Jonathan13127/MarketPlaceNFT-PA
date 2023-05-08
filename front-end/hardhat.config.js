require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
const SEPOLIA_RPC = process.env.SEPOLIA_RPC;
const privateKey = process.env.PRIVATE_KEY;
const alchemyPrivateKey= process.env.ALCHEMY_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  paths:{
    artifacts: "./src/artifacts"
  },
  networks:{
    hardhat:{
      chainId:1337
    },
    sepolia: {
      url: SEPOLIA_RPC+alchemyPrivateKey,
      accounts: [privateKey],
      chainId: 11155111,
    }
  },     
  gas: 21000000,
  gasPrice: 8000000000
};