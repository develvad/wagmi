import { useEffect, useState } from 'react';
import './App.css'
import { usePrepareContractWrite, useContractRead, useContractWrite, useAccount, useConnect, useDisconnect } from 'wagmi'

 
function App() {
  const {  connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const contractAddress = "0xa34a3D4E8D924Db2678246C5125e27EFC0f4Df27";
  const contractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"downCounter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"setCounterToZero","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"upCounter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
  // Write Contract Prepare
  const { config: contractConfigUp } = usePrepareContractWrite({ enabled: false, address: contractAddress, abi: contractAbi, functionName: 'upCounter'});
  const { config: contractConfigDown } = usePrepareContractWrite({enabled: false, address: contractAddress, abi: contractAbi, functionName: 'downCounter'});
  // Write Contract
  const { data: dataUp, write: upCounterH } = useContractWrite(contractConfigUp);
  const { data: dataDown, write: downCounterH } = useContractWrite(contractConfigDown);
  // Other Hooks
  let [counter, setCounter] = useState();
  let [enabled, setEnabled] = useState(false);
  // OnInit
  useEffect(() => {
    setEnabled(true);
  }, [])
  // Read Contract
  useContractRead({
    enabled,
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getCounter',
    account: address,
    onSuccess(data) {
      console.log("Enviado! ", data, typeof(data), data.toString());
      setCounter(data.toString())
      setEnabled(false);
    },
    onError(e) {
      console.error('Error -> ', e);
    }
  });

  if (isConnected) {
    return (
      <>
        <h2> Conectado con: { address }  </h2>
        <button onClick={() => disconnect()}> Desconectar Wallet </button>
        <h3> Valor del contador: <span style={{fontSize: '28px'}}> { counter } </span> </h3>
        <p><button onClick={() => setEnabled(true)}> Actualizar Contador </button> </p>
        <p><button onClick={() => upCounterH()}> Aumentar Contador </button> </p>
        <p><button onClick={() => downCounterH()} > Disminuir Contador </button> </p>
      </>
    )
  }
  
  return (
    <>
      {
        connectors.map((connector) => (
          <button disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })}> { connector.name } </button>
        ))
      }

    </>
    
  )
}

export default App
