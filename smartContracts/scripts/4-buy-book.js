require('dotenv').config();

const gameAbi = require('../artifacts/contracts/Bookstore.sol/Bookstore.json').abi;

const provider = new hre.ethers.providers.JsonRpcProvider(process.env.ALCHEMY_RINKEBY_URL);
const wallet1 = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
const wallet2 = new hre.ethers.Wallet(process.env.PRIVATE_KEY_1, provider);
const gameContractAddress = "0xd7E7A1D8661310AC8FC5ac5da7c77339Fa5BE943";

const contract = new hre.ethers.Contract(gameContractAddress, gameAbi);

const main = async () => {
    const tokenId = await contract.connect(wallet1).tokenCounter();

    let tx = await contract.connect(wallet1).approve('0xB291D902b8471810034203CA42f8404DC9e73981');
    await tx.wait();

    tx = await contract.connect(wallet2).purchaseFromAuthor(tokenId, 2);
    await tx.wait();
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();