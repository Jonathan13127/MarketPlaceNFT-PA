// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const NFTWheels = await hre.ethers.getContractFactory("NFTWheels");
  const nFTWheels = await NFTWheels.deploy("NFTWheels", "NFW");

  const [owner, addr1, addr2, addr3] = await ethers.getSigners();


  await nFTWheels.deployed();

  // Faire un Json contenant des objet Car prêt aêtre minter

  console.log("NFTWheels deployed to:", nFTWheels.address);

  for(let i = 0; i<10;i+=1){

    await nFTWheels.connect(owner).mint("ALFAROMEO", `MITO ${i}`, 2010, 120+i, 210, "");
    console.log(`${i} NFT successfully deployed.`);

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
