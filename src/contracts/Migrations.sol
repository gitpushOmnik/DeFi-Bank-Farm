/**
 * @title Migrations
 * @dev This contract is used to manage the migration of smart contracts.
 * It keeps track of the last completed migration and allows for contract upgrades.
 */
pragma solidity >=0.4.21 <0.6.0;

contract Migrations {
  address public owner;
  uint public last_completed_migration;

  /**
   * @dev Sets the contract deployer as the owner.
   */
  constructor() public {
    owner = msg.sender;
  }

  /**
   * @dev Modifier to restrict access to owner only.
   */
  modifier restricted() {
    require(msg.sender == owner, "This function is restricted to the contract's owner");
    _;
  }

  /**
   * @dev Sets the last completed migration step.
   * @param completed The last completed migration step.
   */
  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  /**
   * @dev Upgrades the contract to a new address and sets the last completed migration step on the new contract.
   * @param new_address The address of the new Migrations contract.
   */
  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }
}
