import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { WagmiConfig, createConfig, configureChains, sepolia } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'



const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia], 
  [alchemyProvider({ apiKey: '74EPBaQbXtY_0eX69aMXT9mPtrvoYZWG'})]
);

const configWagm = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  publicClient,
  webSocketPublicClient
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig config={configWagm}>
      <App />
    </WagmiConfig>
  </React.StrictMode>,
)
