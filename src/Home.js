import React, { useState, useEffect } from 'react';
import LendForm from './components/LendForm';
import BorrowForm from './components/BorrowForm';
import LendingPositions from './components/LendingPositions';
import './Home.css';
import { ethers } from 'ethers';
import LendingPlatform_abi from './contracts/LendingPlatform_sol_LendingPlatform.abi.json'; // Import the ABI for your LendingPlatform contract

const Home = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [currentContractVal, setCurrentContractVal] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [connected, setConnected] = useState(false);
    const [lendingPositions, setLendingPositions] = useState([]); // Store lending positions

    // Your contract address for LendingPlatform
    const contractAddress = '0xd5F6A33DB1247Ea83f3a108d7d14d78dDc309D43';

    const connectWalletHandler = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((result) => {
                    accountChangedHandler(result[0]);
                    setConnButtonText('Wallet Connected');
                    setConnected(true);
 
					// Initialize contract and provider after connecting
                    updateEthers();

                })
                .catch((error) => {
                    setErrorMessage(error.message);
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
        try {
            const valueInEther = ethers.utils.parseEther(amount.toString());
            const tx = await contract.lend({
                value: valueInEther,
            });
            await tx.wait(); // Wait for the transaction to be mined
            fetchLendingPositions();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const borrow = async (amount) => {
        try {
            const tx = await contract.borrow(amount);
            await tx.wait(); // Wait for the transaction to be mined
            fetchLendingPositions();
        } catch (error) {
            setErrorMessage(error.message);
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
            <h4 className="title">DEFI Borrowing Lending App</h4>
            <button className="button" onClick={connectWalletHandler}>
                {connButtonText}
            </button>
            <div>
                <h3>Address: {defaultAccount}</h3>
            </div>


			  {/* <form onSubmit={setHandler}>
                <input id="setText" type="text" className="input" />
                <button type="submit" className="submit-button">Update Contract</button>
            </form> */}

            

			<div>
                {!connected ? (
                    <h4 className="error">Please connect</h4>
                ) : (
                    <>

					  <BorrowForm borrow={borrow} />
            <LendForm lend={lend} />
            <LendingPositions positions={lendingPositions} />
            
                        <h4 className="success">Connected</h4>
                        </>
                )}
            </div>

                <div>
                <button onClick={getCurrentVal} className="button">Get Current Contract Value</button>
            </div>
            <div className="title">
                {currentContractVal}
            </div>
            <div className="error">
                {errorMessage}
            </div>



          
        </div>


    );
};

export default Home;
