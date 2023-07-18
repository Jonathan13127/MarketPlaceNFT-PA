// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
async function main() {

  const Token = await hre.ethers.getContractFactory("NFWS")
  const token = await Token.deploy()
  console.log(token.address)


  // We get the contract to deploy
  const NFTWheels = await hre.ethers.getContractFactory("NFTWheels");
  const nFTWheels = await NFTWheels.deploy(token.address);
  const metadatas = require("../nft-wheels.json")

  const [owner, addr1, addr2, addr3] = await ethers.getSigners();

  await nFTWheels.deployed();

  const stringifiedData = JSON.stringify(metadatas);
  const parsedData = JSON.parse(stringifiedData);
  console.log(parsedData)

  console.log("NFTWheels deployed to:", nFTWheels.address);
  console.log(parsedData.length)

  for (let i = 0; i < parsedData.length; i++) {
    const price = ethers.utils.parseEther('1')
    await nFTWheels.connect(owner).mint(parsedData[i].name, price,parsedData[i].uri);
    console.log(`${parsedData[i].name} NFT successfully deployed.`);
  }

  for (let i = 0; i < parsedData.length; i++) {
    const price = ethers.utils.parseEther('1')
    await nFTWheels.connect(owner).mint(parsedData[i].name, price,parsedData[i].uri);
    console.log(`${parsedData[i].name} NFT successfully deployed.`);
  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
