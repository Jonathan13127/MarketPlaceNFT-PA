// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract NFTWheels is ERC721URIStorage, Ownable  {

    uint nextId = 0;

    Car[] allNFTs;

    uint256 private feePercentage = 2;

    struct Car{
        uint id;
        string name;
        address owner;
        uint256 price;
        string metadataURI;
        bool isForSale;
    }

    mapping (uint => Car) private _CarDetails;
    mapping (address => bool) private userMint; // Map if an user has already minted a nft
    IERC20 private _erc20Token;

    constructor(address erc20TokenAddress) ERC721("NFT Wheels", "NFWS") {
        _erc20Token = IERC20(erc20TokenAddress);
    }


    function getAllNFTs()public view returns(Car[] memory){
        Car[] memory allMetadata = new Car[](nextId);

        for (uint256 i = 0; i < nextId; i++) {
            Car storage nft = allNFTs[i];
            allMetadata[i] = nft;
        }

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


    function mint(string memory name,uint price, string memory metadataURI) public onlyOwner{
        Car memory thisCar = Car(nextId, name, msg.sender , price, metadataURI, false);
        _CarDetails[nextId] = thisCar;
        _safeMint(msg.sender,nextId);
        allNFTs.push(thisCar);
        _setTokenURI(nextId, metadataURI);
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

}