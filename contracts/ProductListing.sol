// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductListing {
    struct Product {
        uint256 productId;
        string name;
        string description;
        uint256 price;
        address seller;
    }

    uint256 public totalProducts;
    mapping(uint256 => Product) public products;

    event ProductCreated(uint256 indexed productId, string name, uint256 price, address indexed seller);
    event ProductUpdated(uint256 indexed productId, string name, uint256 price);
    event ProductRemoved(uint256 indexed productId);

    modifier onlySeller(uint256 _productId) {
        require(products[_productId].seller == msg.sender, "Only the seller can perform this action");
        _;
    }

    function createProduct(string memory _name, string memory _description, uint256 _price) external {
        totalProducts++;
        Product memory newProduct = Product(totalProducts, _name, _description, _price, msg.sender);
        products[totalProducts] = newProduct;

        emit ProductCreated(totalProducts, _name, _price, msg.sender);
    }

    function editProduct(uint256 _productId, string memory _name, string memory _description, uint256 _price)
        external
        onlySeller(_productId)
    {
        Product storage product = products[_productId];
        product.name = _name;
        product.description = _description;
        product.price = _price;

        emit ProductUpdated(_productId, _name, _price);
    }

    function removeProduct(uint256 _productId) external onlySeller(_productId) {
        delete products[_productId];
        emit ProductRemoved(_productId);
    }

    function getProductDetails(uint256 _productId)
        external
        view
        returns (
            string memory name,
            string memory description,
            uint256 price,
            address seller
        )
    {
        Product memory product = products[_productId];
        return (product.name, product.description, product.price, product.seller);
    }
}
