const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  // Deploy ECommerceUser contract
  const ECommerceUser = await ethers.getContractFactory('ECommerceUser');
  const ecommerceUserContract = await ECommerceUser.deploy();
  console.log('ECommerceUser contract deployed to:', ecommerceUserContract.address);

  // Deploy ProductListing contract
  const ProductListing = await ethers.getContractFactory('ProductListing');
  const productListingContract = await ProductListing.deploy();
  console.log('ProductListing contract deployed to:', productListingContract.address);

  const OrderManagement = await ethers.getContractFactory('OrderManagement');
  const orderManagementContract = await OrderManagement.deploy();
  console.log('Escrow contract deployed to:', orderManagementContract.address);

  const Escrow = await ethers.getContractFactory('Escrow');
  const escrowContract = await Escrow.deploy();
  console.log('Escrow contract deployed to:', escrowContract.address);

  const Governance = await ethers.getContractFactory('Governance');
  const governanceContract = await Governance.deploy();
  console.log('Governance contract deployed to:', governanceContract.address);

  const Messaging = await ethers.getContractFactory('Messaging');
  const messagingContract = await Messaging.deploy();
  console.log('Messaging contract deployed to:', messagingContract.address);

  const Payment = await ethers.getContractFactory('Payment');
  const paymentContract = await Payment.deploy('0xf357087e1a1c0EBb68855B736cCF9b4C4Eccb71F');
  console.log('Payment contract deployed to:', paymentContract.address);

  const Reputation = await ethers.getContractFactory('Reputation');
  const reputationContract = await Reputation.deploy();
  console.log('Reputation contract deployed to:', reputationContract.address);

  const OffChainDataVerification = await ethers.getContractFactory('OffChainDataVerification');
  const offChainDataVerificationContract = await OffChainDataVerification.deploy();
  console.log('OffChainDataVerification contract deployed to:', offChainDataVerificationContract.address);

  console.log('Deploying ERC20 Token with the account:', deployer.address);

  const Token = await ethers.getContractFactory('Token');
  const tokenContract = await Token.deploy('My Token', 'MTK');
  //await tokenContract.deployed();

  console.log('ERC20 Token deployed to:', tokenContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

