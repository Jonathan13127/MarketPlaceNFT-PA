import './Header.css'
import { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { ConnectButton } from '@rainbow-me/rainbowkit';



export const Header = (props) => {

    const [walletAddress, setWalletAddress] = useState(null);

    const connectToMetaMask = async () => {
        try {
            // Vérifiez si MetaMask est installé
            if (window.ethereum) {
                // Demande à l'utilisateur de se connecter à son portefeuille MetaMask
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                // Stocke l'adresse du portefeuille dans l'état de l'application
                setWalletAddress(accounts[0]);
            } else {
                console.log("MetaMask n'est pas installé");
            }
        } catch (error) {
            console.log(error);
        }
        console.log(walletAddress);
    };

    return (
        <header className="w-full h-20 flex justify-between px-10 items-center fixed z-10">

            <div className="w-7/12 flex items-center space-x-5 h-full">

                <a className='w-auto h-full p-3' href='/'>
                    <img className='w-auto h-full' id="Logo" alt='Logo' src='/Assets/logo_blanc.svg' />
                </a>

                <div id="navigation" className="flex items-center space-x-3">
                    <div className='w-auto flex items-center'>
                        <input className='w-[32rem] relative' type='text' placeholder='Search something...' />
                        <div id="loupe" className='ml-2 absolute'>
                            <FaSearch size={15} />
                        </div>
                    </div>
                    <button>Explore</button>
                    <button>Sell</button>
                    <button>Play</button>
                </div>

            </div>

            <div className='position-fixed'>
                <ConnectButton />
            </div>

             <div id="userNot" className="flex justify-around items-center w-auto space-x-3">
                <a href='/Login'><button id="btnHeader">Log In</button></a>
                <a href='/Signin'><button id="btnHeader">Sign In</button></a>
            </div>
{/* 
            <div id="user" className="flex justify-around items-center w-auto">
                <a href='/Profile'><button id="btnHeader">My Profile</button></a>
            </div> */}

        </header>
    )
}