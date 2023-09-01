# Decentralized-Finance-App-Sperax
gaurav Patidar 20AG3FP30
## Description

This DeFi (Decentralized Finance) lending application allows users to borrow and lend cryptocurrency assets using the Metamask extension for their browser. Here's how to use it:

- **Metamask Extension**: Ensure that you have the [Metamask extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) installed in your browser.

- **Configuring Your Metamask Account**:
  - Copy your Metamask account address (e.g., 0xd5..D43).
  - Paste the account address into the `Home.js` file in the code. This step establishes a connection between your Metamask account and our React app, allowing you to control transactions from our app.
      ```shell
       // Your contract address for Platform is to be replaced here (Line 21 in Home.js)
       const contractAddress = '0xd5F6A33DB1247Ea83f3a108d7d14d78dD309D43';

- **Connecting Your Wallet**:
  - Once the Metamask address is updated in the `Home.js` file, click on the "Connect Wallet" button. This action will connect your wallet to the application, and you'll see options to borrow and lend.

- **Borrowing and Lending**:
  - In the input field, select the desired amount for borrowing or lending.
  - Click on the "Lend" or "Borrow" button to initiate the transaction.

- **Transaction Validation**:
  - The system will check the feasibility of the transaction. If the transaction is possible, you will see it in your Metamask account for confirmation.
  - If the transaction is not possible (e.g., due to insufficient funds or other constraints), an error will be displayed.

Enjoy using our DeFi lending platform!

## Prerequisites

To run this application, you'll need:

- [Node.js](https://nodejs.org/) installed on your computer.
- A compatible web browser with the [Metamask extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) installed.

## Installation

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/your-username/defi-lending-dapp.git
2. Navigate to project directory

    ```shell
   cd defi-lending-dapp
3. Install the required dependencies:

    ```shell
   npm install
4. Start the development server:

     ```shell
   npm start
5. Open your web browser and access the application at http://localhost:3000.

# Handling Errors

## Error: Need to Install MetaMask

**Problem:** If you encounter an error message stating that you need to install MetaMask, it means that the MetaMask extension is not detected in your browser.

**Solution:** To resolve this error, follow these steps:

1. **Install MetaMask Extension:**
   - Visit the [MetaMask extension page](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) on the Chrome Web Store.
   - Click the "Add to Chrome" button to install the MetaMask extension.
   - Follow the on-screen instructions to set up and configure your MetaMask account.

2. **Refresh the Page:**
   - After installing MetaMask, refresh the web page where you encountered the error.
   - The error should be resolved, and you can proceed with the application.

---

## Error: Unhandled Rejection (Error): Invalid Address

**Problem:** If you receive an "Unhandled Rejection (Error): invalid address" error with details like "argument='address', value='0x..43', code=INVALID_ARGUMENT," it typically means there's an issue with the Ethereum address used in the application.

**Possible Causes:**
- The Ethereum address was not updated after copying it from the MetaMask extension.
- The address was copied incorrectly.

**Solution:** To resolve this error, follow these steps:

1. **Check Address in Home.js:**
   - Open the `Home.js` file in your project code (usually found where you pasted the Ethereum address).
   - Go to the line number mentioned in the error message (e.g., line 21).

2. **Verify Address:**
   - Verify that the Ethereum address in your `Home.js` file is correct and matches the address in your MetaMask extension.
   - Ensure there are no extra spaces or characters.

3. **Update the Address:**
   - If you find any discrepancies or errors, correct them in the `Home.js` file.
   - Save the file after making changes.

4. **Recheck:**
   - Close and reopen your application.
   - Ensure that the address update is successfully reflected in the application.
demo > ![connection demo](https://github.com/Gaurav05082002/Decentralized-Finance-App-Sperax/assets/80939403/6dd38332-a697-42e7-8dec-8a05f8fdaede)


By following these steps, you should be able to resolve the "Invalid Address" error. If the issue persists, double-check the address and ensure it is accurate.


   
