const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const portalContractFactory = await hre.ethers.getContractFactory(
    "ActivationPortal"
  );
  const portalContract = await portalContractFactory.deploy();
  await portalContract.deployed();
  console.log("ActivationPortal address: ", portalContract.address);
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
