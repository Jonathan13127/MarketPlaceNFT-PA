import { useEffect, useState } from 'react';
import NFTWheels from '../../artifacts/contracts/NFTWheels.sol/NFTWheels.json';
import NFWS from '../../artifacts/contracts/NFWS.sol/NFWS.json'
import {bmwM4, Ferrari} from './Assets';
import { NFTWheelsAddress } from "../../Informations"
import { ContractResultDecodeError, useAccount } from 'wagmi'
import { CarDetails } from '../CarDetails';
import { FaEthereum } from 'react-icons/fa';
import axios from "axios";

const ethers = require("ethers")

export const Card = () => {

    const [nfts, setAllNfts] = useState([]);
    const { isConnected, address } = useAccount()

    useEffect(() => {
        getAllNFTs();
    }, [isConnected])

    async function getAllNFTs() {
        if (isConnected === true) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(NFTWheelsAddress, NFTWheels.abi, provider);
            const data = await contract.getAllNFTs({ from: accounts[0] });
            console.log(data)
            var listeNftsRecu = [];
            for (var i = 0; i < data.length; i++) {
                listeNftsRecu.push(await deserialize(data[i]));
            }
            try {
                setAllNfts(listeNftsRecu);
            } catch (err) {
                //console.log(err);
            }
        }
        console.log(nfts)
    }

    async function buyNFT(id, price) {
        if (isConnected) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(NFTWheelsAddress, NFTWheels.abi, signer);
            const transaction = await contract._buy(id, { from: accounts[0], value: price });
            await transaction.wait();
            getAllNFTs();
        }
    }

    async function sellNFT(id) {
        if (isConnected) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(NFTWheelsAddress, NFTWheels.abi, signer);
            const data = await contract._sell(id, { from: accounts[0] });
            await data.wait();
            getAllNFTs();
        }
    }

    async function removeSellNFT(id) {
        console.log(id);
        if (isConnected) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(NFTWheelsAddress, NFTWheels.abi, signer);
            const data = await contract.removeFromSell(id, { from: accounts[0] });
            await data.wait();
            getAllNFTs();
        }
    }

    async function deserialize(objet) {

        const response = await axios.get(objet.metadataURI.toString())
        const data = response.data

        const newObjet = {
            id: objet.id.toString(),name:data.name,img:data.image,
            owner: objet.owner,
            puissance:data.attributes[3].puissance,
            vitesseMax:data.attributes[4].vitesseMax,
            price:objet.price.toString(),
            isForSale:objet.isForSale
        }
        console.log("Dese", newObjet)

        return newObjet;
    }

    return (
        <div id="buy" className='w-100 flex justify-center align-center mt-1 flex-wrap mx-[20px]'>
            {!isConnected && <h5 className='text-white text-4xl font-bold z-10 mt-12 '>Veuillez vous connecter à votre wallet</h5>}
            {isConnected &&
                nfts.map(nft =>
                    <div key={nft.id.toString()} className='mt-3 mx-3'>
                        <div className="card card-compact w-96 bg-[#656C6D] shadow-xl text-white">
                            <figure><img src={nft.img} alt="NFW" /></figure>
                            <div className="card-body flex align-center">
                                <h2 className="card-title">
                                    {nft.name}

                                    {!nft.isForSale && nft.owner != address &&
                                        <div className="badge badge-primary">
                                            Indisponible
                                        </div>
                                    }
                                    {nft.owner == address &&
                                        <div className="badge badge-accent">
                                            Owner
                                        </div>
                                    }
                                    {nft.isForSale &&
                                        <div className="badge badge-secondary">
                                            Disponible
                                        </div>
                                    }
                                </h2>

                                <p className='text-lg'>
                                    {nft.puissance}ch - {nft.vitesseMax}km/h
                                </p>

                                <div className="card-actions justify-end">

                                    <p className=' w-1 flex justify-center align-center text-5xl text-black'>
                                        {nft.price/10**18}<FaEthereum size={50} />
                                    </p>

                                    {address != nft.owner && nft.isForSale == true &&
                                        <button onClick={() => { buyNFT(nft.id, nft.price) }} className="btn btn-primary">Buy Now</button>
                                    }
                                    {address == nft.owner && nft.isForSale == true &&
                                        <button onClick={() => { removeSellNFT(nft.id) }} className="btn btn-primary">Remove From Sell</button>
                                    }
                                    {address == nft.owner && nft.isForSale == false &&
                                        <button onClick={() => { sellNFT(nft.id) }} className="btn btn-primary">Sell Now</button>
                                    }
                                    <label htmlFor={nft.id.toString()} className="btn btn-primary">See NFT</label>

                                    <CarDetails nft={nft} />
                                </div>
                            </div>
                        </div>
                    </div>)
            }
        </div>)
}