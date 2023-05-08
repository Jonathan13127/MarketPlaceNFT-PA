import React from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Card,
} from "@material-tailwind/react";


export const HeaderTailwind = () => {
    const [openNav, setOpenNav] = useState(false);
    const { isConnected } = useAccount();


    const navList = (
        <>
            <div id="userNot" className="flex justify-around items-center w-auto space-x-3">
                <ConnectButton chainStatus="icon" accountStatus="avatar" />
                {!isConnected && <div className='space-x-2'>
                    <a href='/Login'><button id="btnHeader">Log In</button></a>
                    <a href='/Signup'><button id="btnHeader">Sign Up</button></a>
                </div>}
            </div>
        </>
    );

    return (
        <>
            <Navbar className="fixed z-10 h-20 max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
                <div className="w-fit h-fit flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="/"
                        className="mr-4 cursor-pointer py-1.5"
                    >
                        <a className='w-fit h-fit p-3' href='/'>
                            <img className='w-fit h-fit' id="Logo" alt='Logo' src='/Assets/logo_blanc.svg' />
                        </a>
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <Button
                            variant="gradient"
                            size="sm"
                            className="hidden lg:inline-block"
                        >
                            <span>Buy Now</span>
                        </Button>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <MobileNav open={openNav}>
                    {navList}
                    <Button variant="gradient" size="sm" fullWidth className="mb-2">
                        <span>Buy Now</span>
                    </Button>
                </MobileNav>
            </Navbar>
        </>
    );
}