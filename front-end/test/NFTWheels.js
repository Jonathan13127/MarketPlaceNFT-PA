const { expect } = require("chai");
const { ethers } = require("hardhat");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("NFTWheels contract", function () {
    // We define a fixture to reuse the same setup in every test. We use
    // loadFixture to run this setup once, snapshot that state, and reset Hardhat
    // Network to that snapshot in every test.
    async function deployNFTWheelsFixture() {
      // Get the ContractFactory and Signers here.
      const NFTWheels = await ethers.getContractFactory("NFTWheels");
      const [owner, addr1, addr2, addr3] = await ethers.getSigners();
  
      const hardNFTWheels = await NFTWheels.deploy("NFTWheels", "NFW");
  
      await hardNFTWheels.deployed();
  
      const amount = "1";

      const img = "";
  
      // Fixtures can return anything you consider useful for your tests
      return { NFTWheels, hardNFTWheels, owner, addr1, addr2, addr3, amount, img };
    }
  
    // You can nest describe calls to create subsections.
    describe("Deployment", function () {

      it("Should mint 1 NFT", async function(){
        const { hardNFTWheels, owner, addr1, amount, img} = await loadFixture(deployNFTWheelsFixture);

        await hardNFTWheels.connect(owner).mint("ALFAROMEO", "MITO", 2010, 120,210, img);
      });
    }); 

        // You can nest describe calls to create subsections.
    describe("Sell / Buy / GET Price of a NFT", function () {

        it("Should get price of a NFT", async function(){
            const { hardNFTWheels, owner, addr1, amount, img} = await loadFixture(deployNFTWheelsFixture);

            await hardNFTWheels.connect(owner).mint("ALFAROMEO", "MITO", 2010, 120, 210, img);
      
            console.log(await hardNFTWheels.connect(owner).getNFTPrice(0));
              // expect(await hardNFTWheels.connect(owner).getCarforSell().length).equal(1)
        });
    });

    // describe("Change Default price ", function () {

    //   it("Should  change the default price ", async function(){
    //       const { hardNFTWheels, owner, addr1, amount} = await loadFixture(deployNFTWheelsFixture);

    //       await hardNFTWheels.connect(owner).mint("ALFAROMEO", "MITO", 2010, 120, 210);
    
    //       expect(await hardNFTWheels.connect(owner).setDefaultPrice(5.0) == ethers.utils.parseEther("5.0"))

    //       await hardNFTWheels.connect(owner).mint("ALFAROMEO", "MITO 2", 2018, 170, 260);

    //       console.log(await hardNFTWheels.connect(owner).getNFTPrice(1));
    //   });
    // }); 

    // describe("Test",function(){
    //   it("Test d'envoie ether",async function(){
    //     const { hardNFTWheels, owner, addr1, amount} = await loadFixture(deployNFTWheelsFixture);

    //     await hardNFTWheels.connect(owner).test(1*10^18);

    //   });
    // })

    // describe("Withdraw",async function(){
    //     it("Should get all the funds via owner",async function(){
    //         const { hardNFTWheels, owner, addr1,amount} = await loadFixture(deployNFTWheelsFixture);

    //         await hardNFTWheels.connect(owner).addFunds({value: ethers.utils.parseEther(amount)});

    //         expect(await hardNFTWheels.getBalance()).to.equal(ethers.utils.parseEther(amount));


    //         await hardNFTWheels.connect(owner).withDrawEther();

    //         expect(await hardNFTWheels.getBalance()).to.equal(ethers.utils.parseEther("0.0"));

    //     });
    // });

    // describe("Bet",function(){
            
    //         it("Should bet on a side", async function () {
    //             const { hardNFTWheels, owner, addr1,amount } = await loadFixture(deployNFTWheelsFixture);
    //             //const ownerBalance = await hardhatBet.balanceOf(owner.address);

    //             await hardNFTWheels.connect(owner).addFunds({value: ethers.utils.parseEther("3000.0")});

    //             console.log(await hardNFTWheels.getBalance())

    //             await hardNFTWheels.connect(owner).bet(0,{value: ethers.utils.parseEther(amount)})

    //             console.log(await hardNFTWheels.getBalance())
        
    //         });
    //     });
});