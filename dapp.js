console.log("Heyy Dapp Developers!");

const ssAddress = '0x7c33c8C4804b6531FEAEA205Fe903d7d85d73492';
const ssABI =[
	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]


// 1. Checking for a Wallet

window.addEventListener('load', function() {
    if (typeof window.ethereum !== 'undefined'){
        console.log('Wallet detected!');
        let mmDetected = document.getElementById('mm-detected');
        mmDetected.innerHTML = "Wallet has been detected!";
    }
    else{
        console.log('No wallets available!');
        alert("You need to install a wallet!");
    }
})

//**********************************************************************************************************

// 2. Connecting to MetaMask

const mmEnable = document.getElementById('mm-connect');

mmEnable.onclick = async () => {
    await ethereum.request({ method: 'eth_requestAccounts'});

    let mmCurrentAccount = document.getElementById('mm-current-account');
    mmCurrentAccount.innerHTML = "Here is your current account: " + ethereum.selectedAddress;
}

//**********************************************************************************************************

// 3. Sending a Transaction

const ssSubmit = document.getElementById('ss-input-button');

ssSubmit.onclick = async () => {
    const ssValue = document.getElementById('ss-input-box').value;
    
    var web3 = new Web3(window.ethereum);
    const simpleStorage =  new web3.eth.Contract(ssABI, ssAddress)

    await simpleStorage.methods.store(ssValue).send({from: ethereum.selectedAddress})
}

//**********************************************************************************************************

// 4. Reading value of state variables from chain

const ssGetValue = document.getElementById('ss-get-value')

ssGetValue.onclick = async () => {
  var web3 = new Web3(window.ethereum)
  const simpleStorage = new web3.eth.Contract(ssABI, ssAddress)
  simpleStorage.setProvider(window.ethereum)

  var value = await simpleStorage.methods.retrieve().call()
  console.log(value)
  
  const ssDisplayValue = document.getElementById('ss-display-value')
  ssDisplayValue.innerHTML = 'Current Simple Storage Value: ' + value

}