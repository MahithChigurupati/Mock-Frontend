import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Web3 from 'web3';
import ABI from './contract_abi/contract.json';

function App() {
  const [buttonState, setButtonState] = useState(false);
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contractABI = ABI.abi;

const contract = new web3.eth.Contract(contractABI, contractAddress);

  const handleButtonOneClick = async() => {
    try {
      const response = await fetch('http://localhost:5001/send-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: 'Some data' }),});
      if(response.ok){
        setButtonState(true);
        const jsonResp = response.json();
        console.log(jsonResp)
      }
    }
    catch(error) {
      console.error('Error:', error);
    }
  }

  async function handleButtonTwoClick() {
    if (window.ethereum) {
      try {
          // Request account access if needed
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          // Accounts now exposed, use them
          await contract.methods.incrementCount().send({ from: accounts[0] });
      } catch (error) {
          console.error('Error:', error);
      }
  } else {
      console.error('Ethereum provider (e.g., MetaMask) not found');
  }
  }
  
  return (
    <div className="App h-screen bg-gray-100 flex justify-center items-center">
      <div className="p-6  mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div>
          <button 
            onClick={handleButtonOneClick}
            className="px-4 py-2 bg-blue-500 text-white text-lg font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Send request to iOS
          </button>
          <button 
            onClick={handleButtonTwoClick}
            disabled={!buttonState}
            className={`px-4 py-2 ml-4 text-lg font-medium rounded-md focus:outline-none ${buttonState ? 'bg-green-500 text-white hover:bg-green-700 focus:bg-green-700' : 'bg-gray-300 text-gray-400 cursor-not-allowed'}`}
          >
            Button Two
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
