ProofSphere: Rust Smart Contract on Arbitrum Stylus
ProofSphere is a Rust-based smart contract deployed on the Arbitrum Stylus platform. It leverages the power of WebAssembly (WASM) and zero-knowledge proof verification to provide efficient and secure decentralized applications (dApps).
Features
Written in Rust and compiled to WebAssembly for Arbitrum Stylus.
Supports deployment on the Arbitrum Goerli testnet.
Includes Docker support for simplified development and deployment.
Provides a simple example of a storage contract with getter and setter functions.
File Structure
text
ProofSphere/
├── contracts/
│   ├── Cargo.toml          # Rust project configuration
│   ├── src/
│   │   ├── lib.rs          # Rust smart contract code
├── Dockerfile              # Docker container configuration
├── .env                    # Environment variables for deployment
├── README.md               # Project documentation
Prerequisites
Before starting, ensure you have the following installed:
Docker (for containerized deployment).
A wallet like MetaMask configured for the Arbitrum Goerli testnet.
An RPC provider like Alchemy or Infura.
A valid private key for deploying contracts.
Setup
1. Clone the Repository
bash
git clone https://github.com/yourusername/ProofSphere.git
cd ProofSphere
2. Configure Environment Variables
Create a .env file in the root directory:
bash
cp .env.example .env
Edit the .env file with your details:
text
ARBITRUM_RPC_URL=https://arb-goerli.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
PRIVATE_KEY=YOUR_PRIVATE_KEY
CONTRACT_NAME=proof_verifier
3. Build the Docker Image
Build a Docker image with all dependencies pre-installed:
bash
docker build -t proof-verifier .
Deployment
1. Deploy Using Docker
Run the following command to deploy your contract:
bash
docker run --env-file .env proof-verifier cargo stylus deploy \
  --rpc-url $ARBITRUM_RPC_URL \
  --private-key $PRIVATE_KEY \
  --contract-name $CONTRACT_NAME
2. Verify Deployment
After deployment, you will see the contract address in the output. Use a block explorer like Arbiscan to verify your contract.
Smart Contract Details
Contract Code (contracts/src/lib.rs)
This is a simple example of a storage contract written in Rust:
rust
#![no_std]

use stylus_sdk::{sol_storage, prelude::*};
use stylus_sdk::alloy_primitives::U256;

sol_storage! {
    #[entrypoint]
    pub struct ProofVerifier {
        uint256 public_value;
    }
}

#[public]
impl ProofVerifier {
    pub fn set_value(&mut self, value: U256) -> Result<(), Vec<u8>> {
        self.public_value.set(value);
        Ok(())
    }

    pub fn get_value(&self) -> Result<U256, Vec<u8>> {
        Ok(self.public_value.get())
    }
}
Key Functions
set_value: Sets a value in storage.
get_value: Retrieves the stored value.
Interaction
You can interact with your deployed contract using tools like ethers.js or web3.js.
Example Interaction Using ethers.js:
javascript
const { ethers } = require("ethers");

const rpcUrl = "https://arb-goerli.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY";
const privateKey = "YOUR_PRIVATE_KEY";
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const abi = [
  {
    "inputs": [{ "internalType": "uint256", "name": "value", "type": "uint256" }],
    "name": "set_value",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "get_value",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function",
  },
];

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  // Set a value in the contract
  const tx = await contract.set_value(42);
  await tx.wait();
  console.log("Value set successfully!");

  // Get the stored value from the contract
  const value = await contract.get_value();
  console.log("Stored Value:", value.toString());
}

main().catch(console.error);
Testing Locally
If you want to test locally without deploying to Arbitrum Goerli:
Set up an Arbitrum Nitro Dev Node:
bash
git clone https://github.com/OffchainLabs/nitro-devnode.git
cd nitro-devnode
./run-dev-node.sh
Update your .env file with the local RPC URL:
text
ARBITRUM_RPC_URL=http://localhost:8547
Deploy locally using Docker:
bash
docker run --env-file .env proof-verifier cargo stylus deploy \
  --rpc-url $ARBITRUM_RPC_URL \
  --private-key $PRIVATE_KEY \
  --contract-name $CONTRACT_NAME
Troubleshooting
Common Issues:
link.exe not found:
Ensure you have installed Visual Studio Build Tools with the C++ workload.
Docker Errors:
Ensure Docker is running and properly configured.
Deployment Fails:
Verify your RPC URL and private key are correct.
Check your wallet has sufficient funds for gas fees.
Resources
Arbitrum Stylus Documentation
Rust Programming Language
Ethers.js Documentation
License
This project is licensed under the MIT License. With this README file, users will have all the information they need to set up, deploy, and interact with your Rust-based smart contract on Arbitrum Stylus!
