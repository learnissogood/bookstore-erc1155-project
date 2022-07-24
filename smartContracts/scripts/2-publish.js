require('dotenv').config();

const gameAbi = require('../artifacts/contracts/Bookstore.sol/Bookstore.json').abi;

const url = process.env.ALCHEMY_RINKEBY_URL;
const provider = new hre.ethers.providers.JsonRpcProvider(url);

const privateKey = process.env.PRIVATE_KEY;
const wallet = new hre.ethers.Wallet(privateKey, provider);

const gameContractAddress = "0xd7E7A1D8661310AC8FC5ac5da7c77339Fa5BE943";

const gameContract = new hre.ethers.Contract(gameContractAddress, gameAbi, wallet);

const main = async () => {
    let tx = await gameContract.publish('Lord of Rings', 100);
    await tx.wait();

    tx = await gameContract.tokenCounter();
    console.log(tx.toNumber());
}

const runMain = async () => {
    try {
        await main();
        process.exit(0)
    } catch (e) {
        console.log(error);
        process.exit(1)
    }
}

runMain();