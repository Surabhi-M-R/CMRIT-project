require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/Zd9h1eeFJXzhZqeWxBZAsb77c0vBQBHz", // Sepolia RPC endpoint
      accounts: ['de5e448e3d0b810dbcebdb5ec301168437c0fac5a198a5270270650db6ae8ec8'] // Your MetaMask private key
    }
  }
};