// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract OrderManagement is Ownable {
    enum OrderStatus { Created, Shipped, Delivered, Cancelled, Disputed }

    struct Order {
        uint256 orderId;
        address buyer;
        address seller;
        uint256 productId;
        uint256 quantity;
        uint256 totalPrice;
        OrderStatus status;
    }

    uint256 public totalOrders;
    mapping(uint256 => Order) public orders;

    event OrderCreated(uint256 orderId, address indexed buyer, address indexed seller, uint256 indexed productId, uint256 quantity, uint256 totalPrice);
    event OrderStatusUpdated(uint256 orderId, OrderStatus status);

    function createOrder(address _seller, uint256 _productId, uint256 _quantity, uint256 _totalPrice) external {
        totalOrders++;
        Order memory order = Order(totalOrders, msg.sender, _seller, _productId, _quantity, _totalPrice, OrderStatus.Created);
        orders[totalOrders] = order;

        emit OrderCreated(totalOrders, msg.sender, _seller, _productId, _quantity, _totalPrice);
    }

    function updateOrderStatus(uint256 _orderId, OrderStatus _status) external onlyOwner {
        require(_orderId <= totalOrders, "Order does not exist");
        orders[_orderId].status = _status;

        emit OrderStatusUpdated(_orderId, _status);
    }

    function getOrderStatus(uint256 _orderId) external view returns (OrderStatus) {
        require(_orderId <= totalOrders, "Order does not exist");
        return orders[_orderId].status;
    }
}
