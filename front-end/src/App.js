import { Header } from './Components/Header/header'
import { Home } from './Pages/Home'
import { Login } from './Pages/Login/Login'
import { Signin } from './Pages/Signin/Signin'
import { Profile } from './Pages/Profile'
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react'

import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultWallets,RainbowKitProvider,darkTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import './App.css';

function App() {


  const { chains, provider } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [
      // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
      publicProvider()
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: 'Casino dApp IBC', // <=== A CHANGER
    projectId: '9954faf5fc0a281d557e104d296e05c0',
    chains
  });

  const wagmiClient = createClient({
    autoConnect: false,
    connectors,
    provider
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <div className="w-100 h-100 overflow-x-hidden text-white">

          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
