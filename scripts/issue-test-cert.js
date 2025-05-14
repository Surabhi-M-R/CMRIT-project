const hre = require("hardhat");

async function main() {
  const Certificate = await hre.ethers.getContractFactory("Certificate");
  const certificate = await Certificate.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3"); // Address from deployment

  console.log("Issuing test certificate...");
  
  const certId = "CERT001";
  const studentName = "John Doe";
  const course = "Blockchain Development";
  const issuer = "CMRIT University";

  const tx = await certificate.issueCertificate(certId, studentName, course, issuer);
  await tx.wait();

  console.log(`Certificate issued with ID: ${certId}`);
  console.log(`Transaction hash: ${tx.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
