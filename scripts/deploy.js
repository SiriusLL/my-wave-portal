const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const spellContractFactory = await hre.ethers.getContractFactory(
    "SpellPortal"
  );
  const spellContract = await spellContractFactory.deploy();
  await spellContract.deployed();
  console.log("SpellPortal address: ", spellContract.address);
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
