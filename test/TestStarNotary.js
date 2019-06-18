
const StarNotary = artifacts.require('StarNotary');

let accounts;
let owner;
let instance;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

beforeEach(async () => {
    instance = await StarNotary.deployed();
});

it('can Create a Star', async () => {
    const tokenId = 1;
    await instance.createStar('Awesome Star!', tokenId, { from: accounts[0] })
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
});

it('lets user1 put up their star for sale', async () => {
    const user1 = accounts[1];
    const starId = 2;
    const starPrice = web3.utils.toWei(".01", "ether");
    await instance.createStar('awesome star', starId, { from: user1 });
    await instance.putStarUpForSale(starId, starPrice, { from: user1 });
    assert.equal(await instance.starsForSale.call(starId), starPrice);
});
