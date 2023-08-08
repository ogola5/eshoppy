// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Messaging {
    struct Message {
        address sender;
        address receiver;
        string content;
        uint256 timestamp;
    }

    mapping(address => mapping(address => Message[])) private messages;

    event MessageSent(address indexed sender, address indexed receiver, string content, uint256 timestamp);

    function sendMessage(address _receiver, string memory _content) external {
        require(msg.sender != _receiver, "Cannot send message to yourself");

        Message memory newMessage = Message(msg.sender, _receiver, _content, block.timestamp);
        messages[msg.sender][_receiver].push(newMessage);

        emit MessageSent(msg.sender, _receiver, _content, block.timestamp);
    }

    function getMessages(address _receiver) external view returns (Message[] memory) {
        return messages[msg.sender][_receiver];
    }
}
