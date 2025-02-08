# Proof Sphere  

**A Web3 dApp on Arbitrum using zkVerify integration for zero-knowledge proof verification and Arbitrum Stylus smart contracts.**  

## 🚀 Project Overview  

Proof Sphere is a Web3 dApp that enables users to submit, verify, and track zero-knowledge proofs on the **Arbitrum** network using **zkVerify**. It includes:  

- ✅ A user-friendly frontend UI with a clean and intuitive dashboard.  
- ✅ Backend APIs to handle proof submission, verification, and smart contract interaction.  
- ✅ Rust-based smart contracts on Arbitrum Stylus for proof verification.  
- ✅ Fully automated deployment for frontend, backend, and smart contracts.  

## 🏗 Features  

✔ **Proof Submission & Verification** - Users can submit proofs and check their verification status.  
✔ **Wallet Integration** - Supports MetaMask and other wallets via Web3Modal.  
✔ **Rust-based Smart Contracts** - Uses Arbitrum Stylus for efficient proof verification.  
✔ **zkVerify Integration** - Validates proofs before submitting to the blockchain.  
✔ **Modern UI** - Built with **Next.js, Tailwind CSS, and ShadCN components**.  
✔ **Workflow Automation** - Deploy smart contracts and frontend with **Hardhat, Vercel, and Docker**.  

---

## 💻 Tech Stack  

| Layer       | Technologies Used |
|------------|------------------|
| **Frontend** | Next.js, Tailwind CSS, ShadCN, wagmi, Web3Modal |
| **Backend**  | Node.js, Express.js, zkVerify API, Hardhat |
| **Smart Contracts** | Rust (Arbitrum Stylus), Solidity Interfaces |
| **Deployment** | Hardhat, Vercel, Docker |

---

## 🛠 Setup & Installation  

### Prerequisites  

- Node.js `>=16.x`  
- Cargo & Rust installed (`rustup` for Arbitrum Stylus)  
- MetaMask Wallet  
- Arbitrum Testnet RPC URL  

### 1️⃣ Clone the Repository  

```sh
git clone https://github.com/your-repo/proof-sphere.git
cd proof-sphere
```
### 2️⃣ Install Dependencies
Frontend
```sh
cd frontend
npm install
```
Backend
```sh
cd backend
npm install
```
### 3️⃣ Configure Environment Variables
.env.example to .env in both frontend/ and backend/, then fill in the necessary values:
```sh
NEXT_PUBLIC_ARBITRUM_RPC_URL=<Your Arbitrum Testnet RPC>
NEXT_PUBLIC_VERIFIER_CONTRACT_ADDRESS=<Deployed Contract Address>
PRIVATE_KEY=<Your Wallet Private Key>
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<WalletConnect ID>
```

#### 🔗 Smart Contract Deployment
### 1️⃣ Compile the Contract
```sh
cd contracts
cargo build
```
### 2️⃣ Deploy to Arbitrum Testnet
```sh
cargo stylus deploy
```
### 3️⃣ Verify Deployment
Once deployed, update NEXT_PUBLIC_VERIFIER_CONTRACT_ADDRESS in your .env file.

### 🚀 Running the Project
### 1️⃣ Start the Backend
```sh
cd backend
npm start
```
### 2️⃣ Start the Frontend
```sh
cd frontend
npm run dev
```
Your dApp should be running at http://localhost:3000 🚀
