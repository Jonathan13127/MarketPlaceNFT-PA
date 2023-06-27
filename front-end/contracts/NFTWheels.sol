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
        bool isForSale;
    }

    mapping (uint => Car) private _CarDetails;
    mapping (address => bool) private userMint; // Map if an user has already minted a nft


    constructor(string memory name_,string memory symbol_) ERC721(name_,symbol_){}

    function getAllNFTs()public view returns(Car[] memory){
        return allNFTs;
    }

    function getAllNFTsAvailable()public view returns(Car[] memory){
        Car[] memory allNFTsAvailable = new Car[](allNFTs.length);
        address owner = owner();
        for(uint i = 0; i < allNFTs.length; i+=1){
            if(allNFTs[i].owner == owner){
                allNFTsAvailable[i] = allNFTs[i];
            }
        }
        return allNFTsAvailable;
    }


    function mint(string memory _marque, string memory _modele, uint _anne, uint _puissance, uint _vitesseMax, string memory _img) public onlyOwner{   
        Car memory thisCar = Car(nextId, _marque, _modele, msg.sender ,_anne, _puissance, _vitesseMax, _DEFAULTPRICE, _img, false);
        _CarDetails[nextId] = thisCar;
        _safeMint(msg.sender,nextId);
        allNFTs.push(thisCar);
        nextId++;
    }

    function getOwnerOf(uint256 _tokenId)public view returns(address){
        return ownerOf(_tokenId);
    }

    function getOwner()public view returns(address){
        return owner();
    }

    function getNFTPrice(uint256 _tokenId) public view returns (uint256) {
        require(_exists(_tokenId), "Invalid token ID");
        Car memory thisCar = _CarDetails[_tokenId];
        return thisCar.price; 
    }

    function _sell(uint256 _tokenId) public returns(string memory){
        require(_isApprovedOrOwner(msg.sender, _tokenId), "Caller is not owner nor approved");
        require(!_CarDetails[_tokenId].isForSale, "NFT is already for sale");
        _CarDetails[_tokenId].isForSale = true; // <= modifications dans le mapping
        Car storage thisCar = allNFTs[_tokenId]; // <= modifications dans le array
        thisCar.isForSale = true; 
        return "Ici";
    }

    function removeFromSell(uint256 _tokenId) public {
        require(_CarDetails[_tokenId].owner == ownerOf(_tokenId));
        require(_CarDetails[_tokenId].isForSale, "NFT is not for sale");
        _CarDetails[_tokenId].isForSale = false; // <= modifications dans le mapping
        Car storage thisCar = allNFTs[_tokenId]; // <= modifications dans le array
        thisCar.isForSale = false; 
    }

    function _buy(uint256 _tokenId) public payable {
        Car storage thisCar = allNFTs[_tokenId]; // <= modifications dans le array
        require(_CarDetails[_tokenId].isForSale, "NFT is not for sale");
        require(msg.value == _CarDetails[_tokenId].price, "Incorrect payment amount");
        address seller = ownerOf(_tokenId);
        require(msg.sender != seller, "Owner can't sell NFT for himself");
        _transfer(seller, msg.sender, _tokenId);
        _CarDetails[_tokenId].isForSale = false;
        _CarDetails[_tokenId].owner = msg.sender;
        thisCar.isForSale = false;
        thisCar.owner = msg.sender;
        payable(seller).transfer(msg.value);
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