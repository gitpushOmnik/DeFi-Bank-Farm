/**
 * @file App.js
 * @dev Main application component that interacts with the Ethereum blockchain, loads smart contract data, and manages state for staking and unstaking tokens.
 */

import React, { Component } from 'react';
import Web3 from 'web3';
import OMGToken from '../abis/OmgToken.json';
import OmnikToken from '../abis/OmnikToken.json';
import BankFarm from '../abis/BankFarm.json';
import Navbar from './Navbar';
import Main from './Main';
import './App.css';

class App extends Component {

  /**
   * @dev Runs before the component is mounted to the DOM.
   * Loads Web3 and blockchain data.
   */
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  /**
   * @dev Loads Web3 instance and blockchain data.
   */
  async loadBlockchainData() {
    const web3 = window.web3;

    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    // Load network ID
    const networkId = await web3.eth.net.getId();

    // Load OMGToken contract
    const omgTokenData = OMGToken.networks[networkId];
    if (omgTokenData) {
      const omgToken = new web3.eth.Contract(OMGToken.abi, omgTokenData.address);
      this.setState({ omgToken });
      let omgTokenBalance = await omgToken.methods.balanceOf(this.state.account).call();
      this.setState({ omgTokenBalance: omgTokenBalance.toString() });
    } else {
      window.alert('OMGToken contract not deployed to detected network.');
    }

    // Load OmnikToken contract
    const omnikTokenData = OmnikToken.networks[networkId];
    if (omnikTokenData) {
      const omnikToken = new web3.eth.Contract(OmnikToken.abi, omnikTokenData.address);
      this.setState({ omnikToken });
      let omnikTokenBalance = await omnikToken.methods.balanceOf(this.state.account).call();
      this.setState({ omnikTokenBalance: omnikTokenBalance.toString() });
    } else {
      window.alert('OmnikToken contract not deployed to detected network.');
    }

    // Load BankFarm contract
    const bankFarmData = BankFarm.networks[networkId];
    if (bankFarmData) {
      const bankFarm = new web3.eth.Contract(BankFarm.abi, bankFarmData.address);
      this.setState({ bankFarm });
      let stakingBalance = await bankFarm.methods.stakingBalance(this.state.account).call();
      this.setState({ stakingBalance: stakingBalance.toString() });
    } else {
      window.alert('BankFarm contract not deployed to detected network.');
    }

    this.setState({ loading: false });
  }

  /**
   * @dev Initializes Web3 instance.
   */
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  /**
   * @dev Stakes tokens by approving and calling the stakeTokens function of the BankFarm contract.
   * @param {string} amount - The amount of tokens to stake.
   */
  stakeTokens = (amount) => {
    this.setState({ loading: true });
    this.state.omgToken.methods.approve(this.state.bankFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.bankFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false });
      });
    });
  }

  /**
   * @dev Unstakes tokens by calling the unstakeTokens function of the BankFarm contract.
   */
  unstakeTokens = () => {
    this.setState({ loading: true });
    this.state.bankFarm.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false });
    });
  }

  /**
   * @dev Constructor initializes the state of the component.
   * @param {object} props - React component properties.
   */
  constructor(props) {
    super(props);
    this.state = {
      account: '0x0',
      omgToken: {},
      omnikToken: {},
      bankFarm: {},
      omgTokenBalance: '0',
      omnikTokenBalance: '0',
      stakingBalance: '0',
      loading: true
    };
  }

  /**
   * @dev Renders the component.
   * Displays a loading message while data is being fetched and the main content once data is loaded.
   */
  render() {
    let content;
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>;
    } else {
      content = <Main
        omgTokenBalance={this.state.omgTokenBalance}
        omnikTokenBalance={this.state.omnikTokenBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
      />;
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
