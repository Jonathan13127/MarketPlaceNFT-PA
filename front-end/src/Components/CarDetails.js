import {useAccount} from "wagmi";
import {useState} from "react";
import {NFTWheelsAddress} from "../Informations";
import NFTWheels from "../artifacts/contracts/NFTWheels.sol/NFTWheels.json";

const ethers = require("ethers")


export const CarDetails = (props) => {

    const { isConnected, address } = useAccount()

    const [price, setPrice] =useState(0)


    const handlePrice = (e) =>{
        setPrice(e.target.value)
    }

    const changePrice = async (e, id) => {
        e.preventDefault()
        if (isConnected) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(NFTWheelsAddress, NFTWheels.abi, signer);
            const transaction = await contract.changePrice(ethers.utils.parseEther(price), id, { from: accounts[0]});
            await transaction.wait();
        }
    }

    return (

        <div>
            <input type="checkbox" id={props.nft.id} className="modal-toggle" />

            <div className="modal">
                
                <div className="modal-box bg-[#656C6D] shadow-xl w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">{props.nft.id}#  {props.nft.marque} - {props.nft.modele}</h3>
                    <p className="py-4">{props.nft.puissance}ch - {props.nft.vitesseMax}km/h - {props.nft.price * 1}</p>
                    <p className="py-4">owner: {props.nft.owner}</p>
                    <figure><img src={props.nft.img} alt="NFW" /></figure>
                    <div className="modal-action">
                        <label htmlFor={props.nft.id} className="btn btn-primary">Exit</label>
                    </div>
                    {address === props.nft.owner && props.nft.isForSale === false &&
                        <div>
                            <form onSubmit={(e)=>changePrice(e,props.nft.id)}>
                                <input type="number" value={price} onChange={handlePrice}/>
                                <button type="submit" className="btn btn-primary">Update Price</button>
                            </form>
                        </div>
                    }
                </div>

            </div>

        </div>
    )
}