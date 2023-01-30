const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    const [signer] = await ethers.getSigners();
    // nested mappings are rough :}
    game.connect(signer).write(signer.address);


    await game.win(signer.address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
