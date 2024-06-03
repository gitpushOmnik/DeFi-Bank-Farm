/**
 * @file Script to issue tokens using the BankFarm contract.
 * @dev This script calls the `issueTokens` function on the deployed BankFarm contract.
 */

const BankFarm = artifacts.require('BankFarm');

/**
 * @dev Main function to execute the script.
 * @param {function} callback - Truffle callback function to signal completion.
 */
module.exports = async function(callback) {
  try {
    // Get the deployed instance of the BankFarm contract
    let bankFarm = await BankFarm.deployed();

    // Call the issueTokens function to distribute tokens
    await bankFarm.issueTokens();

    // Signal completion
    callback();
  } catch (error) {
    console.error('Error issuing tokens:', error);
    callback(error);
  }
};
