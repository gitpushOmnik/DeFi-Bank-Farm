/**
 * @file Deploy script for OmnikToken, OmgToken, and BankFarm contracts.
 * @dev This script deploys the OmnikToken, OmgToken, and BankFarm contracts, then performs some initial token transfers.
 */

const OmnikToken = artifacts.require('OmnikToken');
const OmgToken = artifacts.require('OmgToken');
const BankFarm = artifacts.require('BankFarm');

/**
 * @dev Deployment script for the OmnikToken, OmgToken, and BankFarm contracts.
 * @param {object} deployer - Truffle deployer object used to deploy the contracts.
 * @param {string} network - Network name on which the contracts are being deployed.
 * @param {array} accounts - List of accounts provided by the Ethereum client.
 */
module.exports = async function(deployer, network, accounts) {
  // Deploy Mock OMG Token
  await deployer.deploy(OmgToken);
  const omgToken = await OmgToken.deployed();

  // Deploy Omnik Token
  await deployer.deploy(OmnikToken);
  const omnikToken = await OmnikToken.deployed();

  // Deploy BankFarm with OmnikToken and OmgToken addresses
  await deployer.deploy(BankFarm, omnikToken.address, omgToken.address);
  const bankFarm = await BankFarm.deployed();

  // Transfer all Omnik tokens (1 million) to BankFarm
  await omnikToken.transfer(bankFarm.address, '1000000000000000000000000');

  // Transfer 100 Mock OMG tokens to the first investor account
  await omgToken.transfer(accounts[1], '100000000000000000000');
};
