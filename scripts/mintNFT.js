require("dotenv").config();
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = process.env.MNEMONIC;
const clientURL = `wss://rpc-mainnet.maticvigil.com/ws/v1/a184645e4e2e233d636f36f97a79c2bac64393bb`;
const provider = new HDWalletProvider(mnemonic, clientURL);
const web3 = new Web3(provider);

const data = require("../build/contracts/mintContract.json");
const abiArray = data.abi;
const contract_address = process.env.CONTRACT_ADDRESS;

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log("Attempting to deploy from account ", accounts[0]);

	const contract = await new web3.eth.Contract(abiArray, contract_address);
	const tokenURI = "https://ipfs.io/ipfs/QmbuTkeRc1ByCXvVZAEeyt8Je7DTApAxiCCraaUtYtDpLa";
	await contract.methods.mintNFT(tokenURI).send({ from: accounts[0] });

	console.log("Que satisfação Aspira");
};

deploy();
