// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract NFTWheels is ERC721, Ownable  {

    enum Marque { ALFAROMEO }
    enum Modele { MITO, GULIA }

    uint nextId = 0;

    uint256 _DEFAULTPRICE = 1 ether; // En WEI

    Car[] allNFTs;

    struct Car{
        uint id;
        string marque;
        string modele;
        address owner;
        uint256 anne;
        uint256 puissance;
        uint256 vitesseMax;
        uint256 price;
        string image;
    }

    mapping (uint => Car) private _CarDetails;

    constructor(string memory name_,string memory symbol_) ERC721(name_,symbol_){
        
    }

    function getAllNFTs()public view returns(Car[] memory){
        return allNFTs;
    }

    function mint(string memory _marque, string memory _modele, uint _anne, uint _puissance, uint _vitesseMax, string memory _img) public onlyOwner{   
        Car memory thisCar = Car(nextId, _marque, _modele, msg.sender ,_anne, _puissance, _vitesseMax, _DEFAULTPRICE, _img);
        _CarDetails[nextId] = thisCar;
        _safeMint(msg.sender,nextId);
        allNFTs.push(thisCar);
        nextId++;
    }

    function getOwnerOf(uint256 _tokenId)public view returns(address){
        return ownerOf(_tokenId);
    }

    function getNFTPrice(uint256 _tokenId) public view returns (uint256) {
        require(_exists(_tokenId), "Invalid token ID");
        Car memory thisCar = _CarDetails[_tokenId];
        return thisCar.price; 
    }

    // function setNFTPrice(uint256 _tokenId, uint256 _newPrice) public {
    //     address owner = ownerOf(_tokenId);
    //     require(msg.sender == owner, "You must be the owner of the NFT to cancel the sale");
    //     require(_exists(_tokenId), "Invalid token ID");
    //     Car storage thisCar = _CarDetails[_tokenId];
    //     thisCar.price = _newPrice;
    // }

    function setDefaultPrice(uint256 _newPrice)public onlyOwner returns(uint256){
        _DEFAULTPRICE = _newPrice;
        return _DEFAULTPRICE;
    }
}