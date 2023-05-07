import { useEffect, useState } from 'react';
import NFTWheels from '../../artifacts/contracts/NFTWheels.sol/NFTWheels.json';
import { Ferrari } from './Assets';
import { NFTWheelsAddress, addressOwner } from "../../NFTWheels.address"
import { useAccount } from 'wagmi'
import { CarDetails } from '../CarDetails';

// import { DetailsButton } from '../DetailsButton'

const ethers = require("ethers")


export const Card = () => {

    const [nfts, setAllNfts] = useState([]);
    const { isConnected } = useAccount()


    useEffect(() => {
        getAllNFTs();
    })

    async function getAllNFTs() {
        if (isConnected) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(NFTWheelsAddress, NFTWheels.abi, provider);
            const data = await contract.getAllNFTs({ from: accounts[0] });
            var listeNftsRecu = [];
            for (var i = 0; i < data.length; i++) {
                listeNftsRecu.push(await deserialize(data[i]));
            }
            try {
                setAllNfts(listeNftsRecu);
            } catch (err) {
                console.log(err);
            }
        }
    }

    async function buyNFT(id) {
        console.log(id);
        // if (isConnected) {
        //     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        //     const provider = new ethers.providers.Web3Provider(window.ethereum);
        //     const signer = provider.getSigner();
        //     const contract = new ethers.Contract(NFTWheelsAddress, NFTWheels.abi, signer);
        //     const transaction = await contract.buyNFT(id, { from: accounts[0] });
        //     await transaction.wait();
        // }
    }

    async function deserialize(objet) {

        const newObjet = {
            id: objet.id.toString(), marque: objet.marque.toString(), modele: objet.modele, owner:objet.owner, 
            image: objet.image, vitesseMax: objet.vitesseMax.toString(), 
            price: objet.price.toString(), puissance: objet.puissance.toString()
        }

        return newObjet;
    }

    return (
        <div id="buy" className='flex justify-center align-center space-x-7 mt-1 flex-wrap'>
            {!isConnected && 
           <h5 className='text-white text-4xl font-bold z-10 mt-12 '>Veuillez vous connecter à votre wallet</h5>}
            {isConnected && 
            nfts.map(nft =>
                <div key={nft.id} className='w-fit mt-3 ml-[28px]'>
                    <div className="card card-compact w-96 bg-[#656C6D] shadow-xl text-black">
                        <figure><img src={Ferrari} alt="NFW" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {nft.marque} - {nft.modele}
                            </h2>
                            <p>{nft.puissance} - {nft.vitesseMax} - {nft.price / 10 ** 18}</p>
                            <div className="card-actions justify-end">
                                <button onClick={()=>{buyNFT(nft.id)}} className="btn btn-primary">Buy Now</button>
                                <label htmlFor={nft.id} className="btn btn-primary">See NFT</label>
                                <CarDetails nft={nft} />
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>)
}