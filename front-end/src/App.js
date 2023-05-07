import { Home, Login, Signup, Profile } from './Pages'
import { Header } from './Components'
import { Routes, Route } from 'react-router-dom';
import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultWallets,RainbowKitProvider,darkTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, localhost } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import './App.css';

function App() {


  const { chains, provider } = configureChains(
    [mainnet, polygon, optimism, arbitrum, localhost],
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
    autoConnect: true,
    connectors,
    provider
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="w-100 h-100 overflow-x-hidden text-white">

          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
