const { expect } = require("chai");
const { ethers } = require("hardhat");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("SimpleContract contract", function () {
    // We define a fixture to reuse the same setup in every test. We use
    // loadFixture to run this setup once, snapshot that state, and reset Hardhat
    // Network to that snapshot in every test.
    async function deploySimpleContractFixture() {
      // Get the ContractFactory and Signers here.
      const SimpleContract = await ethers.getContractFactory("SimpleContract");
      const [owner, addr1, addr2, addr3] = await ethers.getSigners();
  
      const hardSimpleContract = await SimpleContract.deploy();
  
      await hardSimpleContract.deployed();
  
      const amount = "1";
  
      // Fixtures can return anything you consider useful for your tests
      return { SimpleContract, hardSimpleContract, owner, addr1, addr2, addr3,amount };
    }
  
    // You can nest describe calls to create subsections.
    describe("Deployment", function () {
      // `it` is another Mocha function. This is the one you use to define each
      // of your tests. It receives the test name, and a callback function.
      //
      // If the callback function is async, Mocha will `await` it.
    //   it("Should set the right owner", async function () {
    //     // We use loadFixture to setup our environment, and then assert that
    //     // things went well
    //     const { hardSimpleContract, owner } = await loadFixture(deploySimpleContractFixture);
  
    //     expect(await hardSimpleContract.owner()).to.equal(owner.address);
    //     console.log(await hardSimpleContract.getOwner());
    //   });

      it("Should add funds", async function(){
        const { hardSimpleContract, owner, addr1, amount} = await loadFixture(deploySimpleContractFixture);

        await hardSimpleContract.connect(owner).addFunds({value: ethers.utils.parseEther(amount)});

        expect(await hardSimpleContract.getBalance()).to.equal(ethers.utils.parseEther(amount));

      });
    }); 

    // describe("Withdraw",async function(){
    //     it("Should get all the funds via owner",async function(){
    //         const { hardSimpleContract, owner, addr1,amount} = await loadFixture(deploySimpleContractFixture);

    //         await hardSimpleContract.connect(owner).addFunds({value: ethers.utils.parseEther(amount)});

    //         expect(await hardSimpleContract.getBalance()).to.equal(ethers.utils.parseEther(amount));


    //         await hardSimpleContract.connect(owner).withDrawEther();

    //         expect(await hardSimpleContract.getBalance()).to.equal(ethers.utils.parseEther("0.0"));

    //     });
    // });

    // describe("Bet",function(){
            
    //         it("Should bet on a side", async function () {
    //             const { hardSimpleContract, owner, addr1,amount } = await loadFixture(deploySimpleContractFixture);
    //             //const ownerBalance = await hardhatBet.balanceOf(owner.address);

    //             await hardSimpleContract.connect(owner).addFunds({value: ethers.utils.parseEther("3000.0")});

    //             console.log(await hardSimpleContract.getBalance())

    //             await hardSimpleContract.connect(owner).bet(0,{value: ethers.utils.parseEther(amount)})

    //             console.log(await hardSimpleContract.getBalance())
        
    //         });
    //     });
});