// hre = hardhat runtime environment
const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners(); //automagic creates owner and random address
  const portalContractFactory = await hre.ethers.getContractFactory(
    "ActivationPortal"
  ); // compiles contracts && generates files under artifacts folder

  const portalContract = await portalContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  }); // creats local Ethereum network and then destroys it after the script runs
  await portalContract.deployed(); // waits for contract deployment, constructor runs on deploy

  console.log("Contract deployed to: ", portalContract.address);
  console.log("contract deployed by: ", owner.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    portalContract.address
  );

  console.log(
    "contract balance: ",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let portalCount;
  portalCount = await portalContract.getTotalPortalsOpen();
  console.log(portalCount.toNumber());

  let portalTxn = await portalContract.activatePortal("A message");
  await portalTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(
    portalContract.address
  );

  portalTxn = await portalContract.activatePortal("A message");
  await portalTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(
    portalContract.address
  );

  console.log("here*******");
  console.log(
    "contract Balance: ",
    hre.ethers.utils.formatEther(contractBalance)
  );

  portalTxn = await portalContract
    .connect(randomPerson)
    .activatePortal("Another message!");
  await portalTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(
    portalContract.address
  );
  console.log(
    "contract Balance: ",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allPortals = await portalContract.getAllPortals();
  console.log(allPortals);
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
