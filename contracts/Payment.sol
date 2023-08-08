// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Payment is Ownable {
    IERC20 public token; // The ERC20 token used for payments

    event PaymentReceived(address indexed from, uint256 amount);
    event PaymentSent(address indexed to, uint256 amount);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function setToken(address _tokenAddress) external onlyOwner {
        token = IERC20(_tokenAddress);
    }

    function receivePayment(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        token.transferFrom(msg.sender, address(this), _amount);

        emit PaymentReceived(msg.sender, _amount);
    }

    function sendPayment(address _to, uint256 _amount) external onlyOwner {
        require(_amount > 0, "Amount must be greater than 0");
        token.transfer(_to, _amount);

        emit PaymentSent(_to, _amount);
    }
}
