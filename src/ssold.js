// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

import React, {useState} from 'react'
import BorrowForm from './components/BorrowForm';
import LendForm from './components/LendForm';
// import ConnectWalletButton from './components/ConnectWalletButton';
// import AccountBalance from './components/AccountBalance';
import './SimpleStorage.css';

import {ethers} from 'ethers'
import SimpleStorage_abi from './contracts/SimpleStorage_abi.json'

const SimpleStorage = () => {

	// deploy simple storage contract and paste deployed contract address here. This value is local ganache chain
	let contractAddress = '0xCF31E7c9E7854D7Ecd3F3151a9979BC2a82B4fe3';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [currentContractVal, setCurrentContractVal] = useState(null);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);
	const [connected, setConnected] = useState(false);

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				setConnected(true);
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, SimpleStorage_abi, tempSigner);
		setContract(tempContract);	
	}

	const setHandler = (event) => {
		event.preventDefault();
		console.log('sending ' + event.target.setText.value + ' to the contract');
		contract.set(event.target.setText.value);
	}

	const getCurrentVal = async () => {
		let val = await contract.get();
		setCurrentContractVal(val);
	}


	const borrow = async (amount) => {
		console.log(borrow);
    //     await contractService.borrow(amount);
    //     const balance = await contractService.getAccountBalance();
    //     setAccountBalance(balance);
    };

    const lend = async (amount) => {
		console.log(lend);
    //     await contractService.lend(amount);
    //     const balance = await contractService.getAccountBalance();
    //     setAccountBalance(balance);
    };
	
	return (
		<div className="container">
            <h4 className="title">DEFI Borrowing Lending App</h4>
            <button className="button" onClick={connectWalletHandler}>{connButtonText}</button>
            <div>
                <h3>Address: {defaultAccount}</h3>
            </div>
            <form onSubmit={setHandler}>
                <input id="setText" type="text" className="input" />
                <button type="submit" className="submit-button">Update Contract</button>
            </form>

            <div>
                {!connected ? (
                    <h4 className="error">Please connect</h4>
                ) : (
                    <>
                        <h4 className="success">Connected</h4>
                        {/* <AccountBalance balance={accountBalance} /> */}
                    <BorrowForm borrow={borrow} />
                    <LendForm lend={lend} />
                    {/* <LendingPositions positions={lendingPositions} /> */}
                
						{/* Your other components */}
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
}

export default SimpleStorage;