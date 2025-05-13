async function main() {
  const Certificate = await ethers.getContractFactory("Certificate");
  console.log("Deploying Certificate contract...");
  const certificate = await Certificate.deploy();
  await certificate.deployed();
  console.log("Certificate contract deployed to:", certificate.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
