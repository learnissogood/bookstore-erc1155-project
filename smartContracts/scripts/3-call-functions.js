require('dotenv').config();

const gameAbi = require('../artifacts/contracts/Bookstore.sol/Bookstore.json').abi;

const provider = new hre.ethers.providers.JsonRpcProvider(process.env.ALCHEMY_RINKEBY_URL);
const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
const gameContractAddress = "0xd7E7A1D8661310AC8FC5ac5da7c77339Fa5BE943";

const contract = new hre.ethers.Contract(gameContractAddress, gameAbi, wallet);

const main = async () => {
    const tokenId = await contract.tokenCounter();

    let tx = await contract.getTitle(tokenId);
    console.log("Title of the book: ", tx);

    tx = await contract.getAuthor(tokenId);
    console.log("Author of the book: ", tx);

    tx = await contract.getCopies(tokenId);
    console.log("Copies of the book: ", tx.toNumber());

    tx = await contract.balanceOf('0xB291D902b8471810034203CA42f8404DC9e73981', tokenId);
    console.log("Balance of the book in the address '0xB291D902b8471810034203CA42f8404DC9e73981': ", tx.toNumber());
};

const runMain = async () => {
    try {
        await main();
        process.exit(0)
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
};

runMain();