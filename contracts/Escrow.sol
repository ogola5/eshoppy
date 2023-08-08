// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract Escrow is Ownable {
    using Address for address payable;

    struct EscrowTransaction {
        address buyer;
        address seller;
        address arbitrator;
        uint256 amount;
        bool released;
        bool refunded;
    }

    uint256 public totalTransactions;
    mapping(uint256 => EscrowTransaction) public transactions;

    event FundsDeposited(uint256 transactionId, address indexed buyer, uint256 amount);
    event FundsReleased(uint256 transactionId, address indexed seller, uint256 amount);
    event FundsRefunded(uint256 transactionId, address indexed buyer, uint256 amount);

    modifier onlyParties(uint256 _transactionId) {
        require(
            msg.sender == transactions[_transactionId].buyer ||
            msg.sender == transactions[_transactionId].seller ||
            msg.sender == transactions[_transactionId].arbitrator,
            "Not authorized"
        );
        _;
    }

    function depositFunds(address _seller, address _arbitrator) external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        totalTransactions++;
        EscrowTransaction memory transaction = EscrowTransaction(msg.sender, _seller, _arbitrator, msg.value, false, false);
        transactions[totalTransactions] = transaction;

        emit FundsDeposited(totalTransactions, msg.sender, msg.value);
    }

    function releaseFunds(uint256 _transactionId) external onlyParties(_transactionId) {
        EscrowTransaction storage transaction = transactions[_transactionId];
        require(!transaction.released && !transaction.refunded, "Transaction already completed");
        
        transaction.released = true;
        payable(transaction.seller).sendValue(transaction.amount);

        emit FundsReleased(_transactionId, transaction.seller, transaction.amount);
    }

    function refundFunds(uint256 _transactionId) external onlyParties(_transactionId) {
        EscrowTransaction storage transaction = transactions[_transactionId];
        require(!transaction.released && !transaction.refunded, "Transaction already completed");
        
        transaction.refunded = true;
        payable(transaction.buyer).sendValue(transaction.amount);

        emit FundsRefunded(_transactionId, transaction.buyer, transaction.amount);
    }
}
