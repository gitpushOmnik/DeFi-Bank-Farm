# OMNIK Token Farm

## Project Overview

The OMNIK Token Farm is a decentralized application (DApp) built on the Ethereum blockchain that enables users to stake OMG tokens and earn OMNIK tokens as rewards. It provides a platform for investors to stake their OMG tokens and receive proportional rewards in the form of OMNIK tokens, which can be later unstaked or traded.

The DApp consists of three main smart contracts:

1. **OmgToken**: An ERC-20 compatible token representing the OMG token.
2. **OmnikToken**: An ERC-20 compatible token representing the OMNIK token.
3. **BankFarm**: The core contract that facilitates the staking and unstaking of OMG tokens, as well as the issuance of OMNIK token rewards.

The application leverages the power of the Ethereum blockchain to ensure transparency, security, and immutability of transactions. Users can connect their Ethereum wallets, such as MetaMask, to the DApp and interact with the smart contracts directly.

## Key Features

- **Staking OMG Tokens**: Users can stake their OMG tokens by approving the BankFarm contract and calling the `stakeTokens` function.
- **Earning OMNIK Rewards**: Staked OMG tokens are eligible to earn OMNIK token rewards, which are issued proportionally by the contract owner.
- **Unstaking OMG Tokens**: Users can unstake their staked OMG tokens and retrieve them by calling the `unstakeTokens` function.
- **Token Issuance**: The contract owner can issue OMNIK tokens to all stakers by calling the `issueTokens` function, distributing rewards proportionally based on the staked OMG token amounts.
- **Token Transfer and Approval**: Users can transfer and approve token transfers for both OMG and OMNIK tokens, following the ERC-20 standard.

## Technologies Used

- Solidity: The smart contracts are written in Solidity, a contract-oriented programming language for developing Ethereum applications.
- Truffle: A development framework for building, testing, and deploying Ethereum applications.
- React: The frontend user interface is built using React, a popular JavaScript library for building user interfaces.
- Web3.js: A library that allows the frontend to interact with the Ethereum blockchain and smart contracts.
- MetaMask: A popular Ethereum wallet extension that enables users to manage their accounts and sign transactions.

## Installation and Usage

1. Clone the repository: `git clone https://github.com/your-repo/omnik-token-farm.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Connect your MetaMask wallet to the DApp.
5. Interact with the DApp by staking OMG tokens, earning OMNIK rewards, and unstaking tokens.

## Deployment and Testing

1. **Running Truffle Tests**:

   > truffle test

2. **Running Deployment Script for Rewarding Tokens**:

   > truffle exec scripts/issue-token.js

3. **Deploying Contracts**

    > npx hardhat run src/backend/scripts/deploy.js --network localhost

4. **Running ReactJS Frontend server**

    > npm run start

## Screenshots of the website

<img src="https://github.com/gitpushOmnik/DeFi-Bank-Farm/blob/main/README/contract-testing.png" width="1250" height="500"> 
<img src="https://github.com/gitpushOmnik/DeFi-Bank-Farm/blob/main/README/initial-page.png" width="1250" height="500"> 
<img src="https://github.com/gitpushOmnik/DeFi-Bank-Farm/blob/main/README/input-value.png" width="1250" height="500"> 
<img src="https://github.com/gitpushOmnik/DeFi-Bank-Farm/blob/main/README/staking.png" width="340" height="500"> 
<img src="https://github.com/gitpushOmnik/DeFi-Bank-Farm/blob/main/README/staking2.png" width="340" height="500"> 
<img src="https://github.com/gitpushOmnik/DeFi-Bank-Farm/blob/main/README/staked.png" width="1250" height="500"> 
<img src="https://github.com/gitpushOmnik/DeFi-Bank-Farm/blob/main/README/reward.png" width="1250" height="500"> 
<img src="https://github.com/gitpushOmnik/DeFi-Bank-Farm/blob/main/README/unstake.png" width="340" height="500"> 

## License

This project is licensed under the [MIT License](LICENSE).
