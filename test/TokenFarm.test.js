const OmgToken = artifacts.require('OmgToken')
const OmnikToken = artifacts.require('OmnikToken')
const BankFarm = artifacts.require('BankFarm')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('BankFarm', ([owner, investor]) => {
  let omgToken, omnikToken, bankFarm

  before(async () => {
    // Load Contracts
    omgToken = await OmgToken.new()
    omnikToken = await OmnikToken.new()
    bankFarm = await BankFarm.new(omnikToken.address, omgToken.address)

    // Transfer all Omnik tokens to farm (1 million)
    await omnikToken.transfer(bankFarm.address, tokens('1000000'))

    // Send tokens to investor
    await omgToken.transfer(investor, tokens('100'), { from: owner })
  })

  describe('OMG deployment', async () => {
    it('has a name', async () => {
      const name = await omgToken.name()
      assert.equal(name, 'Omg Token')
    })
  })

  describe('Omnik Token deployment', async () => {
    it('has a name', async () => {
      const name = await omnikToken.name()
      assert.equal(name, 'Omnik Token')
    })
  })

  describe('Token Farm deployment', async () => {
    it('has a name', async () => {
      const name = await bankFarm.name()
      assert.equal(name, 'Omnik Token Farm')
    })

    it('contract has tokens', async () => {
      let balance = await omnikToken.balanceOf(bankFarm.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })

  describe('Farming tokens', async () => {

    it('rewards investors for staking OMG tokens', async () => {
      let result

      // Check investor balance before staking
      result = await omgToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor OMG wallet balance correct before staking')

      // Stake OMG Tokens
      await omgToken.approve(bankFarm.address, tokens('100'), { from: investor })
      await bankFarm.stakeTokens(tokens('100'), { from: investor })

      // Check staking result
      result = await omgToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('0'), 'investor OMG wallet balance correct after staking')

      result = await omgToken.balanceOf(bankFarm.address)
      assert.equal(result.toString(), tokens('100'), 'Token Farm OMG balance correct after staking')

      result = await bankFarm.stakingBalance(investor)
      assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')

      result = await bankFarm.isStaking(investor)
      assert.equal(result.toString(), 'true', 'investor staking status correct after staking')

      // Issue Tokens
      await bankFarm.issueTokens({ from: owner })

      // Check balances after issuance
      result = await omnikToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor OMNIK Token wallet balance correct affter issuance')

      // Ensure that only onwer can issue tokens
      await bankFarm.issueTokens({ from: investor }).should.be.rejected;

      // Unstake tokens
      await bankFarm.unstakeTokens({ from: investor })

      // Check results after unstaking
      result = await omgToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor OMG wallet balance correct after staking')

      result = await omgToken.balanceOf(bankFarm.address)
      assert.equal(result.toString(), tokens('0'), 'Token Farm OMG balance correct after staking')

      result = await bankFarm.stakingBalance(investor)
      assert.equal(result.toString(), tokens('0'), 'investor staking balance correct after staking')

      result = await bankFarm.isStaking(investor)
      assert.equal(result.toString(), 'false', 'investor staking status correct after staking')
    })
  })

})
