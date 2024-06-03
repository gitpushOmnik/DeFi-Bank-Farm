/**
 * @title BankFarm
 * @dev A contract for staking OMG tokens and earning OMNIK tokens as rewards.
 */
pragma solidity ^0.5.0;

import "./OmnikToken.sol";
import "./OmgToken.sol";

contract BankFarm {
    string public name = "Omnik Token Farm";
    address public owner;
    OmnikToken public omnikToken;
    OmgToken public omgToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    /**
     * @dev Constructor that sets the addresses of the OMNIK and OMG tokens and the owner of the contract.
     * @param _omnikToken Address of the OMNIK token contract.
     * @param _omgToken Address of the OMG token contract.
     */
    constructor(OmnikToken _omnikToken, OmgToken _omgToken) public {
        omnikToken = _omnikToken;
        omgToken = _omgToken;
        owner = msg.sender;
    }

    /**
     * @dev Stakes a specified amount of OMG tokens.
     * @param _amount The amount of OMG tokens to stake.
     */
    function stakeTokens(uint _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Transfer Mock OMG tokens to this contract for staking
        omgToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Add user to stakers array *only* if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    /**
     * @dev Unstakes all staked OMG tokens and withdraws them to the sender's address.
     */
    function unstakeTokens() public {
        // Fetch staking balance
        uint balance = stakingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");

        // Transfer Mock OMG tokens to the staker
        omgToken.transfer(msg.sender, balance);

        // Reset staking balance
        stakingBalance[msg.sender] = 0;

        // Update staking status
        isStaking[msg.sender] = false;
    }

    /**
     * @dev Issues OMNIK tokens to all stakers proportional to their staked amount of OMG tokens.
     * Only the owner can call this function.
     */
    function issueTokens() public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Issue tokens to all stakers
        for (uint i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0) {
                omnikToken.transfer(recipient, balance);
            }
        }
    }
}
