// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract OffChainDataVerification is Ownable {
    struct VerificationRequest {
        address requester;
        bytes32 requestId;
        string data; // Off-chain data to be verified
        bool isVerified;
    }

    mapping(bytes32 => VerificationRequest) public verificationRequests;

    event VerificationRequested(address indexed requester, bytes32 indexed requestId, string data);
    event DataVerified(bytes32 indexed requestId);

    function requestVerification(string memory _data) external {
        bytes32 requestId = keccak256(abi.encodePacked(msg.sender, _data, block.timestamp));
        VerificationRequest memory request = VerificationRequest(msg.sender, requestId, _data, false);
        verificationRequests[requestId] = request;

        emit VerificationRequested(msg.sender, requestId, _data);
    }

    function verifyData(bytes32 _requestId) external onlyOwner {
        VerificationRequest storage request = verificationRequests[_requestId];
        require(!request.isVerified, "Data already verified");

        request.isVerified = true;

        emit DataVerified(_requestId);
    }

    function getVerificationStatus(bytes32 _requestId) external view returns (bool) {
        return verificationRequests[_requestId].isVerified;
    }
}
