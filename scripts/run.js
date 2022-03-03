const { hexStripZeros } = require("ethers/lib/utils");
// hre = hardhat runtime environment
const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal"); // compiles contracts && generates files under artifacts folder
  const waveContract = await waveContractFactory.deploy(); // creats local Ethereum network and then destroys it after the script runs
  await waveContract.deployed(); // waits for contract deployment, constructor runs on deploy
  console.log("Contract deployed to: ", waveContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); //exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('preocess.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();
