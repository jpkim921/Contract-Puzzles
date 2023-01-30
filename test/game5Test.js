const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { waffle } = require("hardhat");
const provider = waffle.provider;

describe('Game5', function () {
  const provider = waffle.provider;

  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);
    const signers = await ethers.getSigners();
    // good luck

    async function createWalletAndFund() {
      // generate a wallet and fund it with 1 ETH
      const wallet = ethers.Wallet.createRandom().connect(provider)
      await network.provider.send("hardhat_setBalance", [
        wallet.address,
        "0xDE0B6B3A7640000",
      ]);

      return wallet
    }

    let isWin = false;
    let count = 1;
    while (!isWin) {
      const wallet = await createWalletAndFund()
      try {
        console.log(`${count}: trying with ${wallet.address}`)
        await game.connect(wallet).win()
      } catch (error) {
        console.log(`Wallet ${wallet.address} is not a winner...`)
      }
      
      isWin = await game.isWon();

      if (isWin) {
        console.log(`won with ${wallet.address} at ${count} tries.`)
        // console.log(wallet.)
      }

      count+=1;
    }
    // one of the winning address: 0x0071b6492d5e14E6E34b6Cc7873d4dDF1F930B26
    // won with 0x000B3979d4C43F4988cD058C47C34A36dC27F1a1 at 308 tries.

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
