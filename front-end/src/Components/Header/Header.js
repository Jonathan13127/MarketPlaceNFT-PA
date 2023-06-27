import './Header.css'
import { useState, useEffect } from 'react'
import { FaSearch } from "react-icons/fa";
import NFTWheels from '../../artifacts/contracts/NFTWheels.sol/NFTWheels.json';
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NFTWheelsAddress } from "../../Informations"
const ethers = require("ethers")


export const Header = (props) => {

    const [owner, setOwner] = useState("");
    const { isConnected, address } = useAccount();

    useEffect(() => {
        getOwner();
    }, [])

    async function getOwner() {
        if (isConnected) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(NFTWheelsAddress, NFTWheels.abi, provider);
            const data = await contract.getOwner({ from: accounts[0] });
            console.log(data.toString())
            setOwner(data.toString())
        }
    }

    async function search(e) {
        let input = e.target.value;
    }

    return (
        <header className="w-full h-20 flex justify-between px-10 items-center fixed z-10">

            <div className=" flex items-center space-x-5 h-full">

                <a className='min-w-[150px] max-w-[150px] p-3' href='/'>
                    <img className='' id="Logo" alt='Logo' src='/Assets/logo_blanc.svg' />
                </a>

                <div id="navigation" className="flex items-center space-x-3">
                    <div className='w-auto md:flex items-center lg hidden'>
                        <input className='w-auto relative' type='text' placeholder='Search something...' onChange={() => { }} />
                        <div id="loupe" className='ml-2 absolute'>
                            <FaSearch size={15} />
                        </div>
                    </div>
                    <div className='lg:flex w-auto space-x-2 hidden'>
                        <a>Explore</a>
                        <a>Sell</a>
                        <a>Bid</a>
                        <a href="/Mint">Mint</a>
                    </div>

                </div>

            </div>

            <div id="userNot" className="flex justify-around items-center w-auto space-x-3">
                <ConnectButton chainStatus="icon" accountStatus="avatar" />
                {!isConnected && <div className='space-x-2'>
                    <a href='/Login'><button id="btnHeader">Log In</button></a>
                    <a href='/Signup'><button id="btnHeader">Sign Up</button></a>
                </div>}
            </div>
            {/* 
            <div id="user" className="flex justify-around items-center w-auto">
                <a href='/Profile'><button id="btnHeader">My Profile</button></a>
            </div> */}

        </header>
    )
}