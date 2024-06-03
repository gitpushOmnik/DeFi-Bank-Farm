/**
 * @file Main.js
 * @dev Main component that displays the staking and reward balances and provides forms for staking and withdrawing tokens.
 */

import React, { Component } from 'react';
import omg from '../omg.png';

class Main extends Component {

  /**
   * @dev Renders the Main component.
   * Displays staking and reward balances and provides a form for staking tokens.
   * Includes a button to withdraw staked tokens.
   */
  render() {
    return (
      <div id="content" className="mt-3">

        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} OMG</td>
              <td>{window.web3.utils.fromWei(this.props.omnikTokenBalance, 'Ether')} OMNIK</td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4">
          <div className="card-body">
            <form className="mb-3" onSubmit={(event) => {
              event.preventDefault();
              let amount;
              amount = this.input.value.toString();
              amount = window.web3.utils.toWei(amount, 'Ether');
              this.props.stakeTokens(amount);
            }}>
              <div>
                <label className="float-left"><b>Stake Tokens</b></label>
                <span className="float-right text-muted">
                  Balance: {window.web3.utils.fromWei(this.props.omgTokenBalance, 'Ether')}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={omg} height='32' alt=""/>
                    &nbsp;&nbsp;&nbsp; OMG
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">Stake Tokens</button>
            </form>
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              onClick={(event) => {
                event.preventDefault();
                this.props.unstakeTokens();
              }}>
              Withdraw Tokens
            </button>
          </div>
        </div>

      </div>
    );
  }
}

export default Main;
