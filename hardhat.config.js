require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://rpc.sepolia.org", // Sepolia RPC endpoint
      accounts: [process.env.87a9936637113557a582070f346a45644603006dc699d2b23ce5475c79d1ed24] // Your MetaMask private key
    }
  }
};