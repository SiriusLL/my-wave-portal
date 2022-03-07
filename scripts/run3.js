// hre = hardhat runtime environment
const main = async () => {
  const portalContractFactory = await hre.ethers.getContractFactory(
    "ActivationPortal"
  );
  const portalContract = await portalContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await portalContract.deployed();
  console.log("Contract addy:", portalContract.address);

  /*
   * Get Contract balance
   */
  let contractBalance = await hre.ethers.provider.getBalance(
    portalContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  /*
   * Send portal
   */
  let portalTxn = await portalContract.activatePortal("A message!");
  await portalTxn.wait();

  /*
   * Get Contract balance to see what happened!
   */
  contractBalance = await hre.ethers.provider.getBalance(
    portalContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allPortals = await portalContract.getAllPortals();
  console.log(allPortals);
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
