// pages/ProductListing.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { uploadToIPFS } from '../utils/ipfs'; // Assuming you have an ipfs.js utility as previously discussed
import ProductListingContract from '../contracts/ProductListing.json'; // Import the ABI of the ProductListing contract
import { Container, Form, Button } from '../styles/ProductListingStyles'; // Adjust import paths as needed

const ProductListing = ({ contract }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');
  const [products, setProducts] = useState([]);

  async function handleCreateProduct() {
    try {
      const ipfsResult = await uploadToIPFS({ name, description, price });
      const ipfsHash = ipfsResult.path;

      const tx = await contract.createProduct(name, description, ethers.utils.parseEther(price), ipfsHash);
      await tx.wait();

      setIpfsHash(ipfsHash);
      setName('');
      setDescription('');
      setPrice('');

      await fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  }

  async function handleUpdateProduct(productId) {
    try {
      // Implement the update product logic using contract.editProduct
      // Call fetchProducts() after updating
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }

  async function handleRemoveProduct(productId) {
    try {
      // Implement the remove product logic using contract.removeProduct
      // Call fetchProducts() after removing
    } catch (error) {
      console.error('Error removing product:', error);
    }
  }

  async function fetchProducts() {
    try {
      const total = await contract.totalProducts();
      const productArray = [];

      for (let i = 1; i <= total; i++) {
        const product = await contract.products(i);
        productArray.push({
          productId: product.productId,
          name: product.name,
          description: product.description,
          price: product.price,
          seller: product.seller,
          ipfsHash: product.ipfsHash,
        });
      }

      setProducts(productArray);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  return (
    <Container>
      <h1>Create Product</h1>
      <Form>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label>Price (ETH):</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Button onClick={handleCreateProduct}>Create Product</Button>
      </Form>
      {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
      <h1>Product Listing</h1>
      {products.map((product) => (
        <div key={product.productId}>
          <p>Name: {product.name}</p>
          <p>Description: {product.description}</p>
          <p>Price: {ethers.utils.formatEther(product.price)} ETH</p>
          <p>IPFS Hash: {product.ipfsHash}</p>
          <Button onClick={() => handleUpdateProduct(product.productId)}>Update</Button>
          <Button onClick={() => handleRemoveProduct(product.productId)}>Delete</Button>
        </div>
      ))}
    </Container>
  );
};

export default ProductListing;
