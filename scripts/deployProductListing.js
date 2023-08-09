const { ethers } = require('hardhat');
const ipfsClient = require('ipfs-http-client');


async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  // Deploy ProductListing contract
  const ProductListing = await ethers.getContractFactory('ProductListing');
  const productListingContract = await ProductListing.deploy();
  console.log('ProductListing contract deployed to:', productListingContract.address);
  // IPFS configuration
  const ipfs = ipfsClient.create({ host: 'localhost', port: 5001, protocol: 'http' });

  // Example product data for demonstration purposes
  const productData = {
    name: 'Product Name',
    description: 'Product Description',
    price: 100,
  };

  // Upload product data to IPFS
  const ipfsResponse = await ipfs.add(JSON.stringify(productData));
  const ipfsHash = ipfsResponse.cid.toString();

  // Call createProduct function with IPFS hash
  await productListingContract.createProduct(
    productData.name,
    productData.description,
    productData.price,
    ipfsHash
  );

  console.log('Product created with IPFS hash:', ipfsHash);


}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });