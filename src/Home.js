import React, { useState, useEffect } from 'react';
import LendForm from './components/LendForm';
import BorrowForm from './components/BorrowForm';
import LendingPositions from './components/LendingPositions';
import './Home.css';
import { ethers } from 'ethers';
import LendingPlatform_abi from './contracts/LendingPlatform_sol_LendingPlatform.abi.json';

const Home = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [currentContractVal, setCurrentContractVal] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [connected, setConnected] = useState(false);
    const [lendingPositions, setLendingPositions] = useState([]);

    // Your contract address for Platform ***************************************************************************************
    const contractAddress = '0xd5F6A33DB1247Ea83f3a108d7d14d78dDc309D43';
    // when connected to metamask extension , a contract address will be there 0xd...456  , copy it and replace it here to handle error 
    //*****************************************************************************************************************************8 */







    const connectWalletHandler = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((result) => {
                    accountChangedHandler(result[0]);
                    setConnButtonText('Wallet Connected');
                    setConnected(true);
 
					
                    updateEthers();

                })
                .catch((error) => {
                    // setErrorMessage("possible reason -> please rematch contract address with add given in meta mask")
                    setErrorMessage("please rematch contract address in Home.js with addr given in metamask "+ error.message);
                });
        } else {
            console.log('Need to install MetaMask');
            setErrorMessage('Please install MetaMask browser extension to interact');
        }
    };

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        // updateEthers();
    };

    const chainChangedHandler = () => {
        window.location.reload();
    };

    if(connected){
       window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);
	}
    

    const updateEthers = () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider);
        let tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);
        let tempContract = new ethers.Contract(contractAddress, LendingPlatform_abi, tempSigner);
        setContract(tempContract);
    };

    const getCurrentVal = async () => {
		try {
            let val = await contract.getBalance();
            setCurrentContractVal(val);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const lend = async (amount) => {
        if( connected ){

            try {
                const valueInEther = ethers.utils.parseEther(amount.toString());
                const tx = await contract.lend({
                    value: valueInEther,
                });
                await tx.wait(); // Wait for the transaction to be mined
               
                fetchLendingPositions();
            } catch (error) {
                alert(error.message);
                setErrorMessage(error.message);
            }

        }
        else{
            setErrorMessage("Please Connect Wallet First To Lend");
        }
        
    };

    const borrow = async (amount) => {
         if( connected ){
            alert("Transaction initiated , click ok and wait for Metamask popup");
       
            try {
                const tx = await contract.borrow(amount);
                await tx.wait(); // Wait for the transaction to be mined
                alert("Transaction initiated please check Metamask popup");
                fetchLendingPositions();
            } catch (error) {
                alert(error.message);
                setErrorMessage(error.message);
            }
        }
        else{
            setErrorMessage("Please Connect Wallet First To Borrow");
        }
       
    };

    const fetchLendingPositions = async () => {
        try {
            const positions = await contract.getLendingPositions();
            setLendingPositions(positions);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    useEffect(() => {
        if (connected) {
            fetchLendingPositions();
        }
    }, [connected]);

    return (

           

        <div className="container">
        <header className="navbar">
          <h1 className="title">DEFI Borrowing Lending App</h1>
          <button className="button" onClick={connectWalletHandler}>
            {connButtonText}
          </button>
        </header>
  
        <div className="content">
          <div className="left-content">
            <BorrowForm borrow={borrow} />
          </div>
  
          <div className="right-content">
            <LendForm lend={lend} />
            <LendingPositions positions={lendingPositions} />
          </div>
        </div>
  
        <div className="footer">
          <div className="address">
            <h4>Address: {defaultAccount}</h4>
          </div>
          <div className="contract-value">
            <button onClick={getCurrentVal} className="button">
              Get Current Contract Value
            </button>
            <div className="title">{currentContractVal}</div>
          </div>
          <div className="error">{errorMessage ? errorMessage.slice(0, 75) : ''}</div>
        </div>
      </div>


    );
};

export default Home;
