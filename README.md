# my-wave-portal

This is a solidity contract for Spell Portal that stores and posts messages on ethereum blockchain. The contracts are tested and deployed using Hardhat

## Getting started
- run `npm install` to install dependancies.
- Create a .env file in the root directory and copy the example.env file filling in your own Alchemy and Ethereum private keys.
- `npx hardhat run scripts deploy.js` to deploy the contract onto Ethereum Rinkeby testnet.
- Write down the contrat address and also make note of the contents in contracts/ActivationPortal.sol/ActivationPortal.json for use in the front-end.


