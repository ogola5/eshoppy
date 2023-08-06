const { ethers } = require('hardhat');

async function deploy() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with account:', deployer.address);

  const ECommerceUser = await ethers.getContractFactory('ECommerceUser');
  const ecommerceUser = await ECommerceUser.deploy();

  // Wait for ECommerceUser contract deployment transaction to be mined
  await ecommerceUser.deploy();
  console.log('ECommerceUser contract deployed to:', ecommerceUser.address);

  const ProductListing = await ethers.getContractFactory('ProductListing');
  const productListing = await ProductListing.deploy();

  // Wait for ProductListing contract deployment transaction to be mined
  await productListing.deploy();
  console.log('ProductListing contract deployed to:', productListing.address);
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

