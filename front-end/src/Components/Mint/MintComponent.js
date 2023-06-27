import './MintComponent.css'
import NFTWheels from '../../artifacts/contracts/NFTWheels.sol/NFTWheels.json';
import { NFTWheelsAddress, urlBase } from "../../Informations"
import { ContractResultDecodeError, useAccount } from 'wagmi'


const ethers = require("ethers")


export const MintComponent = () => {

    const { isConnected, address } = useAccount()


    async function mint(e) {
        if (isConnected) {
            // Get all nfts availabe
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(NFTWheelsAddress, NFTWheels.abi, provider);
            const data = await contract.getAllNFTsAvailable({ from: accounts[0] });
            console.log(data)

            // Call api to randomly choose a ntf to give to the user
            e.preventDefault();

            var url = urlBase+"contents/random";
    
            const response = await fetch(url, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data), // body data type must match "Content-Type" header
    
            }).then(response => {               // On rentre ici si la requete a fonctionné quelque soit le status

                response.json().then(res => console.log(res))

            }).catch(err => console.log(err));

            // Tell to the smart contract to send the nft to the user

            // Display the nft (animation)

            // Block the user to avoid to remint another nft (one per person)

        }
    }


    return (

        <div className='w-full h-full flex justify-center align-center'>
            <div className="w-auto h-auto mx-0 my-auto ">
                <button className="px-12 py-5" id="minter" onClick={mint}>MINT</button>
            </div>
        </div>
    )
}